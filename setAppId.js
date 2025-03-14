const fs = require("fs");
const path = require("path");

const projectConfigPath = path.resolve(__dirname, "project.config.json");
const projectConfig = require(projectConfigPath);

const env = process.env.NODE_ENV;

if (env === "production") {
  projectConfig.appid = "mp7vumyeycsvi5ve"; //change this into your production appid
  projectConfig.TCMPPappid = "mp7vumyeycsvi5ve"; //change this into your production appid
} else {
  projectConfig.appid = "mp7vumyeycsvi5ve"; //change this into your dev appid
  projectConfig.TCMPPappid = "mp7vumyeycsvi5ve"; //change this into your dev appid
}

fs.writeFileSync(
  projectConfigPath,
  JSON.stringify(projectConfig, null, 2),
  "utf-8"
);

console.log(`App ID set to ${projectConfig.appid} for ${env} environment`);
