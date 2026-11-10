import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/yp-data";
import { Locator } from "@playwright/test";

test.describe("US_01.001 | Create new item", () => {
    test("TS_01.001.05 | Verify item name validation: unsupported special characters", async ({ page }) => {
        await page.locator("#side-panel a[it='hudson.model.Hudson@2400d26f']").click();
        await page.locator("[type='text']").fill(jenkinsData.itemIncorrectName);
        await page.locator(".jenkins-choice-list__item__label").first().click();
        const errorMessage: Locator = page.getByText("'/' is an unsafe character");

        await expect(page.locator(".validation-error-area--visible .error")).toHaveText("‘/’ is an unsafe character");
        await expect(page.locator("#ok-button")).toBeDisabled();
    });
});
