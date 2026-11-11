import { test, expect, Page } from "@/base";

test.describe("US_11.002 | Create a Job", () => {
    test("TC_11.002.01 | Verify item creation", async ({ page }
        : {page: Page}
    ) => {

        const itemsLocator = page.locator("#projectstatus .jenkins-table__link");
        const itemName = `item-${Date.now()}`;

        await page.locator("#main-panel a[href$='newJob']").click();
        await page.locator("#name").fill(itemName);
        await page.locator(".hudson_matrix_MatrixProject").click();
        await page.press("#createItem","Enter");

        await page.locator(".app-jenkins-logo").click();

        await expect(itemsLocator).toHaveCount(1);
    });
});