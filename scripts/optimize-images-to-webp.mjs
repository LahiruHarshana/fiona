#!/usr/bin/env node
/**
 * Convert public raster images to sidecar WebP without overwriting originals.
 * Usage:
 *   node scripts/optimize-images-to-webp.mjs --dry-run
 *   node scripts/optimize-images-to-webp.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(process.cwd(), "public");
const dryRun = process.argv.includes("--dry-run");
const manifestPath = path.resolve(process.cwd(), "docs/fiona-upgrade/task-28-webp-manifest.json");

const CONVERT_EXT = new Set([".jpg", ".jpeg", ".png", ".avif", ".bmp", ".tif", ".tiff"]);
const SKIP_DIR_NAMES = new Set(["generated"]);
const SKIP_PATH_PREFIXES = ["docs/"];

const HERO_PROTECTED = new Set([
  "/Drone/3.jpeg",
  "/Drone/9.jpeg",
  "/Guest/4.jpeg",
  "/fiona-images/707902450_122124969795184570_1085409261198412845_n.png",
  "/fiona-images/715202033_122125886307184570_8249085672172725017_n.jpg",
  "/fiona-images/logo.png",
  "/images/logo.png",
]);

function qualityFor(relPosix) {
  if (relPosix.includes("/fiona-images/") || relPosix.startsWith("/Drone/") || HERO_PROTECTED.has(relPosix)) {
    return 92;
  }
  if (relPosix.includes("/explore-galle/")) {
    return 88;
  }
  if (relPosix.endsWith(".png") && (relPosix.includes("logo") || relPosix.includes("/images/"))) {
    return 90;
  }
  return 88;
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIR_NAMES.has(entry.name)) continue;
      walk(full, acc);
    } else {
      acc.push(full);
    }
  }
  return acc;
}

function toPosixPublic(abs) {
  return `/${path.relative(root, abs).split(path.sep).join("/")}`;
}

async function sampleStats(buffer) {
  const raw = await sharp(buffer)
    .rotate()
    .resize(64, 64, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer();
  return raw;
}

function meanAbsError(a, b) {
  const n = Math.min(a.length, b.length);
  let sum = 0;
  for (let i = 0; i < n; i += 1) {
    sum += Math.abs(a[i] - b[i]);
  }
  return n ? sum / n : 0;
}

async function convertOne(abs) {
  const ext = path.extname(abs).toLowerCase();
  const relPosix = toPosixPublic(abs);
  const originalStat = fs.statSync(abs);
  const outAbs = abs.replace(/\.[^.]+$/, ".webp");
  const outRel = toPosixPublic(outAbs);
  const quality = qualityFor(relPosix);
  const protectedHero = HERO_PROTECTED.has(relPosix);

  const base = {
    originalPath: relPosix,
    webpPath: outRel,
    format: ext.slice(1),
    originalBytes: originalStat.size,
    quality,
    protectedHero,
  };

  if (!CONVERT_EXT.has(ext)) {
    return { ...base, status: "skipped-format" };
  }
  if (ext === ".webp") {
    return { ...base, status: "skipped-already-webp" };
  }

  const input = sharp(abs, { failOn: "none" }).rotate();
  const meta = await input.metadata();
  const hasAlpha = Boolean(meta.hasAlpha);
  base.width = meta.width;
  base.height = meta.height;
  base.hasAlpha = hasAlpha;
  base.orientation = meta.orientation ?? 1;

  if (dryRun) {
    return { ...base, status: "dry-run" };
  }

  const pipeline = sharp(abs, { failOn: "none" }).rotate();
  const webpBuffer = await pipeline
    .webp({
      quality,
      alphaQuality: hasAlpha ? 90 : 100,
      effort: 4,
      smartSubsample: true,
    })
    .toBuffer();

  const webpMeta = await sharp(webpBuffer).metadata();
  const originalSample = await sampleStats(fs.readFileSync(abs));
  const webpSample = await sampleStats(webpBuffer);
  const mae = meanAbsError(originalSample, webpSample);

  const smaller = webpBuffer.length < originalStat.size;
  const dimMatch = webpMeta.width === meta.width && webpMeta.height === meta.height;
  const visualOk = mae <= (protectedHero ? 4.5 : 8);
  const savings = originalStat.size - webpBuffer.length;
  const skipTiny = savings < 2048 && smaller;

  const adopt =
    smaller &&
    dimMatch &&
    visualOk &&
    !skipTiny &&
    (ext !== ".avif" || webpBuffer.length < originalStat.size * 0.95);

  if (adopt) {
    fs.writeFileSync(outAbs, webpBuffer);
  }

  return {
    ...base,
    webpBytes: webpBuffer.length,
    webpWidth: webpMeta.width,
    webpHeight: webpMeta.height,
    mae: Number(mae.toFixed(3)),
    bytesSaved: savings,
    percentSaved: Number(((savings / originalStat.size) * 100).toFixed(2)),
    dimMatch,
    visualOk,
    adopt,
    status: adopt ? "converted-adopt" : "converted-keep-original-ref",
    deferReason: adopt
      ? null
      : [
          !smaller ? "webp-not-smaller" : null,
          !dimMatch ? "dimension-mismatch" : null,
          !visualOk ? "visual-mae" : null,
          skipTiny ? "savings-under-2kb" : null,
        ]
          .filter(Boolean)
          .join(","),
  };
}

async function main() {
  const files = walk(root).filter((abs) => {
    const rel = path.relative(process.cwd(), abs);
    return !SKIP_PATH_PREFIXES.some((prefix) => rel.startsWith(prefix));
  });

  const results = [];
  for (const abs of files) {
    const ext = path.extname(abs).toLowerCase();
    if (ext === ".webp") {
      const relPosix = toPosixPublic(abs);
      results.push({
        originalPath: relPosix,
        format: "webp",
        originalBytes: fs.statSync(abs).size,
        status: "skipped-already-webp",
        adopt: false,
      });
      continue;
    }
    if (!CONVERT_EXT.has(ext)) continue;
    try {
      results.push(await convertOne(abs));
    } catch (error) {
      results.push({
        originalPath: toPosixPublic(abs),
        format: ext.slice(1),
        originalBytes: fs.statSync(abs).size,
        status: "error",
        error: error instanceof Error ? error.message : String(error),
        adopt: false,
      });
    }
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    dryRun,
    scanned: results.length,
    convertedAdopt: results.filter((r) => r.status === "converted-adopt").length,
    convertedKeepRef: results.filter((r) => r.status === "converted-keep-original-ref").length,
    skippedAlreadyWebp: results.filter((r) => r.status === "skipped-already-webp").length,
    errors: results.filter((r) => r.status === "error"),
    originalBytes: results.reduce((sum, r) => sum + (r.originalBytes || 0), 0),
    adoptedWebpBytes: results
      .filter((r) => r.adopt)
      .reduce((sum, r) => sum + (r.webpBytes || 0), 0),
    bytesSavedAdopted: results.filter((r) => r.adopt).reduce((sum, r) => sum + (r.bytesSaved || 0), 0),
    results,
  };

  const adoptedWebp = new Set(results.filter((r) => r.adopt && r.webpPath).map((r) => r.webpPath));
  for (const r of results) {
    if (r.status !== "converted-keep-original-ref" || !r.webpPath) continue;
    if (adoptedWebp.has(r.webpPath)) continue;
    const abs = path.join(root, decodeURIComponent(r.webpPath.replace(/^\//, "")));
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  }

  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(summary, null, 2));

  const mapEntries = [];
  for (const r of results) {
    if (!r.adopt || !r.originalPath || !r.webpPath) continue;
    mapEntries.push([r.originalPath, r.webpPath]);
    if (r.originalPath.includes(" ")) {
      mapEntries.push([r.originalPath.replaceAll(" ", "%20"), r.webpPath.replaceAll(" ", "%20")]);
    }
  }
  const mapBody = mapEntries
    .map(([from, to]) => `  ${JSON.stringify(from)}: ${JSON.stringify(to)},`)
    .join("\n")
    .replace(/,$/, "");
  const mapFile = path.resolve(process.cwd(), "lib/webpAdoptedPaths.ts");
  fs.writeFileSync(
    mapFile,
    `/** Generated from docs/fiona-upgrade/task-28-webp-manifest.json. Do not edit by hand. */\nexport const webpAdoptedPaths: Record<string, string> = {\n${mapBody}\n};\n\nexport function optimizedPublicSrc(src: string) {\n  return webpAdoptedPaths[src] ?? src;\n}\n`,
  );
  console.log(
    JSON.stringify(
      {
        dryRun,
        scanned: summary.scanned,
        convertedAdopt: summary.convertedAdopt,
        convertedKeepRef: summary.convertedKeepRef,
        skippedAlreadyWebp: summary.skippedAlreadyWebp,
        errors: summary.errors.length,
        bytesSavedAdopted: summary.bytesSavedAdopted,
        manifestPath,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
