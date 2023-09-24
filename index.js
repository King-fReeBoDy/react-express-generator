import inquirer from "inquirer";
import fs from "fs";
import path from "path";

import {
  createServerOnlyWithSrcAuth,
  createServerOnlyWithAuth,
  createServerOnlySrc,
  createServerOnly,
} from "./utils/createfilesforserver.js";

import { createViteProject } from "./utils/vite.js";

const questions = [
  {
    type: "input",
    name: "projectName",
    message: "Enter project name:",
    default: "react-express-generator",
  },
  {
    type: "list",
    name: "projectType",
    choices: ["client only", "server only", "both"],
  },
  {
    type: "confirm",
    name: "includeSrcDirectory",
    message: 'Include a "src" directory?',
    default: true,
  },
  {
    type: "confirm",
    name: "includeAuthentication",
    message: "Include authentication",
    default: true,
  },
];

async function generateTemplate(answers) {
  const {
    projectName,
    projectType,
    includeSrcDirectory,
    includeAuthentication,
  } = answers;
  fs.mkdirSync(projectName);

  const createReadme = async () => {
    await fs.promises.writeFile(
      path.join(projectName, "README.md"),
      `# ${projectName}`
    );
  };

  if (projectType === "client only") {
    createViteProject(projectName);
  } else if (projectType === "server only") {
    createReadme();
    if (includeAuthentication) {
      if (includeSrcDirectory) {
        createServerOnlyWithSrcAuth(projectName);
      } else {
        createServerOnlyWithAuth(projectName);
      }
    } else {
      if (includeSrcDirectory) {
        createServerOnlySrc(projectName);
      } else {
        createServerOnly(projectName);
      }
    }
  } else {
    if (includeAuthentication) {
      if (includeSrcDirectory) {
        createServerOnlyWithSrcAuth(projectName);
      } else {
        createServerOnlyWithAuth(projectName);
      }
    } else {
      if (includeSrcDirectory) {
        createServerOnlySrc(projectName);
      } else {
        createServerOnly(projectName);
      }
    }
  }
}

inquirer.prompt(questions).then(generateTemplate);
