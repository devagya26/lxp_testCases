const { test, expect } = require("@playwright/test");
const { loginCred } = require("./loginCred");
const path = require("path");
import fs from "fs";
import {convert} from "./csv-to-json";
import {src} from "./variables";


test("LXP treeView_testCase", async ({ page }) => {
  await loginCred(page);
  await page.waitForTimeout(2000);

  await page.locator("//span[normalize-space()='Links Explorer']").click();
  await page.waitForTimeout(6000);

  const iframe = page.frame({
    url: src
  });
  await iframe.getByRole("button", { name: "Priority" }).click();
  await iframe.getByRole("button", { name: "Select All" }).click();
  await iframe.getByRole("button", { name: "Priority" }).click();
  await page.waitForTimeout(2000);

  await iframe.getByTitle("Export Tree").click();
  const downloadPromise = page.waitForEvent("download");
  await iframe.getByRole("menuitem", { name: "CSV" }).click();
  const download = await downloadPromise;
  await download.saveAs((path.resolve(__dirname, "../../res_testCase")));

  convert();
  await page.waitForTimeout(2000);

  (() => {
    const file1 = fs.readFileSync((path.resolve(__dirname, "../../expectedTC2/TC2-2.json")));
    const file2 = fs.readFileSync((path.resolve(__dirname, "../../res_testCase.json")));

    const json1 = JSON.parse(file1);
    const json2 = JSON.parse(file2);

    expect(json1).toEqual(json2);
    console.log("Expected JSON = Resulted JSON");
  })();
});
