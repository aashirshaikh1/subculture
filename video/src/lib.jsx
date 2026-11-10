import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { C, DISPLAY, FPS, GRAD, H, MONO, SANS, W, clamp, ease } from "./theme";

/** Eased value between two frames. */
export const tween = (f, f0, f1, v0, v1, easing = ease) =>
  interpolate(f, [f0, f1], [v0, v1], { ...clamp, easing });

/** Spring from 0 to 1 starting at `start`, with a slight overshoot for landings. */
export const pop = (f, start, damping = 11) =>
  spring({ frame: f - start, fps: FPS, config: { damping, stiffness: 170, mass: 0.7 } });

/** Deterministic random numbers, so every render is identical. */
export const rng = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
export const gauss = (r) => Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());

/** Bright off-white with soft drifting glows and 2% grain. */
export const Background = () => {
  const f = useCurrentFrame();
  const glow = (color, x, y, size, speed, phase) => {
    const dx = Math.sin(f / speed + phase) * 120;
    const dy = Math.cos(f / (speed * 1.3) + phase) * 80;
    return (
      <div style={{
        position: "absolute", left: x + dx - size / 2, top: y + dy - size / 2, width: size, height: size,
        borderRadius: "50%", background: color, filter: "blur(120px)", opacity: 0.5,
      }} />
    );
  };
  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      {glow("#F3D9E7", 380, 260, 900, 260, 0)}
      {glow("#DFD7F2", 1560, 820, 1000, 300, 2)}
      {glow("#F6E7EE", 1200, 120, 700, 200, 4)}
    </AbsoluteFill>
  );
};

export const Grain = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: 0.05, mixBlendMode: "multiply" }}>
      <svg width={W} height={H}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 12} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

/** Frosted glass card. */
export const Glass = ({ style, children, radius = 20 }) => (
  <div style={{
    position: "absolute", background: "rgba(255,255,255,0.78)", backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.95)", borderRadius: radius, overflow: "hidden",
    boxShadow: "0 30px 60px rgba(176,36,99,0.20), 0 2px 6px rgba(28,21,31,0.06)",
    ...style,
  }}>{children}</div>
);

