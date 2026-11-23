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

    test('TC_02.003.02 | Verify available SCM types', async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator('input#name').fill(jenkinsData.freestyleProjectName);
        await page.locator('.hudson_model_FreeStyleProject').click();
        await page.locator('#ok-button').click();

        await page.getByRole('link', { name: jenkinsData.freestyleProjectName }).click();
        await page.getByRole('link', { name: 'Configure' }).click();

        const section = page.locator('section.jenkins-section').first();
        const noneOption = section.getByLabel('None', { exact: true });
        const gitOption = section.getByLabel('Git', { exact: true });

        const noneLabel = section.locator('label.jenkins-radio__label')
            .filter({ hasText: /^None$/ });

        const gitLabel = section.locator('label.jenkins-radio__label')
            .filter({ hasText: /^Git$/ });

        await expect(noneOption).toBeVisible();
        await expect(gitOption).toBeVisible();

        await gitLabel.click();
        await expect(gitOption).toBeChecked();

        await noneLabel.click();
        await expect(noneOption).toBeChecked();
        await expect(gitOption).not.toBeChecked();
    });
                                      
    test('TC_02.003.03 | Verify Git configuration fields are displayed', async ({ page }) => {
        await page.locator("#side-panel a[href$='newJob']").click();
        await page.locator("#name").fill(jenkinsData.freestyleProjectName);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();
        await page.getByRole('link', { name: jenkinsData.freestyleProjectName }).click();
        await page.getByRole('link', { name: 'Configure' }).click();

        const section = page.locator("section.jenkins-section").first();
        await section.locator("label.jenkins-radio__label").filter({ hasText: /^Git$/ }).click();
        const repositoryUrl = section.locator(".jenkins-form-item").filter({ hasText: /^Repository URL/ }).locator("input");
        const credentials = section.locator("select[name='_.credentialsId']");
        const branchSpecifier = section.locator(".jenkins-form-item").filter({ hasText: /^Branch Specifier/ }).locator("input");

        const expectedFields = {
            repositoryUrl: { visible: true, enabled: true },
            credentials: { visible: true, enabled: true },
            branchSpecifier: { visible: true, enabled: true },
        };

        const actualFields = async () => ({
            repositoryUrl: {
                visible: await repositoryUrl.isVisible(),
                enabled: await repositoryUrl.isEnabled(),
            },
            credentials: {
                visible: await credentials.isVisible(),
                enabled: await credentials.isEnabled(),
            },
            branchSpecifier: {
                visible: await branchSpecifier.isVisible(),
                enabled: await branchSpecifier.isEnabled(),
            },
        });

        await expect.poll(actualFields).toEqual(expectedFields);
    });
});