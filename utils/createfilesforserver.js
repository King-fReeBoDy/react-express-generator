import fs from "fs";
import path from "path";

import { copyFolder } from "./copyfiles.js";
import { server } from "../server.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const createDirectory = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
};

const createFileWithContent = (filePath, content) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
};

export const createServerOnlySrc = (projectName) => {
  const srcDirectory = path.join(projectName, "src");
  createDirectory(srcDirectory);

  const subdirectories = [
    "controllers",
    "models",
    "middleware",
    "routes",
    "utils",
    "storage",
  ];
  subdirectories.forEach((subdir) => {
    createDirectory(path.join(srcDirectory, subdir));
  });

  const serverFilePath = path.join(projectName, "index.js");
  createFileWithContent(serverFilePath, server);
};

export const createServerOnly = (projectName) => {
  const subdirectories = [
    "controllers",
    "models",
    "middleware",
    "routes",
    "utils",
    "storage",
  ];
  subdirectories.forEach((subdir) => {
    createDirectory(path.join(projectName, subdir));
  });

  const serverFilePath = path.join(projectName, "index.js");
  createFileWithContent(serverFilePath, server);
};

export const createServerOnlyWithSrcAuth = (projectName) => {
  const srcDirectory = path.join(projectName, "src");
  createDirectory(srcDirectory);
  const absolute = path.resolve(__dirname, "../server");
  copyFolder(absolute, srcDirectory);
};

export const createServerOnlyWithAuth = (projectName) => {
  copyFolder(path.join("../server"), projectName);
};
