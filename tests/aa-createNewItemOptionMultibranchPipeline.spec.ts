import { test, expect, Page } from "@/base";

test.describe("US_01.005 | Create New Item Multibranch Pipeline", () => {
    test("TC_01.005.02 | Verify Multibranch Pipeline option is available in the item type list", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();

        await expect(
            page.locator(".jenkins-choice-list__item", { hasText: "Multibranch Pipeline" })
        ).toBeVisible();
    });
});