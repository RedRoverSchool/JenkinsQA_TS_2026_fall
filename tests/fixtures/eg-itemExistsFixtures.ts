
import { test as baseTest } from "@/base";
import { jenkinsData } from "../testData/eg-data";

export const test = baseTest.extend<{ createSourceJob: void }>({
  createSourceJob: async ({ page }, use) => {

    await page.locator("a[href='/view/all/newJob']").click();
    await page.locator("#name").fill(jenkinsData.itemName);
    await page.locator(".hudson_model_FreeStyleProject").click();
    await page.locator("#ok-button").click();
    await page.getByRole("button", { name: "Save" }).click();
    
    await page.locator(".app-jenkins-logo").click();

    await use();

  },
});

export const expect = baseTest.expect;