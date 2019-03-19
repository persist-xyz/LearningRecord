const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch(); // 打开浏览器
    const page = await browser.newPage(); // 打开新tab页
    await page.goto("https://image.baidu.com"); // 跳转到百度图片
    console.log("go to https://image.baidu.com"); // 获取input框的焦点

    await page.focus("#kw"); // 把焦点定位到搜索input框
    await page.keyboard.sendCharacter("猫咪"); // 输入关键字
    await page.click(".s_search"); // 点击搜索按钮
    console.log("go to search list"); // 提示跳转到搜索列表页

    page.on("load", async () => {
        await autoScroll(page); // 向下滚动加载图片
        console.log("page loading done, start fetch...");
        const srcs = await page.evaluate(() => {
            const images = document.querySelectorAll("img.main_img");
            return Array.prototype.map.call(images, img => img.src);
        }); // 获取所有img的src
        console.log(`get ${srcs.length} images, start download`);
        for (let i = 0; i < srcs.length; i++) {
            await convert2Img(srcs[i], target);
            console.log(`finished ${i + 1}/${srcs.length} images`);
        } // 保存图片
        console.log(`job finished!`);
        await browser.close();
    })
})()