const { getBrowser } = require('./src/get-browser');
const { getPage } = require('./src/get-page');
const { format } = require('date-fns')

const consoleEnd = () => {
  const end = format(new Date, 'dd/MM/yyyy HH:mm:ss');
  console.log(`=========== ${end} ===========`);
  console.log('===========Finalizado===========')
};

(async () => {
  console.log('=========== Inicio ===========');
  const browser = await getBrowser();
  if (!browser) {
    consoleEnd();
    return;
  }
  const page = await getPage(browser);
  if (!page) {
    consoleEnd();
    return;
  }
  try {
    await page.goto('https://www.google.com')
  } catch (error) {
    console.log(error)
  } finally {
    await page.close();
    console.log('========= Page closed =========');
    await browser.close();
    console.log('======= Browser closed ========');
    consoleEnd();
  }
})();