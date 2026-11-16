import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/yl-data";

test.describe("US_01.001 | Create new item", () => {

    test("TC_01.001.20 | Verify item creation", async ({ page }) => {
        await page.locator("a[href='newJob']").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();

        await page.locator(".app-jenkins-logo").click();

        const jobLink = page.locator("#projectstatus .jenkins-table__link", { hasText: jenkinsData.itemName });
        await expect(jobLink).toBeVisible();
    });
}); 