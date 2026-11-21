import { test, expect, Page } from "@/base";
import { usedData } from "./testData/ks-data";


test.describe("New Item | Duplicate an existing item", () => {
    test("TC_01.003.07 | Verify duplicate configuration item created for existing source item", async ({ page }: { page: Page}) => {
        await page.locator("a[href='newJob']").click();
        await page.locator(".jenkins-input#name").fill(usedData.itemNameThree);

        await page.locator(".jenkins-choice-list__item__label").getByText("Pipeline").first().click();
        await page.locator("#ok-button").click();
        await page.locator("textarea[name='description']").fill(usedData.jobDescription);
    
        await page.locator("button[name='Submit']").click();
        await page.locator(".app-jenkins-logo").click();


        await page.locator(".task-link-wrapper").getByText("New Item").click();
        await page.locator(".jenkins-input#name").fill(usedData.itemNameFour);
        await page.locator(".jenkins-choice-list__item__label").filter({ hasText: "Duplicate an existing item" }).click();
        await page.locator(".auto-complete").fill(usedData.typeAutocomplete);
        await page.locator(".jenkins-dropdown__item").click();
        await page.locator("#ok-button").click();
        await page.locator("button[name='Submit']").click();

        const duplicateDescription = (page.locator("#description-content"));

        expect(duplicateDescription).toHaveText(`${usedData.jobDescription}`);


    });
})