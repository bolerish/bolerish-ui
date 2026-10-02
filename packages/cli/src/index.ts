import { resolve } from "node:path";

import { add } from "./add.js";
import { parseArguments } from "./arguments.js";
import { docs, list } from "./docs.js";
import { doctor } from "./doctor.js";
import { init } from "./init.js";
import { newComponent } from "./new-component.js";

export async function run(arguments_ = process.argv.slice(2)) {
  try {
    const { command, options, positionals } = parseArguments(arguments_);
    const projectDirectory = resolve(String(options.cwd ?? process.cwd()));

    switch (command) {
      case "init":
        await init(projectDirectory, options);
        break;
      case "add":
        await add(projectDirectory, positionals, options);
        break;
      case "doctor":
        return await doctor(projectDirectory);
      case "docs":
        docs(positionals[0]);
        break;
      case "list":
        list();
        break;
      case "new":
        await newComponent(projectDirectory, positionals[0]);
        break;
      default:
        console.log(`@nuee/ui CLI

Usage:
  nuee init [--ui <path>] [--styles <path>] [--vite]
  nuee add <component...> [--skip-dependencies] [--dry-run]
  nuee doctor
  nuee list
  nuee docs [component]
  nuee new <kebab-case-name>`);
        break;
    }

    return true;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return false;
  }
}
