import { test as base, NavigationFixtures, App } from "./navigationFixtures"
import { ConfigurePage } from "@/POM/pageObjects/pages/ConfigurePage/ConfigurePage";
import { ItemType, newItemPageData } from "../testData/newItemPageData";


export interface ItemCreationFixtures {

    createNewItem: ( itemType: ItemType, itemName?: string, submitByKeyboard?: boolean) => Promise<ConfigurePage>;

};

export const test = base.extend<ItemCreationFixtures>({

    createNewItem: async ({ app }: { app: App } & NavigationFixtures & ItemCreationFixtures, use) => {

        const createWithName: ItemCreationFixtures["createNewItem"] = async (
                    itemType: ItemType,
                    itemName: string = newItemPageData.timestampItemName(), 
                    submitByKeyboard = false) => 
        {
            await app.homePage.clickNewItemLink();
            await app.newItemPage.fillItemNameField(itemName);
            await app.newItemPage.clickItemType(itemType);
            
            if (submitByKeyboard) {
                await app.newItemPage.submitFormByKeyboard();   
            } else {
                await app.newItemPage.clickOkButton(); 
            }
        
            switch (itemType) {
                case ItemType.FreestyleProject:
                    return app.configureFreestylePage;
                case ItemType.Pipeline:
                    return app.configurePipelinePage;
                case ItemType.MultiConfigurationProject:
                    return app.configureMultiConfigurationPage; 
                case ItemType.Folder:
                    return app.configureFolderPage;
                case ItemType.MultibranchPipeline:
                    return app.configureMultibranchPipelinePage;
                case ItemType.OrganizationFolder:
                    return app.configureOrganizationFolderPage;
                default:
                    throw new Error(`Unhandled item type: ${itemType}`);
            }
        };

        await use(createWithName);
    },

});

export const expect = base.expect;
export type { App };
