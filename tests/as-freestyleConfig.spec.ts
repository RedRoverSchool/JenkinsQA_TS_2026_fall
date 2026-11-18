import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/as-data";

test.describe("US_02.003 | Configure SCM", () => {
    test("TC_02.003.01 | Verify SCM section is available", async ({ page }) => {
        const expectedLabels = {
            header: 'Source Code Management',
            description: 'Connect and manage your code repository to automatically pull the latest code for your builds.',
            none: 'None',
            git: 'Git',
        };
        
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("input#name").fill(jenkinsData.freestyleProjectName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();

        await page.getByRole('link', { name: jenkinsData.freestyleProjectName }).click();
        await page.getByRole('link', { name: 'Configure' }).click();

        const actualLabels = [
            await page.locator(".jenkins-section__title")
                .filter({ hasText: expectedLabels.header })
                .textContent(),
            await page.getByText(expectedLabels.description, { exact: true }).textContent(),
            await page.getByText(expectedLabels.none, { exact: true }).textContent(),
            await page.getByText(expectedLabels.git, { exact: true }).textContent(),
        ];

        expect(actualLabels.map(label => label?.trim())).toEqual(
            Object.values(expectedLabels)
        );
    });
});