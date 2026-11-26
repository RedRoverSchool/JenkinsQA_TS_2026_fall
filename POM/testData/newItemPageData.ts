import { faker } from "@faker-js/faker";
import { ItemType } from "@/POM/fixtures/itemCreationFixtures";

export const newItemPageData = {
	itemName: faker.word.noun(),
	itemTypes: [
		ItemType.FreestyleProject, 
		ItemType.Pipeline, 
		ItemType.MultiConfigurationProject, 
		ItemType.Folder, 
		ItemType.MultibranchPipeline, 
		ItemType.OrganizationFolder
	],
	dashboardItemsNames: new Map([		
		[ItemType.FreestyleProject, faker.word.noun()], 
		[ItemType.Pipeline, faker.word.noun()],
		[ItemType.MultiConfigurationProject, faker.word.noun()],
		[ItemType.Folder, faker.word.noun()],
		[ItemType.MultibranchPipeline, faker.word.noun()], 
		[ItemType.OrganizationFolder,  faker.word.noun()]
	]),
	unsafeCharacters : ['/', '!', '%', '$', '&', ';', ':', '@'],
};
