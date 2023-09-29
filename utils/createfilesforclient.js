// import fs from "fs";
import fse from "fs-extra";
import path from "path";

export const clientTs = (projectName) => {
  try {
    const absoluteSource = path.resolve(
      "react-express-generate/templates/client-ts"
    );
    const workingdir = path.join(process.cwd(), projectName);
    fse.copySync(absoluteSource, workingdir);
  } catch (error) {
    console.error(error);
  }
};

export const clientJs = (projectName) => {
  try {
    const absoluteSource = path.resolve(
      "react-express-generate/templates/client-js"
    );
    const workingdir = path.join(process.cwd(), projectName);
    fse.copySync(absoluteSource, workingdir);
  } catch (error) {
    console.error(error);
  }
};
