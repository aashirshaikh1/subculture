# subculture_site

A Frappe app that serves Subculture at `/subculture`. It holds no content of its own: the site
is `index.html` and the `.js` files in the repository root, and `sync.py` copies them in.

| In this app | Built from |
|---|---|
| `subculture_site/www/subculture.html` | `local.html`, with script paths pointed at `/assets/subculture_site/` and a "Portfolio" link back to `/` |
| `subculture_site/public/*.js` | the site's scripts, unchanged |

After editing the site, rebuild both copies:

```bash
python3 build-local.py
python3 frappe_app/subculture_site/sync.py
```

The app is installed on the same Frappe site as the portfolio (`aashir_site`), CAR-T Memory
(`cart_qc`) and IndiGuide (`indiguide_qc`). Each stays in its own repository.
