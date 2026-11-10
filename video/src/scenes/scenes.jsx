import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { CountUp, FeatureScene, Glass, RiseWords, Shot, TypeText, Window, pop, tween, words } from "../lib";
import { C, DISPLAY, GRAD, MONO, SANS, W } from "../theme";

/* Screenshots are captured at 2x: 2880x1800 for full pages. */

/* ---------------------------------------------------------------- 1. the question
   Every student meets the same wall: the textbook says what an organism is, the
   practical book says what to do, and nothing joins the two. */
export const Opening = () => {
  const f = useCurrentFrame();
  const line = (text, y, start, muted) => (
    <div style={{
      position: "absolute", left: 0, right: 0, top: y, textAlign: "center",
      fontFamily: DISPLAY, fontSize: 68, color: muted ? C.muted : C.ink,
      opacity: tween(f, start, start + 22, 0, 1),
      transform: `translateY(${tween(f, start, start + 22, 18, 0)}px)`,
    }}>{text}</div>
  );
  return (
    <AbsoluteFill>
      {line("A textbook tells you what it is.", 330, 10)}
      {line("A practical manual tells you what to do.", 450, 44)}
      {line("Neither tells you why.", 620, 100, false)}
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- 2. the name */
export const Intro = () => {
  const f = useCurrentFrame();
  const p = pop(f, 4, 13);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40, transform: `scale(${0.9 + p * 0.1})`, opacity: Math.min(1, p * 2) }}>
        <Img src={staticFile("brand/icon.svg")} style={{
          width: 150, height: 150, filter: "drop-shadow(0 24px 50px rgba(176,36,99,0.35))",
        }} />
        <div style={{ fontFamily: DISPLAY, fontSize: 180, fontWeight: 600, letterSpacing: "-0.03em", color: C.ink }}>
          Subculture
        </div>
      </div>
      <div style={{ marginTop: 30, fontFamily: SANS, fontSize: 46, color: C.muted, opacity: tween(f, 40, 70, 0, 1) }}>
        From the organism to the bioreactor.
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- 3. the scale of it */
const COUNTS = [
  [19, "organism profiles"],
  [15, "lab methods"],
  [10, "staining protocols"],
  [8, "bench calculators"],
];

export const Scale = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: 34 }}>
        {COUNTS.map(([n, label], i) => {
          const start = 10 + i * 16;
          const p = pop(f, start);
          return (
            <Glass key={label} style={{
              position: "relative", width: 380, padding: "52px 0", textAlign: "center",
              opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 40}px)`,
            }}>
              <CountUp to={n} start={start + 6} dur={40} decimals={0} style={{
                fontSize: 150, fontWeight: 600, lineHeight: 1,
                backgroundImage: GRAD, WebkitBackgroundClip: "text", color: "transparent",
              }} />
              <div style={{ fontFamily: SANS, fontSize: 30, color: C.muted, marginTop: 14 }}>{label}</div>
            </Glass>
          );
        })}
      </div>
      <div style={{
        marginTop: 70, fontFamily: DISPLAY, fontSize: 60, color: C.ink,
        opacity: tween(f, 120, 150, 0, 1),
      }}>
        Every one taken apart the same way.
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- 4. an organism profile */
export const Profile = () => (
  <FeatureScene title="Every organism, *the same shape.*" dur={450} back="app/01-home.png" uiStart={76}>
    <Window x={110} y={170} w={1700} h={870}>
      <Shot src="app/02-hiv.png" w={2880} h={1800} vw={1700} vh={870}
        keys={[[0, 1440, 760, 0.59], [160, 1440, 800, 0.59], [360, 1440, 1120, 0.59]]} />
    </Window>
  </FeatureScene>
);

/* ---------------------------------------------------------------- 5. the 3D model */
export const Model = () => {
  const f = useCurrentFrame();
  return (
    <FeatureScene title="Models you can *turn in your hand.*" dur={420} uiStart={70} back="app/01-home.png">
      <Window x={430} y={210} w={1060} h={790} radius={28}>
        <Shot src="app/02-hiv.png" w={2880} h={1800} vw={1060} vh={790}
          keys={[[0, 2230, 790, 1.05], [330, 2230, 790, 1.22]]} />
      </Window>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 1000, textAlign: "center",
        fontFamily: MONO, fontSize: 26, color: C.faint, letterSpacing: "0.12em",
        opacity: tween(f, 150, 180, 0, 1),
      }}>DRAG TO ROTATE</div>
    </FeatureScene>
  );
};

/* ---------------------------------------------------------------- 6. identification */
export const Identify = () => (
  <FeatureScene title="How you *tell it apart* at the bench." dur={450} back="app/07-staph.png" uiStart={76}>
    <Window x={110} y={170} w={1700} h={870}>
      <Shot src="app/08-staph-mid.png" w={2880} h={1800} vw={1700} vh={870}
        keys={[[0, 1440, 760, 0.59], [180, 1440, 820, 0.59], [370, 1440, 1180, 0.59]]} />
    </Window>
  </FeatureScene>
);

/* ---------------------------------------------------------------- 7. methods */
export const Methods = () => (
  <FeatureScene title="Fifteen methods, *step by step.*" dur={420} back="app/01-home.png">
    <Window x={110} y={170} w={1700} h={870}>
      <Shot src="app/04-methods.png" w={2880} h={1800} vw={1700} vh={870}
        keys={[[0, 1440, 760, 0.59], [340, 1440, 1120, 0.59]]} />
    </Window>
  </FeatureScene>
);

/* ---------------------------------------------------------------- 8. calculators */
export const Calculators = () => (
  <FeatureScene title="Calculators that *do the bench maths.*" dur={420} back="app/01-home.png">
    <Window x={110} y={170} w={1700} h={870}>
      <Shot src="app/06-calculators.png" w={2880} h={1800} vw={1700} vh={870}
        keys={[[0, 1440, 760, 0.59], [340, 1440, 1100, 0.59]]} />
    </Window>
  </FeatureScene>
);

/* ---------------------------------------------------------------- 9. honest about sources */
export const Sources = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <CountUp to={151} start={8} dur={55} decimals={0} style={{
          fontSize: 280, fontWeight: 600, lineHeight: 1,
          backgroundImage: GRAD, WebkitBackgroundClip: "text", color: "transparent",
        }} />
        <div style={{ fontFamily: DISPLAY, fontSize: 64, color: C.ink, marginTop: 10, opacity: tween(f, 60, 85, 0, 1) }}>
          cited sources
        </div>
        <div style={{
          fontFamily: SANS, fontSize: 36, color: C.muted, marginTop: 28, maxWidth: 1150,
          opacity: tween(f, 95, 125, 0, 1), lineHeight: 1.45,
        }}>
          A study resource, not clinical guidance. The 3D models and the micrographs are
          drawn in code, not photographed down a microscope.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------- 10. close */
export const Promise = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 200px" }}>
      <RiseWords words={words("Not facts to memorise. *Reasons to follow.*")} size={120} />
      <div style={{
        marginTop: 50, fontFamily: SANS, fontSize: 38, color: C.muted, textAlign: "center",
        opacity: tween(f, 130, 160, 0, 1),
      }}>
        Written by someone who was learning it too.
      </div>
    </AbsoluteFill>
  );
};

export const EndCard = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center" }}>
      <Img src={staticFile("brand/icon.svg")} style={{
        position: "absolute", left: W / 2 - 80, top: 230, width: 160, height: 160,
        transform: `scale(${pop(f, 0)})`, filter: "drop-shadow(0 24px 40px rgba(176,36,99,0.35))",
      }} />
      <div style={{
        position: "absolute", top: 430, fontFamily: DISPLAY, fontSize: 124, fontWeight: 600,
        letterSpacing: "-0.03em", color: C.ink, opacity: tween(f, 18, 40, 0, 1),
      }}>Subculture</div>
      <div style={{
        position: "absolute", top: 586, fontFamily: SANS, fontSize: 40, color: C.muted,
        opacity: tween(f, 34, 58, 0, 1),
      }}>A microbiology and biotechnology study site</div>
      <Glass style={{
        left: W / 2 - 300, top: 690, width: 600, padding: "26px 0", textAlign: "center",
        opacity: tween(f, 52, 78, 0, 1),
      }}>
        <span style={{ fontFamily: MONO, fontSize: 32, color: C.accent }}>aashirshaikh.in/subculture</span>
      </Glass>
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: 10, background: GRAD,
        transform: `scaleX(${tween(f, 0, 150, 0, 1)})`, transformOrigin: "0 50%",
      }} />
    </AbsoluteFill>
  );
};
