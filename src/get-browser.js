const puppeteer = require('puppeteer');
const config = require('./config');

async function getBrowser(){
  try {
    const browser = await puppeteer.launch(
      {
        headless: config.headless, args: [
          '--no-sandbox', 
          '--disable-dev-shm-usage'
        ],
      },
    );
    console.log('======= Browser started =======');
    return browser;
  } catch (err) {
    console.log('===== Error when starting the browser =====');
    console.log(err);
    return null;
  }
}

module.exports = {
  getBrowser
}