import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const LOCALES = ["en", "th"];
const ICU_PLACEHOLDER = /\{\s*(\w+)\s*[,}]/g;

async function readMessages(locale) {
  return JSON.parse(
    await readFile(path.join(root, `messages/${locale}.json`), "utf8"),
  );
}

function collectLeaves(value, prefix, leaves) {
  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      collectLeaves(child, prefix ? `${prefix}.${key}` : key, leaves);
    }
    return leaves;
  }
  leaves.set(prefix, value);
  return leaves;
}

function placeholdersOf(value) {
  if (typeof value !== "string") return [];
  return [...value.matchAll(ICU_PLACEHOLDER)].map((match) => match[1]).sort();
}

const localeLeaves = new Map(
  await Promise.all(
    LOCALES.map(async (locale) => [
      locale,
      collectLeaves(await readMessages(locale), "", new Map()),
    ]),
  ),
);

test("every locale exposes an identical set of message keys", () => {
  const [base, ...others] = LOCALES;
  const baseKeys = new Set(localeLeaves.get(base).keys());

  for (const locale of others) {
    const localeKeys = new Set(localeLeaves.get(locale).keys());
    const missingHere = [...baseKeys].filter((key) => !localeKeys.has(key));
    const missingThere = [...localeKeys].filter((key) => !baseKeys.has(key));

    assert.deepEqual(
      {
        missingIn: missingHere.length ? { [locale]: missingHere } : {},
        extraIn: missingThere.length ? { [locale]: missingThere } : {},
      },
      { missingIn: {}, extraIn: {} },
    );
  }
});

test("no message is left blank", () => {
  const empty = [];
  for (const locale of LOCALES) {
    for (const [key, value] of localeLeaves.get(locale)) {
      if (typeof value === "string" && value.trim() === "")
        empty.push(`${locale}: ${key}`);
    }
  }
  assert.deepEqual(empty, []);
});

test("ICU placeholders match across locales for every key", () => {
  const [base, ...others] = LOCALES;
  const baseLeaves = localeLeaves.get(base);
  const mismatches = [];

  for (const locale of others) {
    const leaves = localeLeaves.get(locale);
    for (const [key, value] of baseLeaves) {
      if (!leaves.has(key)) continue;
      const expected = placeholdersOf(value);
      const actual = placeholdersOf(leaves.get(key));
      if (expected.join("|") !== actual.join("|")) {
        mismatches.push(
          `${key}: ${base} has [${expected}] but ${locale} has [${actual}]`,
        );
      }
    }
  }

  assert.deepEqual(mismatches, []);
});
