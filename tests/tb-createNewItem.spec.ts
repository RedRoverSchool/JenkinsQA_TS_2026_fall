

import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/tb-data";

test.describe("US_01.001 | Create new item", () => {
    test("TC_01.001.24 | Verify item creation", async ({ page }) => {

await page.locator("#side-panel a[href$='newJob']").click();
await page.locator("#name").fill(jenkinsData.itemName);
await page.locator(".hudson_model_FreeStyleProject").click();
await page.locator("#ok-button").click();

await page.locator(".app-jenkins-logo").click();

const itemslocator = page.locator("#projectstatus .jenkins-table__link");

await expect(itemslocator).toHaveText(jenkinsData.itemName);

    });

});


