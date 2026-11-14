import { test, expect, Page } from "@/base";

test.describe("US_01.001 | Create new item",()=>{
    test("TC_01.001.14 |Verify OK button is disabled for blank item name",async({page})=>{
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator(".hudson_model_FreeStyleProject").click();
        const buttonOk =  page.locator("#ok-button");
        await expect(buttonOk).toBeDisabled();
    });

});