# AkshayVidya — Marketing Site (PWA)

Static, installable marketing site for **AkshayVidya**, the multi-tenant School ERP by EduChetna.

## Structure

```
deploy/
├── index.html                 # the site (references images as files)
├── manifest.webmanifest       # PWA manifest (name, icons, theme)
├── sw.js                      # service worker (offline + caching)
└── assets/
    ├── icons/                 # PWA app icons (192, 512, maskable)
    └── screens/               # product screenshots (.webp + .jpg fallback)
```

## Hosting

It's fully static — host anywhere (Netlify, Vercel, GitHub Pages, S3, Nginx).
Two requirements for the PWA features (install + offline) to work:

1. **Serve over HTTPS** (or `localhost` for testing). Service workers require a secure context.
2. **Serve from the site root** so `sw.js` scope (`/`) and the manifest `start_url` resolve. If you host under a subpath, update `scope`, `start_url` in `manifest.webmanifest` and the `register('sw.js')` path / cache URLs in `sw.js`.

### Quick local test
```bash
cd deploy
python3 -m http.server 8080
# open http://localhost:8080
```
In Chrome DevTools → Application, you can confirm the manifest is detected, the
service worker is active, and use the install button in the address bar.

## Screenshots

All screenshots are real frames captured from the product demo. Per the brief,
sample names/emails/phone numbers are test data and left visible; the only
personal photo (a child profile picture in the parent portal) is blurred.
Browser/emulator chrome was cropped out.

If you replace the app's in-product name (currently shown as "AkshayEdge" in some
screens) to match the **AkshayVidya** brand, re-capture and drop new files into
`assets/screens/` using the same filenames — no HTML changes needed.

## Images

Each screenshot ships as `name.webp` (primary) with a `name.jpg` fallback via
`<picture>`. To swap any image, replace both files with the same basename.
