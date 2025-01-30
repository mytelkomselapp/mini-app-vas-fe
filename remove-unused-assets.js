const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Directory containing assets
const assetsDir = path.join(__dirname, "src/assets");

// Get all asset files
const assetFiles = glob.sync(`${assetsDir}/**/*.*`);

// Function to check if a file is used in the codebase
const isFileUsed = (filePath) => {
  const fileName = path.basename(filePath);
  const command = `grep -r "${fileName}" src/`;
  try {
    const result = require("child_process").execSync(command).toString();
    return result.includes(fileName);
  } catch (error) {
    return false;
  }
};

// Identify and remove unused assets
assetFiles.forEach((file) => {
  if (!isFileUsed(file)) {
    fs.unlinkSync(file);
    console.log(`Removed unused asset: ${file}`);
  }
});

console.log("Unused assets removal complete.");
