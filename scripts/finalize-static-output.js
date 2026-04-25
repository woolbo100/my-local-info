const fs = require("fs");
const path = require("path");

const redirectsPath = path.join(process.cwd(), "out", "_redirects");
const agodaRule = "/AgodaPartnerVerification.html /AgodaPartnerVerification.htm 200";

if (!fs.existsSync(redirectsPath)) {
  throw new Error(`Missing redirects file: ${redirectsPath}`);
}

const redirects = fs.readFileSync(redirectsPath, "utf8");

if (!redirects.includes(agodaRule)) {
  const nextContent = `${agodaRule}\n${redirects}`;
  fs.writeFileSync(redirectsPath, nextContent, "utf8");
}
