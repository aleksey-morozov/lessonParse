const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const main = async function () {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--proxy-server=socks5://127.0.0.1:9050'],
    });

    const page = await browser.newPage();
    await page.goto('https://www.nyse.com/quote/XNYS:APLE');

    setTimeout(async function() {
        const content = await page.content();
        const $ = cheerio.load(content);

        const dates = [];
        $('.DataTable-nyse').find('.Time').each((idx, el) => {
            const date = $(el).find('.data-table-cell').text();
            dates.push(date);
        });

        console.log(dates);

        browser.close();
    }, 5000);
};

main();