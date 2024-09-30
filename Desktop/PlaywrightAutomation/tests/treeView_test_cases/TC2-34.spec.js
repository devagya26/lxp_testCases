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
    await page.waitForTimeout(5000);

    const iframe = page.frame({
      url: "https://connect.dev.lxp.optimizoryapps.com/issueTreeModuleEntry.14232e39feb6229f024f.html?xdm_e=https%3A%2F%2Fotpl-demo.atlassian.net&xdm_c=channel-com.otpl.jira.plugins.lxp__lxp-issue-tab&cp=&xdm_deprecated_addon_key_do_not_use=com.otpl.jira.plugins.lxp&lic=active&cv=1001.0.0-SNAPSHOT"
    }); 
    
    await iframe.getByRole("button", { name: "Priority" }).click();
    await iframe.getByPlaceholder("Search").fill("High");
    await page.waitForTimeout(2000);
    await iframe.getByRole("button", { name: "Priority" }).click();

    await iframe.getByRole("button", { name: "Issue Link Type" }).click();
    await iframe.getByPlaceholder("Search").fill("Relates to");
    await page.waitForTimeout(2000);
    await iframe.getByRole("button", { name: "Issue Link Type" }).click();

    await iframe.getByRole("button", { name: "Issue Type" }).click();
    await iframe.getByPlaceholder("Search").fill("Epic");
    await page.waitForTimeout(2000);
    await iframe.getByRole("button", { name: "Issue Type" }).click();
    
    await iframe.getByRole("button", { name: "Issue Card Fields" }).click();
    await iframe.getByPlaceholder("Search").fill("Summary");
    await page.waitForTimeout(2000);
    await iframe.getByRole("button", { name: "Issue Card Fields" }).click();
    
    await page.pause();

});