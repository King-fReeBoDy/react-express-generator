import fs from "fs";
import fse from "fs-extra/esm";
import path from "path";

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
  try {
    const srcDirectory = path.join(projectName, "src");
    createDirectory(srcDirectory);

    const absoluteSource = path.resolve("server");
    fse.copySync(absoluteSource, srcDirectory);
  } catch (error) {
    console.error(error);
  }
};

export const createServerOnlyWithAuth = (projectName) => {
  try {
    const absoluteSource = path.resolve("server");
    fse.copySync(absoluteSource, projectName);
  } catch (error) {
    console.error(error);
  }
};
