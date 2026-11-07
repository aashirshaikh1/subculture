#!/usr/bin/env python3
"""Copy the Subculture site into this Frappe app, so a Frappe site can serve it at /subculture.

The site itself stays in the repository root (index.html and the .js files). This script builds
the app's copy from it:

    www/subculture.html      from local.html, script paths pointed at /assets/subculture_site/
    public/*.js              the site's scripts, unchanged

It also adds a "Portfolio" link back to the author's portfolio, which is the front page of the
same Frappe site. Run after any edit to the site:

    python3 build-local.py
    python3 frappe_app/subculture_site/sync.py
"""
import os
import re
import shutil

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
PKG = os.path.join(HERE, "subculture_site")
ASSETS = "/assets/subculture_site"

# link back to the author's portfolio, the front page of the same Frappe site
HOME_LINK_CSS = (
    ".home-link{display:inline-flex;align-items:center;gap:6px;font-family:var(--f-mono);font-size:.7rem;letter-spacing:.06em;\n"
    "  white-space:nowrap;padding:7px 11px;border-radius:999px;border:1px solid var(--line-2);color:var(--fg-2);text-decoration:none}\n"
    ".home-link:hover{color:var(--accent);border-color:var(--accent)}\n"
    "footer .byline a{color:inherit;text-decoration:underline;text-decoration-color:var(--line-2);text-underline-offset:3px}\n"
    "footer .byline a:hover{text-decoration-color:var(--accent)}"
)


def replace_once(html: str, old: str, new: str) -> str:
    if html.count(old) != 1:
        raise SystemExit(f"sync.py: expected one {old[:60]!r} in local.html, found {html.count(old)}")
    return html.replace(old, new)


def add_home_link(html: str) -> str:
    if "home-link" in html:
        return html
    anchor = ".searchbox{position:relative;flex:1 1 220px;min-width:0}"
    html = replace_once(html, anchor, anchor + "\n" + HOME_LINK_CSS)
    m = re.search(r'(      <div class="results" id="results" hidden></div>\n    </div>\n)(  </div>)', html)
    if not m:
        raise SystemExit("sync.py: could not find the search box to put the Portfolio link after")
    link = '    <a class="home-link" href="/" title="Aashir Shaikh\'s portfolio">&larr; Portfolio</a>\n'
    html = html[: m.start()] + m[1] + link + m[2] + html[m.end():]
    return replace_once(html, "built by <b>Aashir Shaikh</b>.", 'built by <b><a href="/">Aashir Shaikh</a></b>.')


def main() -> None:
    html = open(os.path.join(REPO, "local.html"), encoding="utf-8").read().replace("\r\n", "\n")
    scripts = sorted(f for f in os.listdir(REPO) if f.endswith(".js"))
    for name in scripts:
        html = html.replace(f'src="{name}"', f'src="{ASSETS}/{name}"')
    html = add_home_link(html)
    # The browser tab icon. The standalone site has no <head> of its own to put one in.
    html = replace_once(html, "<title>", f'<link rel="icon" href="{ASSETS}/icon.svg">\n<title>')
    if "{% endraw" in html:
        raise SystemExit("sync.py: local.html contains {% endraw %}, which would break the page")
    # A full document (it has </body>), so Frappe adds no layout of its own; {% raw %} keeps
    # Jinja away from the JavaScript; no-cache makes an edit show on the next reload.
    first, rest = html.split("\n", 1)
    page = f"{first}\n<!-- no-cache -->\n{{% raw %}}{rest}{{% endraw %}}\n"
    os.makedirs(os.path.join(PKG, "www"), exist_ok=True)
    with open(os.path.join(PKG, "www", "subculture.html"), "w", encoding="utf-8", newline="\n") as fh:
        fh.write(page)

    public = os.path.join(PKG, "public")
    for old in os.listdir(public) if os.path.isdir(public) else []:
        if old.endswith(".js"):
            os.remove(os.path.join(public, old))
    os.makedirs(public, exist_ok=True)
    for name in scripts:
        shutil.copy2(os.path.join(REPO, name), os.path.join(public, name))
    shutil.copy2(os.path.join(HERE, "icon.svg"), os.path.join(public, "icon.svg"))
    print(f"synced www/subculture.html and {len(scripts)} scripts")


if __name__ == "__main__":
    main()
