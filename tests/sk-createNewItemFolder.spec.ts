import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/sk-data";

test.describe("US_01.002 | New Item | Folder",()=>{

    test.skip("TC_01.002.05  Verify adding and saving a folder description",async({page})=>{
        await page.getByRole('link', { name: 'New Item' }).click();
        await page.locator('input#name').fill(jenkinsData.itemName);
        await page.locator(".com_cloudbees_hudson_plugins_folder_Folder.jenkins-choice-list__item").click();
        await page.locator("#ok-button").click();        

        await page.locator('[name="_.description"]').fill('Privet');
        await page.getByRole('button',{name:'Save'}).click();

        const message =page.locator("#view-message");

        await expect(message).toHaveText("Privet");

    });
}); 
