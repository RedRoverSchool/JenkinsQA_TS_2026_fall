import { BasePage } from "../pageObjects/pages/@components";
import { test as base, App } from "./baseFixture"

export interface NavigationFixtures {
    navigateToHomePageFrom: (page: BasePage) => Promise<void>;
}

export const test = base.extend<NavigationFixtures>({

    navigateToHomePageFrom: async ({ app }: { app: App }, use) => {

        const navigateToHome: NavigationFixtures["navigateToHomePageFrom"] = async ( page: BasePage ) => {
            await page.header.clickLogo();
        };

        await use(navigateToHome);
    },

});


export const expect = base.expect;
export type { App };
