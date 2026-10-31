#!/usr/bin/env python3
"""Wrap index.html in a full HTML document so the site can be opened from disk.

index.html is written for the Claude Artifact platform, which supplies the
<!doctype>, <html>, <head> and <body> wrapper plus a small CSS reset at publish
time. This script adds the same wrapper so you get an identical page locally.

Run after any edit to index.html:
    python3 build-local.py
Then open local.html in a browser.
"""
import io
import os

HERE = os.path.dirname(os.path.abspath(__file__))

SKELETON_HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>
  html { color-scheme: light }
  :root {
    padding-top: env(safe-area-inset-top, 0px);
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
  body { margin: 0; font: 14px system-ui, -apple-system, sans-serif }
  img { max-width: 100% }
  [hidden] { display: none !important }
</style>
</head>
<body>
"""

SKELETON_FOOT = """
</body>
</html>
"""


def main():
    src = os.path.join(HERE, "index.html")
    out = os.path.join(HERE, "local.html")
    with io.open(src, encoding="utf-8") as fh:
        body = fh.read()
    with io.open(out, "w", encoding="utf-8") as fh:
        fh.write(SKELETON_HEAD + body + SKELETON_FOOT)
    print("wrote %s (%d bytes)" % (out, os.path.getsize(out)))


if __name__ == "__main__":
    main()
