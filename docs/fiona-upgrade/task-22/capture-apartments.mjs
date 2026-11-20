import pkg from "/tmp/pw-hero/node_modules/playwright-core/index.js";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const { chromium } = pkg;
const root = dirname(fileURLToPath(import.meta.url));
const base = process.env.FIONA_BASE || "http://127.0.0.1:3004";
const viewports = [
  { name: "320", width: 320, height: 640 },
  { name: "375", width: 375, height: 812 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
];

const browser = await chromium.launch({ channel: "chrome", headless: true });

async function ready(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForSelector(".loader-root", { state: "detached", timeout: 12000 }).catch(() => {});
  await page.waitForSelector("h1", { state: "visible", timeout: 20000 });
}

async function shot(page, rel) {
  const dest = join(root, "after", rel);
  mkdirSync(dirname(dest), { recursive: true });
  await page.screenshot({ path: dest, fullPage: false });
  console.log("saved", dest);
}

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  await page.goto(`${base}/apartments`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await ready(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  await shot(page, `${vp.name}/hero.png`);
  await page.locator("#green-garden").evaluate((el) => el.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(600);
  await shot(page, `${vp.name}/apartment-01.png`);
  await page.locator("#balcony-suite").evaluate((el) => el.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(600);
  await shot(page, `${vp.name}/apartment-02.png`);
  await page.locator("text=Stay Your Way").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await shot(page, `${vp.name}/cta.png`);
  console.log(vp.name, "overflow", overflow, "errors", errors.length ? errors : "none");
  await context.close();
}

const home = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const homePage = await home.newPage();
await homePage.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
await ready(homePage);
await homePage.waitForTimeout(1200);
mkdirSync(join(root, "after"), { recursive: true });
await homePage.screenshot({ path: join(root, "homepage-hero-1440.png"), fullPage: false });
console.log("saved homepage hero");
await home.close();

const reduced = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const reducedPage = await reduced.newPage();
await reducedPage.goto(`${base}/apartments`, { waitUntil: "domcontentloaded", timeout: 30000 });
await ready(reducedPage);
const h1 = await reducedPage.locator("h1").textContent();
const visible = await reducedPage.locator("h1").evaluate((el) => getComputedStyle(el).opacity);
console.log("reduced-motion h1", h1, "opacity", visible);
await shot(reducedPage, "1440/hero-reduced-motion.png");
await reduced.close();

await browser.close();
