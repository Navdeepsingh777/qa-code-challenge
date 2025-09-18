const reporter = require("cucumber-html-reporter");
const fs = require("fs");

const options = {
  theme: "bootstrap",
  jsonFile: "tests/reports/merged.json",
  output: "tests/reports/cucumber-report.html",
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "0.1.0",
    "Test Environment": "Local",
    "Browsers": "Chromium, Chrome, Firefox"
  }
};

// Collect all JSON reports
const files = [
  "tests/reports/cucumber-chromium.json",
  "tests/reports/cucumber-chrome.json",
  "tests/reports/cucumber-firefox.json"
];

let merged = [];
files.forEach(file => {
  if (fs.existsSync(file)) {
    merged = merged.concat(JSON.parse(fs.readFileSync(file)));
  }
});

fs.writeFileSync("tests/reports/merged.json", JSON.stringify(merged, null, 2));
reporter.generate(options);

console.log("✅ Merged report generated at tests/reports/cucumber-report.html");
