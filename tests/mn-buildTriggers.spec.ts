import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/mn-data";

test.describe("US_02.004 | Build Triggers", () => {
    test("TC_02.004.01 | Verify Authentication Token field presence", async ({ page }) => {
        await page.locator("a[href='/view/all/newJob']").click();
        await page.locator("#name").fill(jenkinsData.itemName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();

        await page.locator("label", {hasText: "Trigger builds remotely"}).click();

        await expect(page.locator("input[name='authToken']")).toBeVisible();
    });
});