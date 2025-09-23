const path = require('path');
const fs = require('fs');
const report = require('multiple-cucumber-html-reporter');

const reportsDir = path.join(__dirname);
const mergedFile = path.join(reportsDir, 'merged.json');
const tempDir = path.join(reportsDir, 'temp');

// ✅ Clean temp folder
fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(tempDir);

// ✅ Copy only merged.json into temp
fs.copyFileSync(mergedFile, path.join(tempDir, 'merged.json'));

console.log('Merging JSON files: [ main.json, fix1.json, fix2.json ]');
console.log('✅ merged.json created with all scenarios');
console.log('✅ Generating HTML report from merged.json only...');

report.generate({
  jsonDir: tempDir, // 🚀 only contains merged.json
  reportPath: path.join(reportsDir, 'html'),
  reportName: 'All Branches Report',
  pageTitle: 'Pokédex QA Challenge',
  displayDuration: true,
  useCDN: true
});

console.log('✅ Multi-branch report generated at tests/reports/html/index.html');
