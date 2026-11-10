import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { Background, Grain } from "./lib";
import {
  Calculators, EndCard, Identify, Intro, Methods, Model, Opening, Profile, Promise, Scale, Sources,
} from "./scenes/scenes";

// [component, seconds]: the beat sheet, on a 0.5 s grid (120 BPM)
export const BEATS = [
  [Opening, 6], [Intro, 3.5], [Scale, 6],
  [Profile, 7.5], [Model, 7], [Identify, 7.5], [Methods, 7], [Calculators, 7],
  [Sources, 6.5], [Promise, 4.5], [EndCard, 5],
];
export const TOTAL_SECONDS = BEATS.reduce((s, [, sec]) => s + sec, 0);

export const Film = () => (
  <AbsoluteFill>
    <Background />
    <Series>
      {BEATS.map(([Scene, sec], i) => (
        <Series.Sequence key={i} durationInFrames={Math.round(sec * 60)}>
          <Scene />
        </Series.Sequence>
      ))}
    </Series>
    <Grain />
    {/* voice-over, music and effects: video/scripts/make_audio.py */}
    <Audio src={staticFile("audio/soundtrack.wav")} />
  </AbsoluteFill>
);
