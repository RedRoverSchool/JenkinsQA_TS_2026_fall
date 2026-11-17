import { test, expect, Page } from "@/base";

test.describe("US_01.005 | Create New Item Multibranch Pipeline", () => {
    test("TC_01.005.01 | Verify 'New Item' link redirects to item creation page", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();

        await expect(page).toHaveURL(/newJob$/);
    });
});