"""Soundtrack for the Subculture launch film: voice-over, music and sound effects.

    python video/scripts/make_audio.py --voice en-IN-NeerjaExpressiveNeural
    python video/scripts/make_audio.py --voice path/to/en_GB-cori-high.onnx   (offline)

A voice name uses Microsoft's neural voices through edge-tts (pip install edge-tts;
needs internet while generating). A .onnx path uses piper-tts, a free neural
text-to-speech engine that runs offline (voices from https://huggingface.co/rhasspy/piper-voices).
Both need numpy.
Everything else is synthesised here, so there are no third-party music or
sound files. Writes video/public/audio/soundtrack.wav (used by the film) and
the stems voice.wav, music.wav and sfx.wav for editing elsewhere.

All times are in seconds and follow the beat sheet in video/src/Film.jsx
(11 scenes on a 0.5 s grid, 120 BPM, 67.5 s).
"""

from __future__ import annotations

import argparse
import io
import wave
from pathlib import Path

import numpy as np

SR = 44100
LENGTH = 67.5
BPM = 120
BEAT = 60 / BPM
BAR = 4 * BEAT
OUT = Path(__file__).resolve().parents[1] / "public" / "audio"
rng = np.random.default_rng(20261109)  # fixed: the same soundtrack every run

# Mix levels, in dBFS. The voice is the film: the music is there to stop the gaps feeling
# dead, not to be listened to. It sits 12 dB under the voice even in the gaps, and ducks
# another 10 dB while a line is being spoken, so the narration is never competing with it.
VOICE_DB = -14.0       # voice RMS
MUSIC_DB = -26.0       # music RMS in the gaps between lines
DUCK_DB = -10.0        # extra attenuation applied to the music under each spoken line
SFX_PEAK_DB = -11.0    # effects peak

# Scene start times (s), from video/src/Film.jsx
SCENES = [0, 6, 9.5, 15.5, 23, 30, 37.5, 44.5, 51.5, 58, 62.5]

# (start, line, latest end): every line ends before the next headline appears.
# Silent during the opening gag, clicks and montage, so the effects carry them.
SCRIPT = [
    (0.15, "A textbook tells you what it is. A manual tells you what to do. Neither tells you why.", 5.80),
    (6.30, "This is Subculture.", 9.10),
    (9.90, "Nineteen organisms and fifteen lab methods, every one taken apart the same way.", 15.10),
    (15.90, "Each organism gets the same sections. The biology, the bench work, and the reason behind each step.", 22.60),
    (23.40, "With a model you can turn in your hand, drawn in code rather than photographed.", 29.60),
    (30.40, "And the tests that tell it apart at the bench, with what each one rules out.", 37.10),
    (37.90, "Fifteen methods, step by step, from culture and P C R through to fermentation.", 44.10),
    (44.90, "And eight calculators for the maths you actually do at the bench.", 51.10),
    (51.90, "A hundred and fifty one cited sources. A study resource, not clinical guidance.", 57.60),
    (58.40, "Not facts to memorise. Reasons to follow.", 62.10),
    (63.40, "Subculture. Free to read.", 67.20),
]


def t(sec: float) -> int:
    return int(round(sec * SR))


def track() -> np.ndarray:
    return np.zeros(t(LENGTH) + SR, dtype=np.float64)


def add(buf: np.ndarray, sig: np.ndarray, at: float, gain: float = 1.0) -> None:
    i = t(at)
    if i >= len(buf):
        return
    n = min(len(sig), len(buf) - i)
    buf[i:i + n] += sig[:n] * gain


def env(n: int, attack: float, release: float) -> np.ndarray:
    """Linear attack, exponential release."""
    a = max(1, t(attack))
    e = np.exp(-np.arange(n) / max(1, t(release)))
    e[:a] *= np.linspace(0, 1, a)
    return e


def lowpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    """One-pole low-pass, fine for softening synth tones and noise."""
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):  # short signals only
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y


def highpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    return x - lowpass(x, cutoff)


# ---------------------------------------------------------------- instruments
_pluck_cache: dict[float, np.ndarray] = {}


def pluck(freq: float, dur: float = 1.4) -> np.ndarray:
    """Karplus-Strong plucked string, computed one period at a time."""
    key = round(freq, 2)
    if key not in _pluck_cache:
        p = max(2, int(SR / freq))
        buf = rng.uniform(-1, 1, p)
        buf = lowpass(buf, 6000)
        periods = int(dur * SR / p) + 1
        out = np.empty(periods * p)
        for k in range(periods):
            out[k * p:(k + 1) * p] = buf
            buf = 0.996 * 0.5 * (buf + np.roll(buf, -1))
        _pluck_cache[key] = out[: t(dur)]
    return _pluck_cache[key]


