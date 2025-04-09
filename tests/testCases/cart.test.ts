// testCases/cart.test.ts
// All cart page related test cases are stored in this file

import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { navigateToSite } from '../pages/setup';
import { validCredentials } from '../resources/globalVariables';
import {
  addProductFromHomepage,
  addProductFromProductPage,
  removeProductFromProductPage,
  verifyCartBadge
} from '../helpers/testHelpers';

test.describe('Cart - Add To Cart Scenarios', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    productPage = new ProductPage(page);

    await navigateToSite(page);
    await loginPage.login(validCredentials.username, validCredentials.password);
  });

  test('Verify adding product to cart via Homepage', async () => {
    const index = await addProductFromHomepage(homePage);
    await verifyCartBadge(homePage, 1);
  });

  test('Verify adding product to cart via Product Page', async () => {
    const index = await addProductFromProductPage(homePage, productPage);
    await verifyCartBadge(homePage, 1);
  });
});

test.describe('Cart - Remove from Cart Scenarios', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await navigateToSite(page);
    await loginPage.login(validCredentials.username, validCredentials.password);
  });

  test('Remove product from cart via Homepage', async () => {
    const index = await addProductFromHomepage(homePage);

    await test.step('Remove product from homepage by index', async () => {
      await homePage.removeFromCartByIndex(index);
    });

    await verifyCartBadge(homePage, 0);
  });

  test('Remove product from cart via Product Page', async () => {
    const index = await addProductFromHomepage(homePage);
    await removeProductFromProductPage(homePage, productPage, index);
    await verifyCartBadge(homePage, 0);
  });

  test('Remove product from cart via Cart Page', async () => {
    const index = await addProductFromHomepage(homePage);

    await test.step('Go to cart page using homePage.goToCart()', async () => {
      await homePage.goToCart();
    });

    await test.step('Click remove from cart page using CartPage', async () => {
      await cartPage.removeFirstItem();
    });

    await verifyCartBadge(homePage, 0);
  });

  test('Verify cart item details (qty, title, description, price)', async () => {
    const index = await addProductFromHomepage(homePage);
    await homePage.goToCart();
  
    await test.step('Verify cart item has complete product details', async () => {
      await cartPage.verifyCartItemDetails();
    });
  });  
});
