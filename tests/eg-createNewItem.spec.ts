import { test, expect, Page } from "@/base";
import {jenkinsData} from "./testData/eg-data";

test.describe("US_01.001.0021 | Create new item", () => {
  
    test("TC_01.001.0021 | Verify item creation", async ({ page }) => {

        await page.locator("a[href='/view/all/newJob']").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();
        
        await page.locator(".app-jenkins-logo").click();

        const itemLocator = page.locator("#projectstatus .jenkins-table__link");
        await expect(itemLocator).toHaveText(jenkinsData.itemName);
    });
});
