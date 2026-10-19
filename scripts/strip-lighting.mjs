// One-off: strip every product object with category "Lighting" from
// lib/content.ts AND remove the "Lighting" member of the Product category
// union. Preserves file layout for everything else. Delete this file after
// running — not part of the build.

import { readFileSync, writeFileSync } from "node:fs";

const PATH = "lib/content.ts";
const src = readFileSync(PATH, "utf8");

// Walk the string. A product block always starts with "  {\n" at indent 2 and
// ends with "  },\n" (or "  }\n" for the last entry in an array). We scan
// top-level braces inside PRODUCTS to find object boundaries, then check if
// the slice contains  `category: "Lighting"`. If so, drop it.

function stripLightingObjects(input) {
  const out = [];
  let i = 0;
  while (i < input.length) {
    // Look for the start of a product object: `\n  {\n`
    const nextObjStart = input.indexOf("\n  {\n", i);
    if (nextObjStart === -1) {
      out.push(input.slice(i));
      break;
    }
    // Emit everything up to and including the newline before `  {`
    out.push(input.slice(i, nextObjStart + 1));

    // Now find the matching close `\n  },` or `\n  }\n` at the same indent.
    let depth = 0;
    let j = nextObjStart + 1;
    let endOfObj = -1;
    for (; j < input.length; j++) {
      const ch = input[j];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          endOfObj = j;
          break;
        }
      }
    }
    if (endOfObj === -1) throw new Error("Unbalanced braces");
    // Consume trailing `,` but NOT the following `\n` — leaving the
    // newline in place is what lets the next `\n  {\n` match anchor the
    // following product's start on the next loop iteration.
    let endInc = endOfObj + 1;
    if (input[endInc] === ",") endInc++;

    const block = input.slice(nextObjStart + 1, endInc);
    const isLighting = /category:\s*"Lighting"/.test(block);
    if (!isLighting) {
      out.push(block);
    }
    i = endInc;
  }
  return out.join("");
}

let next = stripLightingObjects(src);

// Remove the union member. Handles the two surrounding commas correctly.
next = next.replace(/\s*\|\s*"Lighting"/, "");

writeFileSync(PATH, next);

const before = (src.match(/category:\s*"Lighting"/g) || []).length;
const after = (next.match(/category:\s*"Lighting"/g) || []).length;
console.log(`Removed ${before - after} Lighting product entries`);
console.log(`Lighting union member removed: ${!/"Lighting"/.test(next)}`);
