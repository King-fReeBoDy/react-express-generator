import { execSync } from "child_process";

export async function createViteProject(projectName) {
  return new Promise((resolve, reject) => {
    const command = `npm create vite@latest client -- --template react-ts`;

    const childProcess = execSync(command);

    childProcess.stdout.on("data", (data) => {
      console.log(data);
    });

    childProcess.stderr.on("data", (data) => {
      console.error(data);
    });

    childProcess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`Vite project creation failed with exit code ${code}`)
        );
      }
    });
  });
}
