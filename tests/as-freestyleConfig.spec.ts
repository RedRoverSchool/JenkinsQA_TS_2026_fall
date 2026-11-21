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

        const section = page.locator('section.jenkins-section').first();

        const header = section.locator('.jenkins-section__title');
        const description = section.locator('.jenkins-section__description');
        const none = section.locator('label').filter({ hasText: 'None' });
        const git = section.locator('label').filter({ hasText: 'Git' });

        for (const [locator, text] of [
            [header, expectedLabels.header],
            [description, expectedLabels.description],
            [none, expectedLabels.none],
            [git, expectedLabels.git],
        ] as const) {
            await expect(locator).toBeVisible();
            await expect(locator).toHaveText(text, { useInnerText: true });
        }
    });
});