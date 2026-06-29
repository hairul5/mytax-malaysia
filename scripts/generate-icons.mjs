// Run once: node scripts/generate-icons.mjs
// Generates PNG icons from SVG source for PWA manifest and Apple touch icon.

import sharp from 'sharp';
import { mkdir } from 'fs/promises';

const M = "M 56,406 L 56,88 L 256,248 L 456,88 L 456,406 L 396,406 L 396,162 L 256,310 L 116,162 L 116,406 Z";

// Regular icon — rounded corners, transparent outside
const regularSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="80" fill="#003893"/>
  <path d="${M}" fill="white"/>
  <rect x="56" y="432" width="400" height="26" rx="13" fill="#CC0001"/>
</svg>`;

// Maskable icon — full-bleed (no transparent corners), safe zone respected
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#003893"/>
  <path d="${M}" fill="white"/>
  <rect x="56" y="432" width="400" height="26" rx="13" fill="#CC0001"/>
</svg>`;

await mkdir('public/icons', { recursive: true });

for (const size of [192, 512]) {
  await sharp(Buffer.from(regularSvg)).resize(size, size).png()
    .toFile(`public/icons/icon-${size}x${size}.png`);
  console.log(`✓ public/icons/icon-${size}x${size}.png`);
}

await sharp(Buffer.from(maskableSvg)).resize(512, 512).png()
  .toFile('public/icons/icon-maskable-512x512.png');
console.log('✓ public/icons/icon-maskable-512x512.png');

await sharp(Buffer.from(regularSvg)).resize(180, 180).png()
  .toFile('public/apple-touch-icon.png');
console.log('✓ public/apple-touch-icon.png');

console.log('\nDone. Icons written to public/icons/ and public/.');
