const { chromium } = require('playwright');
const login = JSON.parse(JSON.stringify(require("../../login.json")));

async function loginCred(page) {
    await page.goto(
        "https://otpl-demo.atlassian.net/browse/TP-1"
      );
      await page.getByPlaceholder("Enter your email").fill(login.username);
      await page.getByPlaceholder("Enter your email").press("Enter");
      await page.locator("//input[@id='password']").fill(login.password);
      await page.locator("//input[@id='password']").press("Enter");
}

module.exports = {loginCred};