def strum(freqs: list[float], down: bool, vel: float, dur: float = 1.2) -> np.ndarray:
    order = freqs if down else freqs[::-1]
    gap = t(0.011)
    out = np.zeros(t(dur) + gap * len(order))
    for k, f in enumerate(order):
        s = pluck(f, dur)
        out[k * gap:k * gap + len(s)] += s * (0.8 + 0.2 * rng.random())
    return out * vel


def kick() -> np.ndarray:
    n = t(0.32)
    tt = np.arange(n) / SR
    freq = 45 + 85 * np.exp(-tt * 28)
    return np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-tt * 9)


def noise_burst(dur: float, decay: float, hp: float, lp: float) -> np.ndarray:
    n = t(dur)
    x = rng.uniform(-1, 1, n)
    x = lowpass(highpass(x, hp), lp)
    return x * np.exp(-np.arange(n) / max(1, t(decay)))


CLAP = None
HAT = None
TAMB = None


def clap() -> np.ndarray:
    global CLAP
    if CLAP is None:
        hits = [noise_burst(0.2, 0.05, 900, 5000) for _ in range(3)]
        out = np.zeros(t(0.25))
        for k, h in enumerate(hits):
            out[t(0.008 * k):t(0.008 * k) + len(h)] += h * (0.6 if k < 2 else 1)
        CLAP = out
    return CLAP


def hat() -> np.ndarray:
    global HAT
    if HAT is None:
        HAT = noise_burst(0.05, 0.012, 7000, 14000)
    return HAT


def tamb() -> np.ndarray:
    global TAMB
    if TAMB is None:
        n = t(0.12)
        jingle = sum(np.sin(2 * np.pi * f * np.arange(n) / SR) for f in (5800, 7400, 9100)) / 3
        TAMB = (noise_burst(0.12, 0.03, 6000, 15000) + 0.3 * jingle * np.exp(-np.arange(n) / t(0.03)))
    return TAMB


def bass_note(freq: float, dur: float) -> np.ndarray:
    n = t(dur)
    tt = np.arange(n) / SR
    x = np.sin(2 * np.pi * freq * tt) + 0.25 * np.sin(4 * np.pi * freq * tt)
    return x * env(n, 0.005, dur * 0.6)


def doo(freq: float, dur: float) -> np.ndarray:
    """A wordless 'doo' vocal hook: soft sine with vibrato and a gentle attack."""
    n = t(dur)
    tt = np.arange(n) / SR
    vib = 1 + 0.006 * np.sin(2 * np.pi * 5.3 * tt) * np.clip(tt / 0.15, 0, 1)
    ph = 2 * np.pi * np.cumsum(freq * vib) / SR
    x = np.sin(ph) + 0.35 * np.sin(2 * ph) + 0.12 * np.sin(3 * ph)
    e = np.clip(tt / 0.04, 0, 1) * np.clip((dur - tt) / 0.09, 0, 1)
    return x * e


# I-V-vi-IV in C major, one chord per bar
CHORDS = {
    "C": ([130.81, 196.0, 261.63, 329.63, 392.0], 65.41),
    "G": ([98.0, 123.47, 146.83, 196.0, 246.94, 392.0], 98.0),
    "Am": ([110.0, 164.81, 220.0, 261.63, 329.63], 110.0),
    "F": ([87.31, 130.81, 174.61, 220.0, 261.63, 349.23], 87.31),
}
PROGRESSION = ["C", "G", "Am", "F"]
# hook over four bars: (beat offset, semitones above C5, beats)
HOOK = [(0, 4, 1), (1, 7, 1), (2, 9, 1.5), (4, 7, 1), (5, 4, 1), (6, 2, 1.5), (8, 4, 1), (9, 7, 1), (10, 12, 1.5),
        (12, 9, 1), (13, 7, 1), (14, 4, 2)]


def section(sec: float) -> str:
    if sec < 9.5:
        return "intro"
    if sec < 12:
        return "lift"
    if sec < 74:
        return "groove"
    if sec < 78:
        return "break"
    if sec < 86:
        return "chorus"
    return "end"


