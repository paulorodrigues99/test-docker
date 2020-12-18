const config = require('./config');

async function getPage(browser, logging = true){
  async function handleRequestStyles(page) {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (config.onlyHTML && (req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'image')) {
        req.abort();
      } else {
        req.continue();
      }
    });
  }
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setDefaultNavigationTimeout(60000);
    await handleRequestStyles(page);

    if (logging) console.log('=========== Page OK ===========');
    return page;
  } catch (err) {
    console.log('===== Error when setting up Page =====');
    console.log(err);
    return null;
  }
}

module.exports = { 
  getPage
}