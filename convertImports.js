const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "src"); // Adjust the path to your src directory

function processFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const updatedContent = fileContent
      .replace(
        /import\s*{\s*ReactComponent\s*as\s*(\w+)\s*}\s*from\s*['"]([^'"]+)['"]/g,
        'import $1 from "$2"'
      )
      .replace(/<(\w+)\s*\/>/g, "<img src={$1} />");

    fs.writeFileSync(filePath, updatedContent, "utf8");
    console.log(`Processed file: ${filePath}`);
  } catch (error) {
    console.error(`Error processing file: ${filePath}`, error);
  }
}

function traverseDirectory(directory) {
  try {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.join(directory, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        traverseDirectory(fullPath);
      } else if (fullPath.endsWith(".tsx")) {
        processFile(fullPath);
      }
    });
  } catch (error) {
    console.error(`Error traversing directory: ${directory}`, error);
  }
}

traverseDirectory(directoryPath);
