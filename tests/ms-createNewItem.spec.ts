import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/bs-data";

test.describe("US_01.001 | Creaye new item", () => {
  test("TC_01.001.23 | Verify item creation", async ({ page }) => {
    page.locator("#side-panel a[href$='newJob']").click();
    page.locator("#name").fill(jenkinsData.itemName);
    await page.locator(".hudson_model_FreeStyleProject").click();
    await page.locator("#ok-button").click();

    await page.locator(".app-jenkins-logo").click();
    const itemsLocator = page.locator("#projectstatus .jenkins-table__link");
    const itemNameArr = await itemsLocator.allInnerTexts();

    expect(itemNameArr).toContain(jenkinsData.itemName);
  });
});
