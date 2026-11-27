
import { test, expect, Page } from "@/base";
import { Locator } from "@playwright/test";

test.describe("US_01.001 | Create new item", () => {
    test("TS_01.001.06 | Verify item name validation: empty name field", async ({ page }) => {
        await page.locator("#side-panel a[it='hudson.model.Hudson@2400d26f']").click();
        await page.locator("[type='text']").fill(" ");
        await page.locator(".jenkins-choice-list__item__label").first().click();

        await expect(page.locator(".validation-error-area--visible .error")).toHaveText("This field cannot be empty, please enter a valid name");
        await expect(page.locator("#ok-button")).toBeDisabled();
    });

});