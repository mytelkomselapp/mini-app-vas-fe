const fs = require("fs");
const path = require("path");

const projectConfigPath = path.resolve(__dirname, "project.config.json");
const projectConfig = require(projectConfigPath);

const env = process.env.NODE_ENV;

if (env === "production") {
  projectConfig.appid = "mp537s0zmlw0tuun";
  projectConfig.TCMPPappid = "mp537s0zmlw0tuun";
} else {
  projectConfig.appid = "mpzl347frqan32bl";
  projectConfig.TCMPPappid = "mpzl347frqan32bl";
}

fs.writeFileSync(
  projectConfigPath,
  JSON.stringify(projectConfig, null, 2),
  "utf-8"
);

console.log(`App ID set to ${projectConfig.appid} for ${env} environment`);
