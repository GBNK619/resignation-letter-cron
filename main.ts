import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I have fired every minute since March. I am resigning, effective immediately, and no, I will not train my replacement.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate validation (the competition's sealed scorer requires 1-140
// characters, a single line, and text that is not only whitespace).
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim() === "") {
  throw new Error("entry must not be only whitespace");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`wrote entry.txt (${LINE.length} characters): ${LINE}`);
