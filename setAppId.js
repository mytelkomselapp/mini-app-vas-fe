const fs = require("fs");
const path = require("path");

const projectConfigPath = path.resolve(__dirname, "project.config.json");
const projectConfig = require(projectConfigPath);

const env = process.env.NODE_ENV;

if (env === "production") {
  projectConfig.appid = "mp3svesjvbm65na0";
  projectConfig.TCMPPappid = "mp3svesjvbm65na0";
} else {
  projectConfig.appid = "mp3svesjvbm65na0";
  projectConfig.TCMPPappid = "mp3svesjvbm65na0";
}

fs.writeFileSync(
  projectConfigPath,
  JSON.stringify(projectConfig, null, 2),
  "utf-8"
);

console.log(`App ID set to ${projectConfig.appid} for ${env} environment`);
