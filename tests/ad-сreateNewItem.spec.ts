import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/ad-data";

test.describe("US_01.001 | Create new item", () => {
    test("TC_01.001.09 | Verify item creation with redirection to the main dashboard", async ({ page }) => {

        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();
        await page.locator(".app-jenkins-logo").click();

        const itemLocator = page.locator("#projectstatus .jenkins-table__link");

        await expect(itemLocator).toHaveText(jenkinsData.itemName);
    });
});
