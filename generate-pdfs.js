const { chromium } = require('playwright');
const path = require('path');

async function generatePDF(browser, htmlFile, pdfFile) {
  const page = await browser.newPage();

  // Load the HTML file
  const url = 'file://' + path.resolve(htmlFile);
  await page.goto(url, { waitUntil: 'networkidle' });

  // Wait for Inter font to load
  await page.waitForFunction(() => document.fonts.ready);

  await page.pdf({
    path: pdfFile,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await page.close();
  console.log(`Generated: ${pdfFile}`);
}

(async () => {
  const browser = await chromium.launch();

  await generatePDF(
    browser,
    'policies/External - Security Policy.html',
    'policies/External - Security Policy.pdf'
  );

  await generatePDF(
    browser,
    'policies/External - Sensitive Data Policy.html',
    'policies/External - Sensitive Data Policy.pdf'
  );

  await browser.close();
  console.log('Done.');
})();
