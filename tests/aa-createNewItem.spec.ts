import { test, expect, Page } from "@/base";

test.describe("US_01.001 | Create new item", () => {
    test("TC_01.001.06 | Verify item name validation: empty name", async ({ page }: { page: Page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator(".hudson_model_FreeStyleProject").click();

        const okButton = page.locator("#ok-button");

        await expect(okButton).toBeDisabled();
    });
});
