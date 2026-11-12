import { test, expect, Page} from "@/base";
import { usedData } from "./testData/ks-data";

test.describe("US_01.001 | Creatе a new item'", () => {
    
    test('TC_01.001 | Verify new item creation', async ({ page }) => {
        await page.locator('.task-link-wrapper a[href$="/newJob"]').click();
        await page.locator('.jenkins-input#name').fill(usedData.itemName);
        await page.locator('.com_cloudbees_hudson_plugins_folder_Folder').click();
        await page.locator('#ok-button').click();

        await page.locator('.app-jenkins-logo').click();

        expect(page.locator('.jenkins-jobs-list__item__label')).toHaveText(usedData.itemName);

    });
});