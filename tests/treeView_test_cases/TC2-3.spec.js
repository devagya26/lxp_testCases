const { test, expect } = require("@playwright/test");
const { loginCred } = require('./loginCred');
import {convert} from './csv-to-json';
import fs from "fs";

test("LXP treeView_testCase", async ({ page }) => {
  await loginCred(page);
  await page.locator("//span[normalize-space()='Links Explorer']").click();
  await page.waitForTimeout(5000);

  const iframe = page.frame({
    url: "https://connect.app.lxp.optimizoryapps.com/issueTreeModuleEntry.b11b97199a1cc3350564.html?xdm_e=https%3A%2F%2Fotpl-demo.atlassian.net&xdm_c=channel-com.otpl.jira.plugins.lxp__lxp-issue-tab&cp=&xdm_deprecated_addon_key_do_not_use=com.otpl.jira.plugins.lxp&lic=active&cv=1001.0.0-SNAPSHOT"
  });
  await iframe.getByRole("button", { name: "Priority" }).click();
  await iframe.getByRole("button", { name: "Select All" }).click();
  await iframe.getByRole("button", { name: "Clear All" }).click();

  await page.waitForTimeout(2000);
  await iframe.getByTitle("Export Tree").click();
  const downloadPromise = page.waitForEvent("download");
  await iframe.getByRole("menuitem", { name: "CSV" }).click();
  const download = await downloadPromise;

  await download.saveAs(
    "/Users/apple/Desktop/PlaywrightAutomation/res_testCase"
  );

  convert();
  await page.waitForTimeout(2000);

  (() => {
    const file1 = fs.readFileSync(
      "/Users/apple/Desktop/PlaywrightAutomation/expectedTC2/TC2-3.json"
    );
    const file2 = fs.readFileSync(
      "/Users/apple/Desktop/PlaywrightAutomation/res_testCase.json"
    );

    const json1 = JSON.parse(file1);
    const json2 = JSON.parse(file2);

    expect(json1).toEqual(json2);
    console.log("Expected JSON = Resulted JSON");
  })();
});
