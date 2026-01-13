const fs = require('fs');
const path = require('path');

// ✅ Always resolve paths from THIS file location
const reportDataPath = path.join(__dirname, 'report-data.json');
const outputHtmlPath = path.join(__dirname, 'pdf-comparison-report.html');

// Read JSON
const data = JSON.parse(fs.readFileSync(reportDataPath, 'utf-8'));

const isPassed = data.result === 'PASSED';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Execution Report</title>
<style>
  body {
    font-family: Segoe UI, Arial, sans-serif;
    background: #f4f6f9;
    padding: 40px;
  }
  .container {
    max-width: 900px;
    margin: auto;
  }
  h1 {
    margin-bottom: 25px;
    color: #2c3e50;
  }
  .summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }
  .card {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    text-align: center;
  }
  .card-title {
    font-size: 14px;
    color: #7f8c8d;
  }
  .card-value {
    font-size: 22px;
    font-weight: bold;
    color: #2c3e50;
  }
  .status {
    padding: 8px 18px;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    background: ${isPassed ? '#2ecc71' : '#e74c3c'};
  }
</style>
</head>
<body>
<div class="container">

<h1>Execution Summary</h1>

<div class="summary">
  <div class="card">
    <div class="card-title">Test Name</div>
    <div class="card-value">${data.testName}</div>
  </div>
  <div class="card">
    <div class="card-title">PDF 1 Length</div>
    <div class="card-value">${data.pdf1Length}</div>
  </div>
  <div class="card">
    <div class="card-title">PDF 2 Length</div>
    <div class="card-value">${data.pdf2Length}</div>
  </div>
</div>

<div class="card">
  <h3>Validation Result</h3>
  <span class="status">${data.result}</span>
</div>

</div>
</body>
</html>
`;

// Write HTML
fs.writeFileSync(outputHtmlPath, html);

console.log('✅ PDF comparison HTML report generated successfully');
