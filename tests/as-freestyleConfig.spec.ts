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

        const actualLabels = {
            header: (await section.locator('.jenkins-section__title').textContent())?.trim(),
            description: await section.locator('.jenkins-section__description').innerText(),
            none: await section.locator('label').filter({ hasText: 'None' }).innerText(),
            git: await section.locator('label').filter({ hasText: 'Git' }).innerText(),
        };

        expect(actualLabels).toEqual(expectedLabels);
    });
});