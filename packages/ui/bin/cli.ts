#!/usr/bin/env node

import { run } from "@bolerish/cli";

if (!(await run())) process.exitCode = 1;
