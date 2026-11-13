import { existsSync } from "node:fs";
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
  const base = localFile(specifier, context.parentURL);
  if (base) {
    const files = [base, `${base}.ts`, `${base}.tsx`, `${base}.mjs`, path.join(base, "index.ts")];
    for (const file of files) {
      if (existsSync(file)) return nextResolve(pathToFileURL(file).href, context);
    }
  }
  return nextResolve(specifier, context);
}
