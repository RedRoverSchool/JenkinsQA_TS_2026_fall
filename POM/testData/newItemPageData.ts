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
};