/** A headline whose words rise one by one from blur to sharp. Words in `bold` are heavy and in the brand gradient. */
export const RiseWords = ({ words, start = 0, stagger = 7, size = 150, style, align = "center" }) => {
  const f = useCurrentFrame();
  return (
    <div style={{
      fontFamily: DISPLAY, fontSize: size, letterSpacing: "-0.02em", lineHeight: 1.06, color: C.ink,
      display: "flex", flexWrap: "wrap", justifyContent: align, gap: `0 ${size * 0.26}px`, ...style,
    }}>
      {words.map((w, i) => {
        const s = start + i * stagger;
        const p = tween(f, s, s + 20, 0, 1);
        return (
          <span key={i} style={{
            display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * size * 0.35}px)`,
            filter: `blur(${(1 - p) * 14}px)`, fontWeight: w.b ? 700 : 300,
            ...(w.b ? { backgroundImage: GRAD, WebkitBackgroundClip: "text", color: "transparent", paddingBottom: "0.08em" } : {}),
          }}>{w.t}</span>
        );
      })}
    </div>
  );
};

/** Parse "One file in. *Every subset out.*" into words; *starred* words are the bold ones. */
export const words = (text) => {
  const out = [];
  let bold = false;
  for (const raw of text.split(" ")) {
    let t = raw;
    const opens = t.startsWith("*");
    if (opens) { bold = true; t = t.slice(1); }
    const closes = t.endsWith("*");
    if (closes) t = t.slice(0, -1);
    out.push({ t, b: bold });
    if (closes) bold = false;
  }
  return out;
};

/** Text typed in with a blinking caret. */
export const TypeText = ({ text, start = 0, cps = 28, style, caret = true }) => {
  const f = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor(((f - start) / FPS) * cps)));
  const done = n >= text.length;
  const blink = Math.floor(f / 18) % 2 === 0;
  return (
    <span style={style}>
      {text.slice(0, n)}
      {caret && f >= start && (!done || blink) ? <span style={{ opacity: 0.8, fontWeight: 300 }}>|</span> : null}
    </span>
  );
};

/** A number counting up to its real value. */
export const CountUp = ({ to, start, dur = 60, decimals = 1, from = 0, suffix = "", style }) => {
  const f = useCurrentFrame();
  const v = tween(f, start, start + dur, from, to);
  const txt = v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span style={{ fontFamily: MONO, fontVariantNumeric: "tabular-nums", ...style }}>{txt}{suffix}</span>;
};

/** Large macOS-style pointer moving in eased arcs, pressing with a squash and a ripple. */
export const Cursor = ({ path, clicks = [], arc = 60 }) => {
  const f = useCurrentFrame();
  if (f < path[0][0]) return null;
  let x = path[path.length - 1][1];
  let y = path[path.length - 1][2];
  for (let i = 0; i < path.length - 1; i++) {
    const [f0, x0, y0] = path[i];
    const [f1, x1, y1] = path[i + 1];
    if (f >= f0 && f <= f1) {
      const t = ease((f - f0) / Math.max(1, f1 - f0));
      x = x0 + (x1 - x0) * t;
      y = y0 + (y1 - y0) * t - Math.sin(Math.PI * t) * arc;
      break;
    }
  }
  let squash = 1;
  const ripples = [];
  for (const c of clicks) {
    const d = f - c;
    if (d >= 0 && d < 10) squash = 1 - 0.18 * Math.sin((Math.PI * d) / 10);
    if (d >= 0 && d < 30) {
      const p = d / 30;
      ripples.push(
        <div key={c} style={{
          position: "absolute", left: x - 70 * p, top: y - 70 * p, width: 140 * p, height: 140 * p,
          borderRadius: "50%", border: `3px solid ${C.accent}`, opacity: 1 - p,
        }} />
      );
    }
  }
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {ripples}
      <svg width="48" height="48" viewBox="0 0 24 24" style={{
        position: "absolute", left: x - 6, top: y - 3, transform: `scale(${squash})`, transformOrigin: "6px 3px",
        filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.3))",
      }}>
        <path d="M5 2.5 L5 19.5 L9.3 15.6 L12.2 21.8 L15 20.5 L12.2 14.5 L18 14.5 Z" fill="#111" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
};

/** Small corner label on every shot that shows data. */
export const DemoTag = () => (
  <div style={{
    position: "absolute", left: 48, bottom: 36, padding: "10px 20px", borderRadius: 999,
    background: "rgba(251,240,220,0.92)", color: C.warn, fontFamily: SANS, fontSize: 22, fontWeight: 500,
    border: "1px solid rgba(138,90,0,0.18)",
  }}>Models and micrographs rendered in code</div>
);

/**
 * A screenshot seen through a camera: `keys` are [frame, x, y, zoom], the image
 * point (x, y) sits at the centre of the viewport at that zoom.
 */
export const Shot = ({ src, w, h, keys, vw, vh, style, children }) => {
  const f = useCurrentFrame();
  const fr = keys.map((k) => k[0]);
  const at = (i) => interpolate(f, fr, keys.map((k) => k[i]), { ...clamp, easing: ease });
  const x = keys.length > 1 ? at(1) : keys[0][1];
  const y = keys.length > 1 ? at(2) : keys[0][2];
  const z = keys.length > 1 ? at(3) : keys[0][3];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}>
      {/* children are overlays in image pixel coordinates, moving with the camera */}
      <div style={{
        position: "absolute", left: 0, top: 0, width: w, height: h, transformOrigin: "0 0",
        transform: `translate(${vw / 2 - x * z}px, ${vh / 2 - y * z}px) scale(${z})`,
      }}>
        <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: w, height: h, maxWidth: "none" }} />
        {children}
      </div>
    </div>
  );
};

/** Image point -> frame point, for a Shot inside a Window at (wx, wy) of size (vw, vh), camera (cx, cy, z). */
export const toFrame = (sx, sy, { wx, wy, vw, vh, cx, cy, z }) => [wx + vw / 2 + (sx - cx) * z, wy + vh / 2 + (sy - cy) * z];

/** A glass window that enters tilted back 22 degrees and settles flat, then drifts slowly closer. */
export const Window = ({ x = 110, y = 150, w = 1700, h = 890, enter = 0, children, radius = 20, drift = 0.00012 }) => {
  const f = useCurrentFrame();
  const p = tween(f, enter, enter + 36, 0, 1);
  return (
    <AbsoluteFill style={{ perspective: 1800 }}>
      <Glass radius={radius} style={{
        left: x, top: y, width: w, height: h, opacity: Math.min(1, p * 4),
        transform: `translateY(${(1 - p) * 240}px) rotateX(${(1 - p) * 22}deg) scale(${(0.92 + 0.08 * p) * (1 + Math.max(0, f - enter) * drift)})`,
        transformOrigin: "50% 100%",
      }}>{children}</Glass>
    </AbsoluteFill>
  );
};

/**
 * Feature beat: the line rises in the middle of the frame, moves to the top,
 * then the UI arrives. The scene leaves with a fast push and motion blur.
 */
export const FeatureScene = ({ title, dur, uiStart = 80, back, children, tag = true }) => {
  const f = useCurrentFrame();
  const move = tween(f, 58, 90, 0, 1);
  const ex = interpolate(f, [dur - 16, dur], [0, 1], { ...clamp, easing: (t) => t * t * t });
  return (
    <AbsoluteFill style={{ transform: `scale(${1 + ex * 0.35})`, filter: `blur(${ex * 18}px)` }}>
      {back ? <BackUI src={back} /> : null}
      <div style={{
        position: "absolute", left: 0, right: 0, top: interpolate(move, [0, 1], [H / 2 - 90, 40]),
        transform: `scale(${interpolate(move, [0, 1], [1, 0.4])})`, transformOrigin: "50% 0",
      }}>
        <RiseWords words={words(title)} size={title.length > 28 ? 118 : 150} />
      </div>
      <AbsoluteFill style={{ opacity: f >= uiStart ? 1 : 0 }}>
        <SequenceFrom from={uiStart}>{children}</SequenceFrom>
      </AbsoluteFill>
      {tag ? <DemoTag /> : null}
    </AbsoluteFill>
  );
};

const SequenceFrom = ({ from, children }) => <Sequence from={from} layout="none">{children}</Sequence>;

/** A far-back blurred UI layer for depth. */
export const BackUI = ({ src, w = 1440, h = 900, opacity = 0.28 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img src={staticFile(src)} style={{
        position: "absolute", width: w * 1.3, height: h * 1.3, left: (W - w * 1.3) / 2 + Math.sin(f / 200) * 40,
        top: (H - h * 1.3) / 2, filter: "blur(16px)", opacity, maxWidth: "none",
      }} />
    </AbsoluteFill>
  );
};
