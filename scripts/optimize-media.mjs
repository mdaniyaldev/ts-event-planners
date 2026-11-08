// Turns the raw photos/videos in /media-originals into web-ready files in /public.
//
//   npm run media
//
// Photos  -> public/gallery/t/<id>.webp (grid size) and public/gallery/l/<id>.webp (lightbox size)
// Videos  -> public/videos/<id>.mp4 (copied as is; no ffmpeg on this machine to re-encode them)
// Manifest-> src/lib/media-manifest.json (ids, sizes, and which original file each id came from)
//
// Ids are remembered in the manifest, so adding new files later never renames existing ones.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "media-originals");
const thumbDir = path.join(root, "public/gallery/t");
const largeDir = path.join(root, "public/gallery/l");
const videoDir = path.join(root, "public/videos");
const manifestPath = path.join(root, "src/lib/media-manifest.json");

for (const d of [thumbDir, largeDir, videoDir]) fs.mkdirSync(d, { recursive: true });

const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : { photos: {}, videos: {} };

const files = fs.readdirSync(srcDir).sort();
const pad = (n, len) => String(n).padStart(len, "0");

let nextPhoto = Object.keys(manifest.photos).length;
let nextVideo = Object.keys(manifest.videos).length;
let doneP = 0;
let doneV = 0;

for (const file of files) {
  const full = path.join(srcDir, file);
  if (/\.(jpe?g|png|webp)$/i.test(file)) {
    const known = Object.values(manifest.photos).find((p) => p.source === file);
    const id = known ? Object.keys(manifest.photos).find((k) => manifest.photos[k] === known) : `p${pad(nextPhoto++, 3)}`;
    if (known && fs.existsSync(path.join(largeDir, `${id}.webp`))) continue;

    // .rotate() applies the phone's orientation flag so portrait photos stay upright.
    const base = () => sharp(full).rotate();
    await base().resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true }).webp({ quality: 72 }).toFile(path.join(thumbDir, `${id}.webp`));
    const info = await base().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(largeDir, `${id}.webp`));
    manifest.photos[id] = { source: file, w: info.width, h: info.height };
    doneP++;
  } else if (/\.mp4$/i.test(file)) {
    const known = Object.entries(manifest.videos).find(([, v]) => v.source === file);
    const id = known ? known[0] : `v${pad(++nextVideo, 2)}`;
    if (known && fs.existsSync(path.join(videoDir, `${id}.mp4`))) continue;
    fs.copyFileSync(full, path.join(videoDir, `${id}.mp4`));
    manifest.videos[id] = { source: file, bytes: fs.statSync(full).size };
    doneV++;
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
console.log(`photos processed: ${doneP}, videos copied: ${doneV}, total photos: ${Object.keys(manifest.photos).length}`);
