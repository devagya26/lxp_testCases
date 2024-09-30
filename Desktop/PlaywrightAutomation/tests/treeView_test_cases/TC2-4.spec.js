const { test, expect } = require("@playwright/test");
const login = JSON.parse(JSON.stringify(require("../../login.json")));
import fs from "fs";

test("LXP treeView_testCase", async ({ page }) => {

    await page.goto("https://otpl-demo.atlassian.net/browse/TP-1");  
    
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
    await iframe.getByRole("button", { name: "Clear All" }).click();
    await iframe.locator("id=NOT_SET").click();

    await page.waitForTimeout(2000);
    await iframe.getByTitle("Export Tree").click();
    const downloadPromise = page.waitForEvent("download");
    await iframe.getByRole("menuitem", { name: "CSV" }).click();
    const download = await downloadPromise;
  
    await download.saveAs(
      "/Users/apple/Desktop/PlaywrightAutomation/res_testCase"
    );
  
    (async () => {
      const csvtojson = require("csvtojson");
      const fs = require("fs");
      const csvFile =
        "/Users/apple/Desktop/PlaywrightAutomation/res_testCase";
  
      csvtojson()
        .fromFile(csvFile)
        .then((json) => {
          console.log(json);
  
          fs.writeFileSync("res_testCase.json", JSON.stringify(json), "utf-8", (err) => {
            if (err) console.log(err);
          });
        });
    })();

    await page.waitForTimeout(2000);

    (() => {
      const file1 = fs.readFileSync(
        "/Users/apple/Desktop/PlaywrightAutomation/expectedTC2/TC2-4.json"
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