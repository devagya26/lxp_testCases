const { test, expect } = require("@playwright/test");
const login = JSON.parse(JSON.stringify(require("../../login.json")));
import fs from "fs";

test("LXP treeView_testCase", async ({ page }) => {
    await page.goto(
      "https://otpl-demo.atlassian.net/browse/TP-1"
    );
    
    await page.getByPlaceholder("Enter your email").fill(login.username);
    await page.getByPlaceholder("Enter your email").press("Enter");
    await page.locator("//input[@id='password']").fill(login.password);
    await page.locator("//input[@id='password']").press("Enter");

    await page.locator("//span[normalize-space()='Links Explorer']").click();
    await page.waitForTimeout(2000);
    await page.pause();
});