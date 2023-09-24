import fs from "fs";
import path from "path";

export function copyFolder(sourceFolder, targetFolder) {
  // Create the target folder if it doesn't exist
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  // Get a list of all items (files and subfolders) in the source folder
  const items = fs.readdirSync(sourceFolder);

  // Loop through each item
  for (const item of items) {
    const sourcePath = path.join(sourceFolder, item);
    const targetPath = path.join(targetFolder, item);

    // Check if the item is a file or directory
    const stats = fs.statSync(sourcePath);

    if (stats.isFile()) {
      // If it's a file, copy it to the target folder
      fs.copyFileSync(sourcePath, targetPath);
    } else if (stats.isDirectory()) {
      // If it's a directory, recursively copy its contents to the target folder
      copyFolder(sourcePath, targetPath);
    }
  }
}