def music() -> np.ndarray:
    buf = track()
    n_bars = int(LENGTH / BAR)
    for b in range(n_bars):
        start = b * BAR
        name = PROGRESSION[b % 4]
        notes, root = CHORDS[name]
        sec = section(start)
        if sec == "end":
            # one last ringing chord on the downbeat at 86 s, then the end card
            if abs(start - 86) < 1e-6:
                add(buf, strum(notes, True, 0.9, 3.8), start)
                add(buf, bass_note(CHORDS["C"][1], 3.5), start, 0.8)
                add(buf, kick(), start, 0.9)
            continue
        for step in range(16):  # 16th notes
            at = start + step * BEAT / 4
            sec = section(at)
            on_beat = step % 4 == 0
            eighth = step % 2 == 0
            if sec == "intro":
                if step in (0, 6, 8, 14):
                    add(buf, strum(notes, step % 4 == 0, 0.45), at)
                if eighth:
                    add(buf, hat(), at, 0.12)
                continue
            if sec == "lift":
                if eighth:
                    add(buf, strum(notes, on_beat, 0.55 if on_beat else 0.35), at)
                add(buf, hat(), at, 0.1 + 0.15 * (at - 9.5) / 2.5)
                continue
            # groove, break, chorus: double-time strums, the feel of the brief
            big = sec == "chorus"
            if eighth or big:
                vel = 0.6 if on_beat else (0.38 if eighth else 0.24)
                add(buf, strum(notes, eighth and step % 4 != 2, vel * (1.15 if big else 1)), at)
            if sec == "break":
                if on_beat:
                    add(buf, hat(), at, 0.15)
                continue
            if step in (0, 8) or (big and step in (4, 12)):
                add(buf, kick(), at, 0.95)
            if step in (4, 12):
                add(buf, clap(), at, 0.5)
            if eighth:
                add(buf, hat(), at, 0.16 if step % 4 else 0.1)
            if big and not eighth:
                add(buf, tamb(), at, 0.18)
            if step in (0, 6, 8, 12, 14):
                f = root * (2 if step in (6, 14) else 1)
                add(buf, bass_note(f, BEAT * 0.9), at, 0.55)
        # the hook comes in every other phrase in the groove, and in the chorus
        phrase = int(start // (4 * BAR))
        if section(start) in ("groove", "chorus") and b % 4 == 0 and (phrase % 2 == 1 or section(start) == "chorus"):
            for off, semi, beats in HOOK:
                at = start + off * BEAT
                if at < 86:
                    f = 523.25 * 2 ** (semi / 12)
                    add(buf, doo(f, beats * BEAT * 0.95), at, 0.16)
                    if section(start) == "chorus":
                        add(buf, doo(f / 2, beats * BEAT * 0.95), at, 0.1)
    return buf


# ---------------------------------------------------------------- effects
def whoosh(dur: float = 0.45) -> np.ndarray:
    n = t(dur)
    x = rng.uniform(-1, 1, n)
    out = np.empty(n)
    acc = 0.0
    for i in range(n):  # a band sweeping up, then away
        c = 400 + 5000 * (i / n) ** 1.5
        a = np.exp(-2 * np.pi * c / SR)
        acc = (1 - a) * x[i] + a * acc
        out[i] = acc
    tt = np.arange(n) / n
    return highpass(out, 200) * np.sin(np.pi * tt) ** 2 * 3


def click() -> np.ndarray:
    n = t(0.04)
    tt = np.arange(n) / SR
    return (np.sin(2 * np.pi * 2400 * tt) * np.exp(-tt * 260) + 0.5 * noise_burst(0.04, 0.004, 3000, 12000)[:n])


def pop_sfx(freq: float = 660) -> np.ndarray:
    n = t(0.14)
    tt = np.arange(n) / SR
    f = freq * (1 + 0.6 * np.exp(-tt * 40))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 30)


def thud() -> np.ndarray:
    """A stamp landing: a kick with a short burst of low noise on top."""
    out = kick() * 0.8
    out[: t(0.12)] += 0.3 * noise_burst(0.12, 0.03, 200, 2500)
    return out


def tick() -> np.ndarray:
    n = t(0.02)
    tt = np.arange(n) / SR
    return np.sin(2 * np.pi * 3600 * tt) * np.exp(-tt * 500) * 0.6


def shimmer() -> np.ndarray:
    n = t(1.4)
    tt = np.arange(n) / SR
    out = np.zeros(n)
    for k, f in enumerate([1046.5, 1318.5, 1568.0, 2093.0, 2637.0]):
        d = t(0.06 * k)
        seg = np.sin(2 * np.pi * f * tt[: n - d]) * np.exp(-tt[: n - d] * 3.2)
        out[d:] += seg / 5
    return out


