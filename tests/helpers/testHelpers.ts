//  tests/helpers/testHelpers.ts
//  This file contains helper functions for test cases to reduce redundancy and improve readability across the test suite.

import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';
import { LoginPage } from '../pages/loginPage';
import { validCredentials, BASE_URL } from '../resources/globalVariables';

export async function addProductFromHomepage(homePage: HomePage): Promise<number> {
  const index = await homePage.getFirstAvailableProductIndex();
  expect(index).not.toBeNull();

  await test.step(`Add product to cart from homepage [index: ${index}]`, async () => {
    await homePage.addToCartByIndex(index!);
  });

  return index!;
}

export async function addProductFromProductPage(
  homePage: HomePage,
  productPage: ProductPage
): Promise<number> {
  const index = await homePage.getFirstAvailableProductIndex();
  expect(index).not.toBeNull();

  await test.step(`Navigate to product detail page [index: ${index}]`, async () => {
    await homePage.goToProductPageByIndex(index!);
  });

  await test.step('Click Add to Cart on product detail page', async () => {
    await productPage.addToCart();
  });

  return index!;
}

export async function removeProductFromProductPage(
  homePage: HomePage,
  productPage: ProductPage,
  index: number
): Promise<void> {
  await test.step(`Navigate to product detail page [index: ${index}]`, async () => {
    await homePage.goToProductPageByIndex(index);
  });

  await test.step('Click Remove on product detail page', async () => {
    await productPage.removeFromCart();
  });
}

export async function verifyCartBadge(homePage: HomePage, expectedCount: number): Promise<void> {
  await test.step(`Verify cart badge count is ${expectedCount}`, async () => {
    const count = await homePage.getCartBadgeCount();
    expect(count).toBe(expectedCount);
  });
}

export async function loginWithValidCredentials(loginPage: LoginPage): Promise<void> {
  await test.step('Log in with valid credentials', async () => {
    await loginPage.login(validCredentials.username, validCredentials.password);
  });
}

export async function verifyUserIsLoggedIn(loginPage: LoginPage): Promise<void> {
  await test.step('Verify user is on the homepage (Products page)', async () => {
    const title = await loginPage.getInventoryHeaderText();
    expect(title).toBe('Products');
  });
}

export async function logoutFromSite(loginPage: LoginPage): Promise<void> {
  await test.step('Log out via burger menu', async () => {
    await loginPage.logout();
  });
}

export async function runSortTest<T>(
  description: string,
  option: string,
  getActual: () => Promise<T[]>,
  getExpected: (arr: T[]) => T[],
  homePage: HomePage
): Promise<void> {
  await test.step(description, async () => {
    await homePage.sortProducts(option as 'az' | 'za' | 'lohi' | 'hilo');
    const actual = await getActual();
    const expected = getExpected(actual);
    expect(actual).toEqual(expected);
  });
}

export type SortScenario<T> = {
  description: string;
  option: string;
  getActual: () => Promise<T[]>;
  getExpected: (arr: T[]) => T[];
};

export async function performLogin(page: Page) {
  const loginPage = new LoginPage(page);
  await page.goto(BASE_URL);
  await loginPage.login(validCredentials.username, validCredentials.password);
}

export async function scrollToFooter(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}