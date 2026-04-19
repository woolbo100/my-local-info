const baseUrl = process.env.BASE_URL || "https://busan-now.com";
const timeoutMs = Number(process.env.VERIFY_TIMEOUT_MS || 15000);
const maxAttempts = Number(process.env.VERIFY_ATTEMPTS || 3);

const checks = [
  { path: "/", expectedStatus: 200, bodyIncludes: ['rel="canonical"', `${baseUrl}/`] },
  { path: "/sitemap.xml", expectedStatus: 200, bodyIncludes: [`${baseUrl}/sitemap-0.xml`] },
  { path: "/robots.txt", expectedStatus: 200, bodyIncludes: [`${baseUrl}/sitemap.xml`] },
  { path: "/festivals/", expectedStatus: 200, bodyIncludes: ['rel="canonical"', `${baseUrl}/festivals/`] },
  { path: "/blog/", expectedStatus: 200, bodyIncludes: ['rel="canonical"', `${baseUrl}/blog/`] },
  { path: "/events/", expectedStatus: 301, location: "/festivals/" },
  { path: "/date-courses/", expectedStatus: 301, location: "/dates/" },
  {
    path: "/date-courses/haeundae-night-date-course/",
    expectedStatus: 301,
    location: "/dates/haeundae-date-course/",
  },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request(pathname) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(new URL(pathname, baseUrl), {
      redirect: "manual",
      signal: controller.signal,
    });
    const body = await response.text();
    return { response, body };
  } finally {
    clearTimeout(timer);
  }
}

async function verifyCheck(check) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const { response, body } = await request(check.path);

      if (response.status !== check.expectedStatus) {
        throw new Error(
          `Expected ${check.expectedStatus} for ${check.path}, received ${response.status}`
        );
      }

      if (check.location) {
        const location = response.headers.get("location");
        if (location !== check.location) {
          throw new Error(
            `Expected redirect ${check.path} -> ${check.location}, received ${location || "none"}`
          );
        }
      }

      if (check.bodyIncludes) {
        for (const needle of check.bodyIncludes) {
          if (!body.includes(needle)) {
            throw new Error(`Response for ${check.path} is missing expected content: ${needle}`);
          }
        }
      }

      console.log(`Verified ${check.path} (${check.expectedStatus})`);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await sleep(5000);
      }
    }
  }

  throw lastError;
}

async function main() {
  for (const check of checks) {
    await verifyCheck(check);
  }

  console.log(`Live route verification passed for ${baseUrl}`);
}

main().catch((error) => {
  console.error(`Live verification failed: ${error.message}`);
  process.exit(1);
});
