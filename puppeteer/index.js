const puppeteer = require("puppeteer");

// 跳转到 https://baidu.com 并保存截图至 baidu.png
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://baidu.com");
  await page.screenshot({ path: "baidu.png" });

  await browser.close();
})();

// 创建一个 PDF
(async () => {
  const browser1 = await puppeteer.launch();
  const page1 = await browser1.newPage();
  await page1.goto('https://baidu.com', {waitUntil: 'networkidle2'});
  await page1.pdf({path: 'hn.pdf', format: 'A4'});

  await browser1.close();
})();