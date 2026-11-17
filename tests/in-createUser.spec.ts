import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/bs-data";

test.describe("US_10.017 | Create User", () => {
    test("TC_10.017.01 | Verify user creation", async ({ page }) => {
        await page.locator("#root-action-ManageJenkinsAction").click();
        await page.locator("a[href='securityRealm/']").click();
        await page.getByText("Create User").click();
        await page.locator("#username").fill("jsmith");
        await page.locator("div.jenkins-form-item:nth-child(2) > div:nth-child(2) > input:nth-child(1)").fill("jsmithPassw0rd1@");
        await page.locator("div.jenkins-form-item:nth-child(3) > div:nth-child(2) > input:nth-child(1)").fill("jsmithPassw0rd1@");
        await page.locator("div.jenkins-form-item:nth-child(4) > div:nth-child(2) > input:nth-child(1)").fill("John Smith");
        await page.locator("div.jenkins-form-item:nth-child(5) > div:nth-child(2) > input:nth-child(1)").fill("jsmith@jsm.com");
        await page.getByRole('button', { name: 'Create', exact: true }).click();

        const username = page.locator("a[href='user/jsmith/']");
        
        expect(username).toHaveText("jsmith");
    });
}); 