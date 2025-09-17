const reporter = require("cucumber-html-reporter");

const options = {
  theme: "bootstrap",
  jsonFile: "tests/reports/cucumber-report.json",
  output: "tests/reports/cucumber-report.html",
  reportSuiteAsScenarios: true,
  launchReport: true,
  storeScreenshots: true,
  screenshotsDirectory: "tests/reports/screenshots",

  // 🔹 Branding / Report Title
  brandTitle: "Pokédex QA Automation Report",
  name: "Main branch (with known bugs)",

  // 🔹 Extra metadata in the header
  metadata: {
    "App Version": "0.1.0",
    "Test Environment": "Local",
    "Browser": "Chromium",
    "Platform": process.platform,
    "Known Bug Tag": "@bug-main (expected failure on main)"
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
