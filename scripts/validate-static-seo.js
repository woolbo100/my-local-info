const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, "out");
const siteUrl = "https://busan-now.com";
const legacyPrefixes = ["/events", "/date-course", "/date-courses"];

function fail(message) {
  console.error(`SEO validation failed: ${message}`);
  process.exit(1);
}

function readFile(relativePath) {
  const fullPath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    fail(`Missing file: ${relativePath}`);
  }

  return fs.readFileSync(fullPath, "utf8");
}

function ensureFile(relativePath) {
  const fullPath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    fail(`Missing file: ${relativePath}`);
  }
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
}

function urlToOutPath(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname;

  if (pathname === "/") {
    return path.join(outDir, "index.html");
  }

  const trimmed = pathname.replace(/^\/|\/$/g, "");
  return path.join(outDir, trimmed, "index.html");
}

function ensureCanonical(html, expectedUrl) {
  const canonicalHref = `${expectedUrl.endsWith("/") ? expectedUrl : `${expectedUrl}/`}`;
  if (!html.includes(`rel="canonical"`) || !html.includes(canonicalHref)) {
    fail(`Canonical tag missing or incorrect for ${expectedUrl}`);
  }
}

function ensureNoLegacyUrls(urls) {
  for (const url of urls) {
    const { pathname } = new URL(url);
    if (legacyPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
      fail(`Legacy redirect URL found in sitemap: ${url}`);
    }
  }
}

function ensureRequiredUrls(urls) {
  const requiredPaths = [
    "/",
    "/festivals/",
    "/benefits/",
    "/food/",
    "/hotplaces/",
    "/dates/",
    "/blog/",
    "/about/",
    "/privacy/",
    "/terms/",
  ];

  const urlSet = new Set(urls.map((url) => new URL(url).pathname));
  for (const requiredPath of requiredPaths) {
    if (!urlSet.has(requiredPath)) {
      fail(`Required URL missing from sitemap: ${requiredPath}`);
    }
  }
}

function ensureRedirectRule(redirects, source, target) {
  const expected = `${source} ${target} 301`;
  if (!redirects.includes(expected)) {
    fail(`Redirect rule missing: ${expected}`);
  }
}

ensureFile("out/index.html");
ensureFile("out/sitemap.xml");
ensureFile("out/sitemap-0.xml");
ensureFile("out/robots.txt");
ensureFile("out/_redirects");

const sitemapIndex = readFile("out/sitemap.xml");
const sitemap = readFile("out/sitemap-0.xml");
const redirects = readFile("out/_redirects");
const robots = readFile("out/robots.txt");

if (!sitemapIndex.includes(`${siteUrl}/sitemap-0.xml`)) {
  fail("Sitemap index does not point to sitemap-0.xml");
}

if (!robots.includes(`${siteUrl}/sitemap.xml`)) {
  fail("robots.txt does not reference sitemap.xml");
}

const urls = extractLocs(sitemap);
if (urls.length === 0) {
  fail("No URLs found in sitemap-0.xml");
}

ensureNoLegacyUrls(urls);
ensureRequiredUrls(urls);

for (const url of urls) {
  const expectedFile = urlToOutPath(url);
  if (!fs.existsSync(expectedFile)) {
    fail(`Sitemap URL points to missing static file: ${url}`);
  }
}

ensureRedirectRule(redirects, "/events/", "/festivals/");
ensureRedirectRule(redirects, "/date-courses/", "/dates/");
ensureRedirectRule(redirects, "/date-courses/haeundae-night-date-course/", "/dates/haeundae-date-course/");

const homepageHtml = readFile("out/index.html");
const festivalsHtml = readFile("out/festivals/index.html");
const datesHtml = readFile("out/dates/index.html");

ensureCanonical(homepageHtml, siteUrl);
ensureCanonical(festivalsHtml, `${siteUrl}/festivals`);
ensureCanonical(datesHtml, `${siteUrl}/dates`);

console.log(`SEO validation passed for ${urls.length} sitemap URLs.`);
