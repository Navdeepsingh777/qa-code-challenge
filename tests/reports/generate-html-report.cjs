const reporter = require("cucumber-html-reporter");

// Accept CLI args → e.g. node generate-html-report.cjs fix1.json fix1.html
const args = process.argv.slice(2);
const jsonFile = `tests/reports/${args[0] || "cucumber-report.json"}`;
const output = `tests/reports/${args[1] || "cucumber-report.html"}`;

// Extract name from file (for branding in report header)
const branchName = args[0] ? args[0].replace(".json", "") : "main";

const options = {
  theme: "bootstrap",
  jsonFile,
  output,
  reportSuiteAsScenarios: true,
  launchReport: true,
  storeScreenshots: true,
  screenshotsDirectory: "tests/reports/screenshots",

  // 🔹 Branding / Report Title
  brandTitle: "Pokédex QA Automation Report",
  name: `${branchName.toUpperCase()} branch`,

  // 🔹 Extra metadata in the header
  metadata: {
    "App Version": "0.1.0",
    "Test Environment": "Local",
    "Browser": "Chromium",
    "Platform": process.platform
  },

  // 🔹 Highlight @bug-main scenarios with red label in report
  customCSS: `
    .label:contains('@bug-main') {
      background-color: #ff4d4d !important;
      color: #fff !important;
      font-weight: bold;
    }
  `
};

reporter.generate(options);
