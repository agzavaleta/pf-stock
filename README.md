# PF Stock — v0.9.0-beta

Inventario de repuestos industriales. Single-file React PWA, sin backend, sin bundler.

## Stack

- React 18 (CDN UMD)
- Babel Standalone (in-browser JSX transpilation)
- SheetJS 0.18.5 (lazy-loaded, Excel import/export)
- PWA: manifest + service worker

## Deployment

### Vercel (recommended)

1. Push this folder to a GitHub repo.
2. Import repo in [vercel.com](https://vercel.com).
3. Set **Framework Preset** → `Other` (static site, no build command).
4. **Root directory** → the folder containing `index.html`.
5. Deploy. Done.

### Manual / any static host

Upload all files preserving the folder structure below. Ensure:
- `service-worker.js` is served with `Cache-Control: no-cache`.
- `app.jsx` is served with `Content-Type: application/javascript`.
- All navigation paths redirect to `index.html`.

## Folder structure

```
pf-stock/
├── index.html
├── app.jsx
├── manifest.json
├── service-worker.js
├── vercel.json
├── README.md
└── icons/
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    ├── android-chrome-192x192.png
    ├── android-chrome-512x512.png
    ├── icon-16x16.png
    ├── icon-32x32.png
    ├── icon-48x48.png
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-180x180.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    ├── icon-512x512.png
    ├── maskable-icon-192x192.png
    └── maskable-icon-512x512.png
```

## Install as PWA (iPhone)

1. Open the deployed URL in **Safari**.
2. Tap Share → **Add to Home Screen**.
3. Confirm name "PF Stock" → Add.

## Install as PWA (Android)

Chrome shows an "Add to Home Screen" banner automatically.
Or: Menu → **Install app**.

## Excel Import Format

Columns (A–F): `codigo ; nombre ; cantidad ; valor ; subfamilia ; bodega`

- Rows with `cantidad = 0` are skipped.
- Unknown subfamilias are skipped with a summary.
- `R-999` rows: `bodega 302` → Lubricantes, `bodega 330` → Fungibles.
- Other LU/FU subfamilias: `codigo` prefix `L` → Lubricantes, `F` → Fungibles.
