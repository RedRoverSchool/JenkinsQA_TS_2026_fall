import {
	test as base,
	Page,
	Browser,
	APIRequestContext,
	TestInfo,
} from "@playwright/test";
import { cleanData } from "@/helpers/cleanData";

type CustomFixtures = {
	isSerial: boolean; // Опция для переключения режима
	page: Page;
};

let sharedPage: Page | undefined;
let lastSuiteTitle: string | undefined;

export const test = base.extend<CustomFixtures>({
	// По умолчанию все тесты считаются обычными (независимыми)
	isSerial: [false, { option: true }],

	page: async (
		{
			browser,
			request,
			isSerial,
		}: { browser: Browser; request: APIRequestContext; isSerial: boolean },
		use: (r: Page) => Promise<void>,
		testInfo: TestInfo
	) => {
		// 1. ВЕТКА ДЛЯ SERIAL-ТЕСТОВ (очистка 1 раз на серию)
		if (isSerial) {
			const currentSuiteTitle = testInfo.titlePath.slice(0, -1).join(" > ");

			if (lastSuiteTitle !== currentSuiteTitle) {
				lastSuiteTitle = currentSuiteTitle;

				if (sharedPage) {
					await sharedPage.context().close();
				}

				const context = await browser.newContext({
					baseURL: testInfo.project.use.baseURL,
				});
				sharedPage = await context.newPage();

				await cleanData(request);
				await sharedPage.goto("/");
			}

			await use(sharedPage!);
			return;
		}

		// 2. ВЕТКА ДЛЯ ОБЫЧНЫХ ТЕСТОВ (очистка перед каждым тестом)
		// Закрываем сериальную страницу, если до этого шла серия
		if (sharedPage) {
			await sharedPage.context().close();
			sharedPage = undefined;
			lastSuiteTitle = undefined;
		}

		const context = await browser.newContext({
			baseURL: testInfo.project.use.baseURL,
		});
		const page = await context.newPage();

		await cleanData(request);
		await page.goto("/");

		await use(page);

		await context.close();
	},
});

export const expect = base.expect;
export type { Page };
