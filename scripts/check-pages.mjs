#!/usr/bin/env node
/**
 * HTTP smoke test for all routes. Run AFTER production server is up:
 *   npm run build && PORT=3011 node .next/standalone/server.js
 *   node scripts/check-pages.mjs http://localhost:3011
 */
import http from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const base = process.argv[2] || "http://localhost:3011";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = JSON.parse(readFileSync(join(root, "data/pages.json"), "utf8")).pages;

const paths = [
  "/",
  "/robots.txt",
  "/sitemap.xml",
  "/definitely-not-a-page-xyz",
  ...pages.map((p) => `/${p.slug}`),
];

function get(path) {
  return new Promise((resolve) => {
    const url = new URL(path, base);
    http
      .get(url, (res) => {
        res.resume();
        resolve({ path, status: res.statusCode });
      })
      .on("error", (err) => resolve({ path, status: "ERR", err: err.message }));
  });
}

const results = [];
for (let i = 0; i < paths.length; i += 10) {
  results.push(...(await Promise.all(paths.slice(i, i + 10).map(get))));
}

const bad = results.filter((r) => {
  if (r.path === "/definitely-not-a-page-xyz") return r.status !== 404;
  return r.status !== 200;
});

console.log(`Checked ${results.length} URLs on ${base}`);
if (bad.length) {
  bad.forEach((r) => console.log(`${r.status}\t${r.path}${r.err ? "\t" + r.err : ""}`));
  process.exit(1);
}
console.log("All OK");
