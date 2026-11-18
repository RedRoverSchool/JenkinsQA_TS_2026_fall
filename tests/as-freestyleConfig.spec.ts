import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/as-data";

test.describe("US_02.003 | Configure SCM", () => {
    test("TC_02.003.01 | Verify SCM section is available", async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("input#name").fill(jenkinsData.freestyleProjectName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();

        await page.getByRole('link', { name: jenkinsData.freestyleProjectName }).click();
        await page.getByRole('link', { name: 'Configure' }).click();
        
        await expect(
            page.locator('.jenkins-section__title')
            .filter({ hasText: jenkinsData.SCMHeader })
        ).toBeVisible();
        await expect(
            page.getByText(jenkinsData.SCMDescription, { exact: true })
        ).toBeVisible();
        await expect(page.getByLabel('None', { exact: true })).toBeVisible();
        await expect(page.getByLabel('Git', { exact: true })).toBeVisible(); 
    });
});