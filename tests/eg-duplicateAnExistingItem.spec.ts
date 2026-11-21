import { Page } from "@/base";
import { test, expect } from "./fixtures/eg-itemExistsFixtures";
import {jenkinsData} from "./testData/eg-data";


test.describe("US_01.003.08 | Duplicate an existing item", () => {
  
    test("TC_01.003.08 | Attempt to duplicate a non-existent job", async ({ page, createSourceJob }) => {

        await page.locator("a[href='/view/all/newJob']").click();
        await page.locator(".add-item-name .jenkins-input").fill(jenkinsData.itemName2);
        await page.locator("#duplicate-job").click();
        await page.locator(".auto-complete").fill(jenkinsData.itemName3);
        await page.locator(".jenkins-button--primary").click();

        const erMessage = page.getByText(jenkinsData.er);
        await expect(erMessage).toBeVisible();
    });
});
