import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/ad-data";

test.describe("US_01.003 | Copy from", () => {
    test('TC_01.003.01 | Verify that "No items" dropdown is displayed when no items match in "Copy from" field', async ({ page }) => {
        //pre-codition
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();
        await page.locator(".app-jenkins-logo").click();

        //TC steps
        await page.locator("#side-panel a[href$='newJob']").click();
        const copyFrom = page.locator("#from");
        await copyFrom.fill(1 + jenkinsData.itemName);

        const noItemsDropdown = page.locator('.jenkins-dropdown__placeholder');
        await expect(noItemsDropdown).toHaveText(jenkinsData.textNoItemsDropdown);
    });
});