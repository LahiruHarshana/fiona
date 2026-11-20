import pkg from "/tmp/pw-hero/node_modules/playwright-core/index.js";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const { chromium } = pkg;
const root = dirname(fileURLToPath(import.meta.url));
const base = process.env.FIONA_BASE || "http://127.0.0.1:3003";
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

async function prepare(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForSelector(".loader-root", { state: "detached", timeout: 12000 }).catch(() => {});
  await page.waitForSelector("footer", { state: "attached", timeout: 15000 });
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
  await prepare(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const dest = join(root, "after", vp.name, "apartments-footer.png");
  mkdirSync(dirname(dest), { recursive: true });
  await page.locator("footer").screenshot({ path: dest });
  console.log("saved", dest, "overflow", overflow, "errors", errors.length ? errors : "none");

  if (vp.name === "1440" || vp.name === "375") {
    await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await prepare(page);
    const homeDest = join(root, "after", vp.name, "homepage-footer.png");
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.locator("footer").screenshot({ path: homeDest });
    console.log("saved", homeDest);
    if (vp.name === "1440") {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await page.screenshot({
        path: join(root, "homepage-hero-1440.png"),
        fullPage: false,
      });
      console.log("saved homepage hero");
    }
  }
  await context.close();
}

await browser.close();
