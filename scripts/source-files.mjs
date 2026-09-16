import { readdir } from "node:fs/promises";
import path from "node:path";

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx"]);

export async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await sourceFiles(entryPath)));
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }
  return files;
}

export function lineOf(source, index) {
  return source.slice(0, index).split("\n").length;
}
