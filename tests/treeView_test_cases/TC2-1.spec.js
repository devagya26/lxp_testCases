const { test, expect } = require("@playwright/test");
const { loginCred } = require('./loginCred');

test("LXP treeView_testCase", async ({ page }) => {
  await loginCred(page);

  await page.locator("//span[normalize-space()='Links Explorer']").click();
  await page.waitForTimeout(2000);
});