import { test, expect, Page } from "@/base";

test.describe("US_01.001 | Create new item",()=>{
    test("TC_01.001.14 |Verify OK button is disabled for blank item name",async({page})=>{
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator(".hudson_model_FreeStyleProject").click();
        const buttonOk =  page.locator("#ok-button");
        await expect(buttonOk).toBeDisabled();
    });

    test("TC_01.001.15 |Verify validation message when item name contains special characters",async({page})=>{
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator('input#name').fill('@');
        const error = page.locator('.error');
        const errorMessage = "‘@’ is an unsafe character";
        await expect(error).toContainText(errorMessage);                
    });

});