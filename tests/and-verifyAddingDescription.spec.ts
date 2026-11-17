import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/and-data";

test.describe("US_02.002 | Project Description", () => {
    test("TC_02.002.01 | Verify that description can be added to Freestyle Project", async ({ page }) => {
        await page.locator(".task-link-wrapper").filter({ hasText: "New Item" }).click();
        await page.locator("#name").fill(jenkinsData.freesProjectName);
        await page.locator(".jenkins-choice-list__item__label").getByText('Freestyle project', { exact: true }).click();
        await page.getByRole("button", {name: "OK"}).click();
        await page.locator("textarea[name='description']").fill(jenkinsData.projectDescription);
        await page.getByRole("button", {name: "Save"}).click();
        expect(page.locator("#description-content")).toHaveText(jenkinsData.projectDescription);
    });
})