import { test as base, Page } from "@/base";

export interface NavigationFixtures {
    naviateToHomePage: () => Promise<void>;
    navigateToItem: (itemName: string) => Promise<void>;
}

export const test = base.extend<NavigationFixtures>({
    naviateToHomePage: async ({ page }: { page: Page }, use) => {

        const navigateToHome: NavigationFixtures["naviateToHomePage"] = async () => {
            await page.goto("/");
        };

        await use(navigateToHome);
    },

    navigateToItem: async ({ page }: { page: Page }, use) => {
        const navigateToItemWithName: NavigationFixtures["navigateToItem"] = async (itemName: string) => {

            const itemLinkLocator = page.locator(`#job_${itemName.replaceAll(" ", "%20")} .jenkins-table__link`);
            await itemLinkLocator.click();
        };

        await use(navigateToItemWithName);
    }

});


export const expect = base.expect;
export type { Page };
