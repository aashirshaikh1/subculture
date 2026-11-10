# Subculture launch film

A 68-second film for Subculture, made with [Remotion](https://www.remotion.dev/) (video written
as React code).

> Subculture is a **study resource, not clinical guidance**. The 3D models and the micrographs
> it shows are drawn in code, not photographed down a microscope, and the film says so.

## Rebuild it

```powershell
cd video
npm install
# soundtrack: voice-over (Piper, offline neural TTS), synthesised music and sound effects
pip install piper-tts numpy
python -m piper.download_voices en_GB-cori-high
python scripts/make_audio.py --voice en_GB-cori-high.onnx
# preview in the browser, or render the MP4 (1920x1080, 60 fps, about 10 minutes)
npm run studio
npm run render
```

The render goes to `out/subculture-launch.mp4`, which is gitignored: it is rebuilt, not stored.

## Where things are

- `src/Film.jsx`: the beat sheet, 11 scenes on a 0.5 s grid (120 BPM)
- `src/scenes/scenes.jsx`: all eleven scenes
- `src/lib.jsx`: background, glass cards, text animations, screenshot camera
- `src/theme.js`: the site's own colours and its Newsreader headings, so the film matches it
- `public/app/`: screenshots of the site, numbered in story order
- `scripts/make_audio.py`: the voice-over script with its timing, the music and the effects

The screenshots come from the site served at `/subculture`. Retake them after a visual change,
at a 1440x900 viewport and `device_scale_factor=2`.
