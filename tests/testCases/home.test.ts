// testCases/home.test.ts
// All home page related test cases are stored in this file

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { navigateToSite } from '../pages/setup';
import { validCredentials } from '../resources/globalVariables';
import { homePageSelectors } from '../resources/homeVariables';
import {
  loginWithValidCredentials,
  verifyUserIsLoggedIn,
  runSortTest,
  SortScenario
} from '../helpers/testHelpers';

test.describe('Home Page Test Cases', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await navigateToSite(page);
    await loginWithValidCredentials(loginPage);
    await verifyUserIsLoggedIn(loginPage);
    await page.waitForSelector(homePageSelectors.selectSort);
  });

  const nameSortScenarios: SortScenario<string>[] = [
    {
      description: 'Verify products are sorted from A-Z',
      option: 'az',
      getActual: () => homePage.getProductNames(),
      getExpected: (arr: string[]) => [...arr].sort((a, b) => a.localeCompare(b)),
    },
    {
      description: 'Verify products are sorted from Z-A',
      option: 'za',
      getActual: () => homePage.getProductNames(),
      getExpected: (arr: string[]) => [...arr].sort((a, b) => b.localeCompare(a)),
    },
  ];

  const priceSortScenarios: SortScenario<number>[] = [
    {
      description: 'Verify products are sorted from price High-Low',
      option: 'lohi',
      getActual: () => homePage.getProductPrices(),
      getExpected: (arr: number[]) => [...arr].sort((a, b) => a - b),
    },
    {
      description: 'Verify products are sorted from price Low-High',
      option: 'hilo',
      getActual: () => homePage.getProductPrices(),
      getExpected: (arr: number[]) => [...arr].sort((a, b) => b - a),
    },
  ];

  test('Product Sorting Scenarios', async () => {
    for (const { description, option, getActual, getExpected } of nameSortScenarios) {
      await runSortTest<string>(description, option, getActual, getExpected, homePage);
    }

    for (const { description, option, getActual, getExpected } of priceSortScenarios) {
      await runSortTest<number>(description, option, getActual, getExpected, homePage);
    }
  });

  test('Product Card Verifications', async () => {
    await test.step('Verify all product cards contain valid image, description, price, and add to cart button should be present', async () => {
      await homePage.verifyAllProductDetails();
    });
  });
});
