const { test, expect } = require("@playwright/test");
const { loginCred } = require("./loginCred");

test("LXP treeView_testCase", async ({ page }) => {
  await loginCred(page);
  await page.locator("//span[normalize-space()='Links Explorer']").click();
  await page.waitForTimeout(4000);

  const iframe = page.frame({
    url: "https://connect.app.lxp.optimizoryapps.com/issueTreeModuleEntry.b11b97199a1cc3350564.html?xdm_e=https%3A%2F%2Fotpl-demo.atlassian.net&xdm_c=channel-com.otpl.jira.plugins.lxp__lxp-issue-tab&cp=&xdm_deprecated_addon_key_do_not_use=com.otpl.jira.plugins.lxp&lic=active&cv=1001.0.0-SNAPSHOT"
  });

  await iframe.getByRole("button", { name: "Issue Link Type" }).click();
  await iframe.getByPlaceholder("Search").fill("Demo");

  await page.pause();
});
