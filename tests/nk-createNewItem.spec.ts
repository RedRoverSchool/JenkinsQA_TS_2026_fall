import { test, expect } from "@/base";

test.describe("US_01.001 | Create new item", () => {
    test("TC_01.001.03 | Verify item creation", async ({ page }) => {

        const itemsLocator = page.locator("#projectstatus .jenkins-table__link");
        const countBeforeItems = await itemsLocator.count();
        const itemName = `item-${Date.now()}`;

        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(itemName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.press("#createItem","Enter");

        await page.locator(".app-jenkins-logo").click();

        await expect(itemsLocator).toHaveCount(countBeforeItems + 1);
    });
});