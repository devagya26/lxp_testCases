const { test, expect } = require("@playwright/test");
const { loginCred } = require("./loginCred");

test("LXP treeView_testCase", async ({ page }) => {
  await loginCred(page);
  await page.locator("//span[normalize-space()='Links Explorer']").click();
  await page.waitForTimeout(5000);

  const iframe = page.frame({
    url: "https://connect.app.lxp.optimizoryapps.com/issueTreeModuleEntry.b11b97199a1cc3350564.html?xdm_e=https%3A%2F%2Fotpl-demo.atlassian.net&xdm_c=channel-com.otpl.jira.plugins.lxp__lxp-issue-tab&cp=&xdm_deprecated_addon_key_do_not_use=com.otpl.jira.plugins.lxp&lic=active&cv=1001.0.0-SNAPSHOT"
  });

  await iframe
    .getByTitle("Click here to expand all tree nodes upto maximum depth of 3")
    .getByRole("button")
    .click();
  await page.waitForTimeout(6000);

  await iframe.getByTitle("Export Tree").click();
  const downloadPromise = page.waitForEvent("download");
  await iframe.getByRole("menuitem", { name: "Markdown" }).click();
  const download = await downloadPromise;

  await download.saveAs(
    "/Users/apple/Desktop/PlaywrightAutomation/exportAsMarkdown"
  );
});