def riser(dur: float) -> np.ndarray:
    n = t(dur)
    x = rng.uniform(-1, 1, n)
    out = np.empty(n)
    acc = 0.0
    for i in range(n):
        c = 300 + 7000 * (i / n) ** 2
        a = np.exp(-2 * np.pi * c / SR)
        acc = (1 - a) * x[i] + a * acc
        out[i] = acc
    return highpass(out, 150) * np.linspace(0, 1, n) ** 2 * 2.5


def scribble(dur: float) -> np.ndarray:
    """A marker drawing on a plot: band-limited noise with a wobbling level."""
    n = t(dur)
    x = lowpass(highpass(rng.uniform(-1, 1, n), 1500), 6000)
    wob = 0.6 + 0.4 * np.sin(2 * np.pi * 7 * np.arange(n) / SR)
    edge = np.clip(np.arange(n) / t(0.05), 0, 1) * np.clip((n - np.arange(n)) / t(0.05), 0, 1)
    return x * wob * edge


def sfx() -> np.ndarray:
    buf = track()
    for s in SCENES[1:]:
        add(buf, whoosh(), s - 0.3, 0.5)
    # 1. the gag: two hand-drawn gates, then the title types in
    add(buf, scribble(1.3), 0.67, 0.35)
    add(buf, scribble(1.17), 2.08, 0.35)
    for k in range(15):
        add(buf, tick(), 0.1 + k / 16, 0.5)
    # 2. problem lines, 3. the logo
    for s in (4.07, 5.73, 7.4):
        add(buf, pop_sfx(520), s, 0.35)
    add(buf, shimmer(), 9.73, 0.5)
    add(buf, riser(1.6), 10.4, 0.25)
    # 5. chips, and the button growing into the first screen
    for s in (16.13, 16.63, 17.13):
        add(buf, pop_sfx(700), s, 0.45)
    add(buf, whoosh(0.7), 19.3, 0.5)
    # 6. hero: drop the file, the batch passes
    add(buf, click(), 22.63, 0.8)
    add(buf, pop_sfx(880), 26.83, 0.45)
    # 7. gating panels sweep in
    for i in range(5):
        add(buf, whoosh(0.3), 30 + (120 + 44 * i) / 60, 0.22)
    # 8. controls tick off
    for i in range(8):
        add(buf, tick(), 37 + (124 + 20 * i) / 60, 0.7)
    # 9. the review banner wipes in
    add(buf, whoosh(0.5), 43 + 150 / 60, 0.3)
    # 10. Fail stamps, then the batch
    for s in (52.47, 53.07, 53.67, 54.27):
        add(buf, thud(), s, 0.45)
        add(buf, pop_sfx(330), s, 0.3)
    add(buf, thud(), 55.17, 0.7)
    # 11. workflow clicks and the toast
    for s in (60.27, 62.0, 63.17):
        add(buf, click(), s, 0.8)
    add(buf, pop_sfx(990), 63.33, 0.35)
    # 12. report: click, and the caption types in
    add(buf, click(), 66.67, 0.8)
    for k in range(0, 51, 2):
        add(buf, tick(), 70.5 + k / 40, 0.25)
    # 14. montage cuts on the beat
    for k in range(8):
        add(buf, tick(), 78 + 0.5 * k, 0.6)
    # 16. end card: click, URL types in
    add(buf, click(), 87.83, 0.9)
    for k in range(0, 34, 2):
        add(buf, tick(), 88.03 + k / 30, 0.3)
    return buf


# ---------------------------------------------------------------- voice
FFMPEG = Path(__file__).resolve().parents[1] / "node_modules" / "@remotion" / "compositor-win32-x64-msvc" / "ffmpeg.exe"


def piper_engine(model: str):
    """Offline Piper voice from a .onnx model."""
    from piper import PiperVoice, SynthesisConfig

    v = PiperVoice.load(model)

    def say(line: str, scale: float) -> tuple[np.ndarray, int]:
        mem = io.BytesIO()
        with wave.open(mem, "wb") as wf:
            v.synthesize_wav(line, wf, syn_config=SynthesisConfig(length_scale=scale))
        mem.seek(0)
        with wave.open(mem, "rb") as wf:
            return np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float64) / 32768, wf.getframerate()

    return say


