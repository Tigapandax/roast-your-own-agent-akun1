import { readFileSync } from "node:fs";

const MAX_CHARS = 200;

// Read the roast, stripping one trailing newline only.
const raw = readFileSync(new URL("./one-line.txt", import.meta.url), "utf8");
const line = raw.endsWith("\n") ? raw.slice(0, -1) : raw;

function fail(reason: string): never {
  console.error(`FAIL: ${reason}`);
  process.exit(1);
}

if (line.length === 0) fail("empty line");
if (line.length > MAX_CHARS) fail(`line is ${line.length} characters, over the ${MAX_CHARS} limit`);
if (line.includes("\n")) fail("line contains a newline");
if (line.includes("\r")) fail("line contains a carriage return");
if (line.endsWith(" ")) fail("line has a trailing space");
if (line.startsWith(" ")) fail("line has a leading space");
if (line.trim().length === 0) fail("line is only whitespace");
if (!/[.!?]$/.test(line)) fail("line must end with terminal punctuation (. ! or ?)");

console.log(line);
console.log(`OK: ${line.length}/${MAX_CHARS} characters, single line, ends with punctuation.`);
