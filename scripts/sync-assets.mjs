import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = process.cwd();
const publicDir = join(root, "public");

const assets = [
  {
    from: join(
      dirname(
        require.resolve("@lottiefiles/dotlottie-web", {
          paths: [dirname(require.resolve("@lottiefiles/dotlottie-react"))],
        }),
      ),
      "dotlottie-player.wasm",
    ),
    to: join(publicDir, "dotlottie-player.wasm"),
  },
];

await mkdir(publicDir, { recursive: true });
for (const asset of assets) {
  await copyFile(asset.from, asset.to);
  console.log(`synced ${asset.to}`);
}
