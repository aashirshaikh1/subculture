import React from "react";
import { Composition } from "remotion";
import { Film, TOTAL_SECONDS } from "./Film";
import { FPS, H, W } from "./theme";

export const Root = () => (
  <Composition id="SubcultureLaunch" component={Film} durationInFrames={Math.round(TOTAL_SECONDS * FPS)} fps={FPS} width={W} height={H} />
);
