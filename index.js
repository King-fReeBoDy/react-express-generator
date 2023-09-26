import inquirer from "inquirer";
import fs from "fs";
import path from "path";

import {
  createServerOnlyWithSrcAuth,
  createServerOnlyWithAuth,
  createServerOnlySrc,
  createServerOnly,
} from "./utils/createfilesforserver.js";

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
    choices: ["Client", "Server", "Both"],
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
    when: (answers) =>
      answers.projectType === "Server" || answers.projectType === "Both",
  },
  {
    type: "confirm",
    name: "includeAuthentication",
    message: "Include authentication",
    default: true,
    when: (answers) =>
      answers.projectType === "Server" || answers.projectType === "Both",
  },
];

async function generateTemplate(answers) {
  fs.mkdirSync(answers.projectName);

  const createReadme = async () => {
    await fs.promises.writeFile(
      path.join(answers.projectName, "README.md"),
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
}

const generateClient = (answers) => {
  if (answers.includeTailwind) {
    if (answers.language === "React-ts") {
      console.log("ts tailwind");
    } else {
      console.log("js tailwind");
    }
  } else {
    if (answers.language === "React-ts") {
      console.log("ts");
    } else {
      console.log("js");
    }
  }
  console.log("");
  console.log("");
  console.log("cd", answers.projectName);
  console.log("npm install");
  console.log("npm run dev");
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

const generateBoth = (answers) => {
  // if (answers.includeAuthentication) {
  //   if (answers.includeSrcDirectory) {
  //     createServerOnlyWithSrcAuth(answers.projectName);
  //   } else {
  //     createServerOnlyWithAuth(answers.projectName);
  //   }
  // } else {
  //   if (answers.includeSrcDirectory) {
  //     createServerOnlySrc(answers.projectName);
  //   } else {
  //     createServerOnly(answers.projectName);
  //   }
  // }

  console.log("Both");
};

inquirer.prompt(questions).then(generateTemplate);
