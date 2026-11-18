import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/sk-data";
test.describe("US_01.001 | Create new item",()=>{
    test("TC_01.001.14 |Verify OK button is disabled for blank item name",async({page})=>{
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator(".hudson_model_FreeStyleProject").click();
        const buttonOk =  page.locator("#ok-button");
        await expect(buttonOk).toBeDisabled();
    });

    test("TC_01.001.15 |Verify validation message when item name contains special characters",async({page})=>{
        const unsafeCharacters = ['/', '!', '%', '$', '&', ';', ':', '@'];
        await page.getByRole('link', { name: 'New Item' }).click();

        for (const symbol of unsafeCharacters) {
        await page.locator('input#name').clear();
        await page.locator('input#name').fill(symbol);
        const error = page.locator('.error');
        
        await expect(error).toContainText('is an unsafe character');
        }                
    });

    test("TC_01.001.16 |  Verify warning message when item name already exists",async({page}: { page: Page})=>{
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator('input#name').fill(jenkinsData.itemName);
        await page.locator(".org_jenkinsci_plugins_workflow_job_WorkflowJob ").click();
        const buttonOk =  page.locator("#ok-button");
        await buttonOk.click();

        await page.locator(".app-jenkins-logo").click();

        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator('input#name').fill(jenkinsData.itemName);
        const error = page.locator('.error');
        
        await expect(error).toContainText('A job already exists with the name');
        
    }); 

    test("TC_01.001.26 | Verify all item types are displayed on New Item page",async({page})=>{
        await page.getByRole("link", { name: "New Item" }).click();
        for (const itemType of jenkinsData.itemTypes) {
            await expect(
                page.locator(`.jenkins-choice-list__item__label:text-is("${itemType}")`)
            ).toBeVisible();
        }
        
    });
    
    test("TC_01.001.27 | Verify all item types are displayed on New Item page",async({page})=>{
        await page.getByRole("link", { name: "New Item" }).click();

        const actualTypes = await page.locator('.jenkins-choice-list__item__label').allInnerTexts();        
        expect(actualTypes).toEqual(jenkinsData.itemTypes);      
                
    }); 

});