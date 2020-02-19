const axios = require('axios');
const cheerio = require('cheerio');

const parseCurrencies = async function() {
    const url = 'https://www.sravni.ru/bank/sberbank-rossii/valjuty/';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const results = [];
    $('.bank-currency__table tr').each((id, el) => {
        const name = $(el).find('td:nth-child(1)').text().trim();
        if (name) {
            const buy = strToFloat($(el).find('td:nth-child(2)').text().trim());
            const sell = strToFloat($(el).find('td:nth-child(3)').text().trim());
            results.push({name, buy, sell});
        }
    });
    console.log(results);
};

const strToFloat = (str) => {
    let result = 0;
    const match = /(\d+\,\d+)/.exec(str);
    if (match && match[1]) {
        result = parseFloat(match[1].replace(',','.'));
    }
    return result;
};

parseCurrencies();