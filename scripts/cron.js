const puppeteer = require('puppeteer');
const CRON_KEY = process.env.CRON_KEY; // Passed via GitHub Secrets

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Set realistic headers and user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36');

  // Navigate to the first cron URL
  await page.goto(`https://priqra.qzz.io/cron?key=${CRON_KEY}`, {
    waitUntil: 'networkidle2', // Wait for JS to load
    timeout: 30000
  });

  // Navigate to the second cron URL
  await page.goto(`https://priqra.qzz.io/cron/broadcasts?key=${CRON_KEY}`, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  await browser.close();
})();
