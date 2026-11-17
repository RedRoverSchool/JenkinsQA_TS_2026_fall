import { test as base, Page } from "@/base";
import { jenkinsData } from "../testData/yl-data";

export interface NavigationFixtures {
    naviateToHomePage: () => Promise<void>;
    navigateToItem: (itemName: string) => Promise<void>;
}

export const test = base.extend<NavigationFixtures>({
    naviateToHomePage: async ({ page }, use) => {
        const navigateToHome: NavigationFixtures['naviateToHomePage'] = async () => {
            await page.goto("/");
        };
        await use(navigateToHome);
    },

    navigateToItem: async ({ page }: {page: Page}, use) => {
        const navigateToItemWithName: NavigationFixtures['navigateToItem'] = async (itemName: string) => {
            const itemLinkLocator = page.locator(`#job_${itemName} .jenkins-table__link`);
            await itemLinkLocator.click();
        };
        await use(navigateToItemWithName);
    }

});


export const expect = base.expect;
export type { Page };
