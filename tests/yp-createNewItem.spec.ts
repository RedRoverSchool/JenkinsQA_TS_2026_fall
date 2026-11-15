import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/yp-data";


test.describe("US_01.001 | Create new item", () => {
    test("TS_01.001.06 | Verify item name validation: empty name field", async ({ page }) => {
        await page.locator("a[href$='/newJob']").click();
        await page.locator("input#name").fill(" ");
        await page.locator(".jenkins-choice-list__item__label").filter({ hasText: 'Freestyle project' }).click();

        await expect(page.locator(".validation-error-area--visible .error")).toHaveText("This field cannot be empty, please enter a valid name");
    });

});