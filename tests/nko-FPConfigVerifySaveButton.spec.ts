import { test, expect } from "@/base";
import { jenkinsData } from "./testData/nko-data";

test.describe("TC_02.008 | Freestyle Project Configuration", () => { 
    
    test("TC_02.008.01 | Verify Save Button is visible", async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator("div[class*='FreeStyleProject']").click();
        await page.getByRole("button", {name:"Ok"}).click();

        const saveButton = page.getByRole("button", {name:"Save"});
        await expect (saveButton).toBeVisible();
        
    });
}); 