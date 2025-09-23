const fs = require('fs');
const path = require('path');
const report = require('multiple-cucumber-html-reporter');

const args = process.argv.slice(2);
const jsonFile = args[0];   // e.g. main.json
const reportName = args[1] || 'Branch Report';

if (!jsonFile) {
  console.error("❌ Please provide JSON file name, e.g. node generate-single-report.cjs main.json 'Main Branch'");
  process.exit(1);
}

const reportsDir = __dirname;
const tempDir = path.join(reportsDir, 'temp');

// Clean and recreate temp dir
fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(tempDir);

// Copy only the requested JSON
fs.copyFileSync(path.join(reportsDir, jsonFile), path.join(tempDir, jsonFile));

report.generate({
  jsonDir: tempDir, // ✅ only contains the one file
  reportPath: path.join(reportsDir, 'html'),
  reportName,
  pageTitle: reportName,
  displayDuration: true,
  useCDN: true
});

console.log(`✅ Report generated for ${jsonFile} at tests/reports/html/index.html`);
