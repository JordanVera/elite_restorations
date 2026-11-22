import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

function localFile(specifier, parentURL) {
  if (specifier.startsWith("@/")) return path.join(root, "src", specifier.slice(2));
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    if (!parentURL) return null;
    return path.resolve(path.dirname(fileURLToPath(parentURL)), specifier);
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  // server-only throws outside the Next bundler. Tests stub it so route tests can import handlers.
  if (specifier === "server-only") {
    return nextResolve(pathToFileURL(path.join(root, "scripts/server-only-stub.mjs")).href, context);
  }
  // Next's subpath entry points (next/headers, next/cache) are plain .js files without an exports map.
  if (/^next\/[a-z-]+$/.test(specifier)) {
    return nextResolve(`${specifier}.js`, context);
  }
  const base = localFile(specifier, context.parentURL);
  if (base) {
    const files = [base, `${base}.ts`, `${base}.tsx`, `${base}.mjs`, path.join(base, "index.ts")];
    for (const file of files) {
      if (existsSync(file) && statSync(file).isFile()) {
        return nextResolve(pathToFileURL(file).href, context);
      }
    }
  }
  return nextResolve(specifier, context);
}