def edge_engine(name: str):
    """Microsoft neural voice such as en-IN-NeerjaExpressiveNeural (needs internet while generating)."""
    import asyncio
    import subprocess
    import tempfile

    import edge_tts

    def say(line: str, scale: float) -> tuple[np.ndarray, int]:
        rate = f"{round((1 / scale - 1) * 100):+d}%"
        with tempfile.TemporaryDirectory() as tmp:
            mp3, wav = Path(tmp) / "line.mp3", Path(tmp) / "line.wav"
            for _ in range(4):  # the service can stall: give each try 30 s
                try:
                    asyncio.run(asyncio.wait_for(edge_tts.Communicate(line, name, rate=rate).save(str(mp3)), 30))
                    break
                except Exception as e:
                    print(f"  retrying ({type(e).__name__})", flush=True)
            else:
                raise RuntimeError(f"voice service failed four times on: {line}")
            # Remotion's ffmpeg build cannot write to a pipe, so decode file to file
            subprocess.run([str(FFMPEG), "-loglevel", "error", "-y", "-i", str(mp3), "-ac", "1", "-ar", str(SR), str(wav)], check=True)
            with wave.open(str(wav), "rb") as wf:
                return np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float64) / 32768, wf.getframerate()

    return say


def voice(name: str) -> tuple[np.ndarray, list[tuple[float, float]]]:
    piper = name.endswith(".onnx")
    say = piper_engine(name) if piper else edge_engine(name)
    # a neural voice sounds rushed above about 1.15x, so it gets less room to speed up than Piper
    fastest, step = (0.8, 0.05) if piper else (0.87, 0.03)
    buf = track()
    spans = []
    for start, line, latest in SCRIPT:
        slot = latest - start
        scale = 1.0
        for _ in range(6):  # speak a little faster until the line fits its slot
            pcm, rate = say(line, scale)
            pcm = np.trim_zeros(np.where(np.abs(pcm) < 0.003, 0, pcm)) if np.any(np.abs(pcm) >= 0.003) else pcm
            dur = len(pcm) / rate
            if dur <= slot or scale <= fastest:
                break
            scale -= step
        # resample to 44.1 kHz by linear interpolation
        x = np.interp(np.arange(int(len(pcm) * SR / rate)) * rate / SR, np.arange(len(pcm)), pcm)
        add(buf, x, start)
        spans.append((start, start + len(x) / SR))
        over = "  OVER SLOT" if start + len(x) / SR > latest + 0.05 else ""
        print(f"{start:6.2f}-{start + len(x) / SR:6.2f} s (slot to {latest:5.2f}, speed {1 / scale:.2f}x){over}  {line}", flush=True)
    return buf, spans


# ---------------------------------------------------------------- mix
def rms(x: np.ndarray) -> float:
    return float(np.sqrt(np.mean(x[np.abs(x) > 1e-4] ** 2))) if np.any(np.abs(x) > 1e-4) else 1e-9


def db(v: float) -> float:
    return 10 ** (v / 20)


def write(path: Path, x: np.ndarray) -> None:
    x = x[: t(LENGTH)]
    pcm = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(pcm.tobytes())


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice", required=True, help="a Microsoft neural voice name, or a Piper .onnx voice model")
    args = ap.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)

    vo, spans = voice(args.voice)
    mu = music()
    fx = sfx()

    vo *= db(VOICE_DB) / rms(vo)
    mu *= db(MUSIC_DB) / rms(mu)
    fx *= db(SFX_PEAK_DB) / np.max(np.abs(fx))

    # duck the music while the voice speaks, with smooth edges
    duck = np.ones_like(mu)
    for a, b in spans:
        duck[t(a - 0.15):t(b + 0.25)] = db(DUCK_DB)
    k = t(0.12)  # same moving average as np.convolve(mode="same"), but via a cumulative sum: far faster
    c = np.concatenate([[0.0], np.cumsum(np.pad(duck, (k // 2, (k - 1) // 2)))])
    duck = (c[k:] - c[:-k]) / k
    mu *= duck
    # fade the music out over the last half second
    mu[t(LENGTH - 0.5):t(LENGTH)] *= np.linspace(1, 0, t(LENGTH) - t(LENGTH - 0.5))

    mix = vo + mu + fx
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)  # gentle limiter
    mix *= db(-1) / np.max(np.abs(mix))
    write(OUT / "soundtrack.wav", mix)
    write(OUT / "voice.wav", vo)
    write(OUT / "music.wav", mu / max(1e-9, np.max(np.abs(mu))) * db(-3))
    write(OUT / "sfx.wav", fx)
    print(f"Wrote {OUT / 'soundtrack.wav'} and stems")


if __name__ == "__main__":
    main()
