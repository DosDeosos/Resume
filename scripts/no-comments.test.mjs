import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { lineOf, sourceFiles } from "./source-files.mjs";

const root = process.cwd();
const ALLOWED =
  /^(\/\/ NOSONAR|\/\/ eslint-|\/\* eslint-|\/\/ @ts-expect-error)/;
const COMMENT = /\/\*[\s\S]*?\*\/|(?<![:"'`\\])\/\/[^\n]*/g;
const STRING_OR_TEMPLATE =
  /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g;

const roots = [path.join(root, "src"), path.join(root, ".storybook")];
const files = (
  await Promise.all(roots.map((directory) => sourceFiles(directory)))
).flat();

function stripStrings(source) {
  return source.replaceAll(STRING_OR_TEMPLATE, (match) =>
    " ".repeat(match.length),
  );
}

test("source files carry no code comments", async () => {
  const violations = [];

  for (const file of files) {
    const relative = path.relative(root, file);
    const source = await readFile(file, "utf8");
    const scannable = stripStrings(source);

    for (const match of scannable.matchAll(COMMENT)) {
      const text = match[0].trim();
      if (ALLOWED.test(text)) continue;
      violations.push(
        `${relative}:${lineOf(source, match.index)} ${text.slice(0, 80)}`,
      );
    }
  }

  assert.deepEqual(
    violations,
    [],
    `Comments are not allowed in this codebase; express intent with names and structure instead:\n${violations.join("\n")}`,
  );
});
