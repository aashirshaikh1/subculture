import { continueRender, delayRender, registerRoot } from "remotion";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/500.css";
import "@fontsource/newsreader/600.css";
import { Root } from "./Root";

// wait for every weight before the first frame is captured
const handle = delayRender("Loading IBM Plex and Newsreader");
Promise.all(
  ["300", "400", "500", "600", "700"].map((w) => document.fonts.load(`${w} 40px "IBM Plex Sans"`))
    .concat(["400", "500"].map((w) => document.fonts.load(`${w} 40px "IBM Plex Mono"`)))
    .concat(["400", "500", "600"].map((w) => document.fonts.load(`${w} 40px "Newsreader"`)))
).then(() => continueRender(handle));

registerRoot(Root);
