import { test as base, Page } from "./nk-baseFixtures"

export interface NavigationFixtures {
    naviateToHomePage: () => Promise<void>;
    navigateToItem: (itemName: string) => Promise<void>;
    navigateToParentFolder: () => Promise<void>;
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
    },

    navigateToParentFolder: async ({ page }: { page: Page }, use) => {
        const navigateToParentFolder: NavigationFixtures["navigateToParentFolder"] = async () => {
            const currentItemPage = page.locator("#breadcrumbs li span");
            await currentItemPage.first().waitFor({ state: "visible" });
            const linkLevelsLocator = page.locator('li[data-has-menu="true"]');
            const levels=(await linkLevelsLocator.count())
            if ( levels > 1) {
                await linkLevelsLocator.nth(-2).locator("a").click();
            } else {

                await page.locator(".app-jenkins-logo").click();
            }

        };  

        await use(navigateToParentFolder);
    },
    
});


export const expect = base.expect;
export type { Page };
