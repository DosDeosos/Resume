import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const outputDir = join(root, ".next", "static");
const budget = JSON.parse(
  await readFile(join(root, "performance-budget.json"), "utf8"),
);

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await filesUnder(path)));
    else files.push(path);
  }
  return files;
}

async function sizeOf(files) {
  const sizes = await Promise.all(
    files.map(async (file) => (await stat(file)).size),
  );
  return {
    total: sizes.reduce((sum, size) => sum + size, 0),
    largest: Math.max(0, ...sizes),
  };
}

try {
  const files = await filesUnder(outputDir);
  const javascript = await sizeOf(files.filter((file) => file.endsWith(".js")));
  const css = await sizeOf(files.filter((file) => file.endsWith(".css")));
  const failures = [];

  if (javascript.total > budget.staticJavaScriptBytes) {
    failures.push(
      `JavaScript total ${javascript.total} exceeds ${budget.staticJavaScriptBytes} bytes`,
    );
  }
  if (javascript.largest > budget.largestJavaScriptChunkBytes) {
    failures.push(
      `Largest JavaScript chunk ${javascript.largest} exceeds ${budget.largestJavaScriptChunkBytes} bytes`,
    );
  }
  if (css.total > budget.staticCssBytes) {
    failures.push(
      `CSS total ${css.total} exceeds ${budget.staticCssBytes} bytes`,
    );
  }

  console.log(
    `Performance budget: JS ${(javascript.total / 1024 / 1024).toFixed(2)} MiB total, largest ${(javascript.largest / 1024).toFixed(1)} KiB, CSS ${(css.total / 1024).toFixed(1)} KiB`,
  );
  if (failures.length > 0) {
    for (const failure of failures) console.error(`::error::${failure}`);
    process.exitCode = 1;
  }
} catch (error) {
  if (error?.code === "ENOENT") {
    console.error(
      "::error::Build output not found. Run `pnpm build` before checking performance budgets.",
    );
  } else {
    throw error;
  }
  process.exitCode = 1;
}
