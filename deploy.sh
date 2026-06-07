#!/bin/bash
# Build Amplify upload zip — index.html must be at the ZIP ROOT (not inside a subfolder).
set -e
cd "$(dirname "$0")"

OUT="akshayvidya-site.zip"
rm -f "$OUT"

if [ ! -f index.html ]; then
  echo "Error: index.html not found. Run this from the akshayvidya-pwa folder."
  exit 1
fi

if [ ! -d assets ]; then
  echo "Warning: assets/ folder missing — images and icons will 404 until you add it."
fi

zip -r "$OUT" index.html manifest.webmanifest sw.js contact-config.js amplify.yml assets/ -x "*.DS_Store"
echo ""
echo "Created: $OUT"
echo "Verify zip root (must show index.html, not a subfolder):"
unzip -l "$OUT" | head -20
echo ""
echo "Upload this zip in Amplify → your app → Deploy → Drag and drop"
