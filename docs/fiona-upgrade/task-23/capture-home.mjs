import pkg from "/tmp/pw-hero/node_modules/playwright-core/index.js";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const { chromium } = pkg;
const root = dirname(fileURLToPath(import.meta.url));
const base = process.env.FIONA_BASE || "http://127.0.0.1:3005";
const sections = [
  ["welcome", "welcome"],
  ["why-choose", "why-choose"],
  ["discover-apartments", "apartments"],
  ["fiona-experience", "experience"],
  ["southern-sri-lanka", "south-coast"],
  ["gallery-preview", "gallery"],
  ["hospitality", "hospitality"],
  ["plan-your-stay", "cta"],
];
const viewports = [
  { name: "320", width: 320, height: 640 },
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];

const browser = await chromium.launch({ channel: "chrome", headless: true });

async function ready(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForSelector(".loader-root", { state: "detached", timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(800);
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
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await ready(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  await shot(page, `${vp.name}/hero.png`);
  for (const [id, name] of sections) {
    await page.locator(`#${id}`).evaluate((el) => el.scrollIntoView({ block: "start" }));
    await page.waitForTimeout(700);
    await shot(page, `${vp.name}/${name}.png`);
  }
  await page.locator("footer").evaluate((el) => el.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(400);
  await shot(page, `${vp.name}/footer.png`);
  console.log(vp.name, "overflow", overflow, "errors", errors.length ? errors : "none");
  await context.close();
}

const extra = [
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "1024", width: 1024, height: 768 },
];
for (const vp of extra) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await ready(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  await shot(page, `${vp.name}/hero.png`);
  await page.locator("#welcome").evaluate((el) => el.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(600);
  await shot(page, `${vp.name}/welcome.png`);
  console.log(vp.name, "overflow", overflow);
  await context.close();
}

const reduced = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const reducedPage = await reduced.newPage();
await reducedPage.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 45000 });
await ready(reducedPage);
await reducedPage.locator("#welcome").evaluate((el) => el.scrollIntoView({ block: "start" }));
await reducedPage.waitForTimeout(400);
const opacity = await reducedPage.locator("#welcome h2").evaluate((el) => getComputedStyle(el).opacity);
console.log("reduced-motion welcome h2 opacity", opacity);
await shot(reducedPage, "1440/welcome-reduced-motion.png");
await reduced.close();

await browser.close();
