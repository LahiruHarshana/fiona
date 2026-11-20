import pkg from "/tmp/pw-hero/node_modules/playwright-core/index.js";
const { chromium } = pkg;
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const base = process.env.FIONA_BASE || "http://127.0.0.1:3002";
const pages = [
  "apartments",
  "experiences",
  "explore-galle",
  "gallery",
  "about",
  "contact",
  "retreat",
];
const viewports = [
  { name: "320", width: 320, height: 640 },
  { name: "375", width: 375, height: 812 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
];

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
});

async function shot(page, path) {
  mkdirSync(dirname(path), { recursive: true });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForSelector(".loader-root", { state: "detached", timeout: 12000 }).catch(() => {});
  await page.waitForSelector("h1", { state: "visible", timeout: 20000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path, fullPage: false });
}

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  for (const slug of pages) {
    const dest = join(root, "after", vp.name, `${slug}-hero.png`);
    await page.goto(`${base}/${slug}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await shot(page, dest);
    console.log("saved", dest);
  }
  await context.close();
}

const homeCtx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const home = await homeCtx.newPage();
await home.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
await home.waitForTimeout(4000);
await home.screenshot({ path: join(root, "homepage", "cinematic-hero-1440.png"), fullPage: false });
console.log("saved homepage");
await homeCtx.close();
await browser.close();
