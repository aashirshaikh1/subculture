import { Easing } from "remotion";

// Subculture brand, taken from the site's own CSS variables in index.html
export const C = {
  bg: "#FAF6F8",
  surface: "#FFFFFF",
  surface2: "#F4EEF2",
  ink: "#1C151F",
  muted: "#5E5366",
  faint: "#857A8D",
  line: "#E6DBE3",
  accent: "#B02463",      // --virus, the site's default accent
  virus: "#B02463",
  bacterium: "#4A3AA8",
  parasite: "#A84A24",
  fungus: "#7A5BC4",
  method: "#0D6E6E",
  ok: "#1A7F55",
  warn: "#A8600F",
};
export const GRAD = "linear-gradient(90deg, #B02463, #7A5BC4 55%, #4A3AA8)";
// the site sets headings in Newsreader; the film keeps that voice
export const DISPLAY = '"Newsreader", "Iowan Old Style", Georgia, serif';
export const SANS = '"IBM Plex Sans", system-ui, sans-serif';
export const MONO = '"IBM Plex Mono", ui-monospace, monospace';

export const FPS = 60;
export const W = 1920;
export const H = 1080;
export const BEAT = 30; // 120 BPM: one beat is 0.5 s

export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
