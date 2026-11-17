import { test, expect, Page } from "@/base";
import { jenkinsData } from "./testData/bs-data";

test.describe("testing conflicts suite", () => {
    test("testing conflicts", async ({ page }: { page: Page }) => {
        const footer = page.locator("footer .jenkins_ver");

        await expect(footer).toHaveText(jenkinsData.jenkinsVersion);
    });
}); 
