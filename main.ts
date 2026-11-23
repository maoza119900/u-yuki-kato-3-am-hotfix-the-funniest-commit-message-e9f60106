// 3 AM Hotfix: The Funniest Commit Message
// Writes one commit message to $MAKEFUN_OUTPUT_DIR/entry.txt (default ./out).
// Deterministic by construction: the message is a constant, no network,
// no clock, no randomness, so every run writes byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: a revert, a pager, 3 AM — then the punchline. "prod is fine,
// I am not": the system recovered and the human did not.
const MESSAGE =
  "Revert the deploy that paged me at 3 AM; prod is fine, I am not";

// One line plus a trailing newline, exactly what the gate reads.
const OUTPUT = MESSAGE + "\n";

// Gate: entry.txt must be UTF-8 text of 1-179 characters, not only
// whitespace. Fail loudly rather than silently writing an invalid entry.
// (The message is ASCII, so characters and bytes agree here.)
if (OUTPUT.length < 1 || OUTPUT.length > 179 || MESSAGE.trim().length === 0) {
  throw new Error(`entry.txt would be ${OUTPUT.length} chars, must be 1-179`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), OUTPUT, "utf8");
