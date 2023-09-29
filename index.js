import inquirer from "inquirer";
import fs from "fs";
import path from "path";

import {
  createServerOnlyWithSrcAuth,
  createServerOnlyWithAuth,
  createServerOnlySrc,
  createServerOnly,
} from "./utils/createfilesforserver.js";

import { clientTs, clientJs } from "./utils/createfilesforclient.js";
import { writeJsPackageJson, writeTsPackageJson } from "./utils/clientpm.js";

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
    choices: ["Client", "Server"],
  },
  {
    type: "list",
    name: "language",
    choices: ["React-ts", "React-js"],
    when: (answers) => answers.projectType === "Client",
  },
  {
    type: "confirm",
    name: "includeTailwind",
    message: "Include Tailwind",
    default: true,
    when: (answers) =>
      answers.language === "React-ts" || answers.language === "React-js",
  },
  {
    type: "confirm",
    name: "includeSrcDirectory",
    message: 'Include a "src" directory?',
    default: true,
    when: (answers) => answers.projectType === "Server",
  },
  {
    type: "confirm",
    name: "includeAuthentication",
    message: "Include authentication",
    default: true,
    when: (answers) => answers.projectType === "Server",
  },
];

async function generateTemplate(answers) {
  const workingdir = path.join(process.cwd(), answers.projectName);
  fs.mkdirSync(workingdir);

  const createReadme = async () => {
    await fs.promises.writeFile(
      path.join(process.cwd(), answers.projectName, "README.md"),
      `# ${answers.projectName}`
    );
  };

  if (answers.projectType === "Client") {
    generateClient(answers);
  } else if (answers.projectType === "Server") {
    generateServer(answers);
  } else {
    generateBoth(answers);
  }
  createReadme();
  followPropmts(answers);
}

const followPropmts = (answers) => {
  console.log("");
  console.log("cd", answers.projectName);
  console.log("npm install");
  console.log("npm run dev");
};

const generateClient = (answers) => {
  const workingdir = path.join(process.cwd(), answers.projectName);
  if (answers.language === "React-ts") {
    clientTs(answers.projectName);
    writeTsPackageJson(answers.projectName, workingdir);
  } else {
    clientJs(answers.projectName);
    writeJsPackageJson(answers.projectName, workingdir);
  }
};

const generateServer = (answers) => {
  if (answers.includeAuthentication) {
    if (answers.includeSrcDirectory) {
      createServerOnlyWithSrcAuth(answers.projectName);
    } else {
      createServerOnlyWithAuth(answers.projectName);
    }
  } else {
    if (answers.includeSrcDirectory) {
      createServerOnlySrc(answers.projectName);
    } else {
      createServerOnly(answers.projectName);
    }
  }
};

inquirer.prompt(questions).then(generateTemplate);
