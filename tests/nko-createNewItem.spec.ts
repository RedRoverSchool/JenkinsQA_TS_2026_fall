import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/nko-data";

test.describe("US_01.001 | Create new item", () => { 
    
    test("TC_01.001.22 | Verify new item was created", async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator("div[class*='MultiBranchProject']").click();
        await page.locator("#ok-button").click();
        await page.locator(".app-jenkins-logo").click();

        const newItem = page.locator("#projectstatus .jenkins-table__link");
        await expect (newItem).toHaveText(jenkinsData.itemName);
        
    });
}); 