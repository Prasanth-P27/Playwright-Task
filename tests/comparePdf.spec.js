const fs = require('fs');
const { test, expect } = require('@playwright/test');

global.DOMMatrix = require('canvas').DOMMatrix;

const pdfjsLib = require('pdfjs-dist/legacy/build/pdf');

async function readPdfText(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const uint8Array = new Uint8Array(dataBuffer);
  
  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdf = await loadingTask.promise;
  
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + ' ';
  }
  
  return fullText.replace(/\s+/g, ' ').trim();
}


test('Compare two PDFs content', async () => {
  const pdf1Path = './pdfs/file1.pdf';
  const pdf2Path = './pdfs/file2.pdf';

  const pdf1Text = await readPdfText(pdf1Path);
  const pdf2Text = await readPdfText(pdf2Path);

  console.log('PDF 1 Content Preview:', pdf1Text.substring(0, 200));
  console.log('PDF 2 Content Preview:', pdf2Text.substring(0, 200));
  console.log('PDF 1 Length:', pdf1Text.length);
  console.log('PDF 2 Length:', pdf2Text.length);

  expect(pdf1Text).toBe(pdf2Text);
});