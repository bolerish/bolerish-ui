import assert from "node:assert/strict";
import test from "node:test";

import { docs } from "../dist/docs.js";

test("docs prints the component installation contract", () => {
  const output: string[] = [];
  const write = console.log;
  console.log = (value: string) => output.push(value);

  try {
    docs("button");
  } finally {
    console.log = write;
  }

  assert.match(output.join("\n"), /Install: pnpm add @bolerish\/ui/);
  assert.match(output.join("\n"), /Import: @bolerish\/ui\/button/);
  assert.match(output.join("\n"), /pnpm dlx @bolerish\/ui add button/);
  assert.match(output.join("\n"), /@base-ui\/react/);
});
