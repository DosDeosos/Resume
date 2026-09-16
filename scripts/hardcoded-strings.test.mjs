import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { lineOf, sourceFiles } from "./source-files.mjs";

const root = process.cwd();
const sourceRoot = path.join(root, "src");

const NOT_DISPLAY_COPY = new Set([
  "Vuttipat Srisumran",
  "Full-Stack Developer",
  "Trienpont International",
  "Compass Hospitality",
  "Dependable Lift Rentals",
  "Solar Cell Data Feed",
]);

const ATTRIBUTE_PATTERN =
  /\b(aria-label|placeholder|title|alt)=\{?"([^"]{2,})"\}?/g;
const JSX_TEXT_PATTERN =
  />[^\S\n]*\n[^\S\n]*([A-Za-z฀-๿][^<>{}\n]{3,})\n[^\S\n]*</g;
const THAI_CHARACTER = /[฀-๿]/g;

const files = (await sourceFiles(sourceRoot)).filter(
  (file) =>
    !path.relative(root, file).includes(`${path.sep}stories${path.sep}`),
);

function isTranslatable(text) {
  const trimmed = text.trim();
  if (NOT_DISPLAY_COPY.has(trimmed)) return false;
  if ((trimmed.match(THAI_CHARACTER) ?? []).length >= 2) return true;
  if (!/\s/.test(trimmed)) return false;
  const words = trimmed.match(/[A-Za-z฀-๿]{2,}/g) ?? [];
  return words.length >= 2;
}

test("user-visible string attributes come from next-intl, not literals", async () => {
  const violations = [];

  for (const file of files) {
    const relative = path.relative(root, file);
    const source = await readFile(file, "utf8");

    for (const match of source.matchAll(ATTRIBUTE_PATTERN)) {
      const [, attribute, value] = match;
      if (!isTranslatable(value)) continue;
      violations.push(
        `${relative}:${lineOf(source, match.index)} ${attribute}="${value}"`,
      );
    }
  }

  assert.deepEqual(
    violations,
    [],
    `Move these attribute strings into messages/*.json:\n${violations.join("\n")}`,
  );
});

test("JSX text nodes come from next-intl, not literals", async () => {
  const violations = [];

  for (const file of files) {
    const relative = path.relative(root, file);
    const source = await readFile(file, "utf8");

    for (const match of source.matchAll(JSX_TEXT_PATTERN)) {
      const text = match[1];
      if (!isTranslatable(text)) continue;
      violations.push(
        `${relative}:${lineOf(source, match.index)} ${text.trim()}`,
      );
    }
  }

  assert.deepEqual(
    violations,
    [],
    `Move these JSX text nodes into messages/*.json:\n${violations.join("\n")}`,
  );
});
