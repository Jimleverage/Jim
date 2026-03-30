import sharp from "sharp";
import { writeFileSync } from "fs";
import { resolve } from "path";

const INPUT = resolve("public/profile.jpg");
const OUTPUT = resolve("public/profile-processed.png");

// Image is 731x831px
// Raiders logo region (lower chest, center)
const LOGO = { left: 265, top: 490, width: 195, height: 175 };

// Background threshold — pixels whiter than this are candidates
const WHITE_THRESHOLD = 215;

console.log("Step 1: Removing Raiders logo from shirt...");

// Cover the logo with white to merge it into the shirt
const logoCleaned = await sharp(INPUT)
  .composite([{
    input: {
      create: {
        width: LOGO.width,
        height: LOGO.height,
        channels: 4,
        background: { r: 252, g: 252, b: 252, alpha: 1 },
      },
    },
    left: LOGO.left,
    top: LOGO.top,
    blend: "over",
  }])
  .png()
  .toBuffer();

console.log("Step 2: Reading raw pixel data...");

const { data, info } = await sharp(logoCleaned)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const channels = 4;
const total = width * height;

console.log(`  Image: ${width}x${height}, ${total} pixels`);

// Step 3: Flood fill from edges (top + sides, NOT bottom)
// This removes the background while leaving the white shirt intact
// (shirt is isolated from top/side background by skin tones of arms/neck)
console.log("Step 3: Flood-filling background from edges...");

const visited = new Uint8Array(total);
const stack = new Int32Array(total * 2); // pre-allocated stack
let stackTop = 0;

const push = (idx) => { stack[stackTop++] = idx; };

const isWhite = (idx) => {
  const b = idx * channels;
  return data[b] >= WHITE_THRESHOLD &&
         data[b + 1] >= WHITE_THRESHOLD &&
         data[b + 2] >= WHITE_THRESHOLD;
};

// Seed from top edge
for (let x = 0; x < width; x++) {
  const idx = x; // y=0
  if (!visited[idx] && isWhite(idx)) { visited[idx] = 1; push(idx); }
}

// Seed from left + right edges (only top 85% — stops before shirt bottom)
const edgeHeight = Math.floor(height * 0.85);
for (let y = 1; y < edgeHeight; y++) {
  const lIdx = y * width;
  const rIdx = y * width + (width - 1);
  if (!visited[lIdx] && isWhite(lIdx)) { visited[lIdx] = 1; push(lIdx); }
  if (!visited[rIdx] && isWhite(rIdx)) { visited[rIdx] = 1; push(rIdx); }
}

// DFS flood fill
let processed = 0;
while (stackTop > 0) {
  const idx = stack[--stackTop];
  const x = idx % width;
  const y = Math.floor(idx / width);

  // Make pixel transparent
  data[idx * channels + 3] = 0;
  processed++;

  // Check 4 neighbors
  const neighbors = [
    x > 0 ? idx - 1 : -1,          // left
    x < width - 1 ? idx + 1 : -1,  // right
    y > 0 ? idx - width : -1,      // up
    y < height - 1 ? idx + width : -1, // down
  ];

  for (const n of neighbors) {
    if (n >= 0 && !visited[n] && isWhite(n)) {
      visited[n] = 1;
      push(n);
    }
  }
}

console.log(`  Removed ${processed.toLocaleString()} background pixels`);

// Step 4: Light edge softening — reduce alpha of near-edge pixels
console.log("Step 4: Softening edges...");
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const idx = y * width + x;
    const aIdx = idx * channels + 3;
    if (data[aIdx] === 0) continue; // already transparent

    // Check if any neighbor is transparent (edge pixel)
    const hasTransparentNeighbor =
      data[(idx - 1) * channels + 3] === 0 ||
      data[(idx + 1) * channels + 3] === 0 ||
      data[(idx - width) * channels + 3] === 0 ||
      data[(idx + width) * channels + 3] === 0;

    if (hasTransparentNeighbor) {
      // Soften edge by reducing opacity slightly
      data[aIdx] = 180;
    }
  }
}

// Step 5: Save as PNG
console.log("Step 5: Saving PNG with transparency...");

await sharp(Buffer.from(data), {
  raw: { width, height, channels },
})
  .png({ compressionLevel: 8 })
  .toFile(OUTPUT);

console.log(`\n✓ Done! Saved to: ${OUTPUT}`);
console.log("  → Update HeroSection to use /profile-processed.png");
