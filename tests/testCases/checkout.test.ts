// testCases/checkout.test.ts
// All checkout-related test cases are stored in this file

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { navigateToSite } from '../pages/setup';
import { validCredentials } from '../resources/globalVariables';
import { checkoutTestData, errorMessages, checkoutSelectors } from '../resources/checkoutVariables';

test.describe('Checkout Page Test Cases', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await navigateToSite(page);
    await loginPage.login(validCredentials.username, validCredentials.password);

    await homePage.addToCartByIndex(0);
    await homePage.goToCart();
    await cartPage.clickCheckout();
  });

  test('Checkout Form - Verify Empty Form Validation', async () => {
    await test.step('Click continue without filling the form', async () => {
      await checkoutPage.clickContinue();
    });

    await test.step('Verify error message for missing first name', async () => {
      const error = await checkoutPage.getErrorMessage();
      expect(error).toBe(errorMessages.firstNameRequired);
    });
  });

  test('Checkout Form - Verify Filled Form Submission', async () => {
    await test.step('Fill checkout form with valid data', async () => {
      await checkoutPage.fillCheckoutForm(
        checkoutTestData.firstName,
        checkoutTestData.lastName,
        checkoutTestData.postalCode
      );
    });

    await test.step('Click continue and verify redirection to overview page', async () => {
      await checkoutPage.clickContinue();
      await expect(checkoutPage.page.locator(checkoutSelectors.lblOverviewTitle)).toHaveText('Checkout: Overview');
    });
  });

  test('Checkout Overview - Verify Product, Payment, and Price Details', async () => {
    await checkoutPage.fillCheckoutForm(
      checkoutTestData.firstName,
      checkoutTestData.lastName,
      checkoutTestData.postalCode
    );
    await checkoutPage.clickContinue();

    await test.step('Verify product details displayed correctly', async () => {
      const products = await checkoutPage.getOverviewProductDetails();
      for (const product of products) {
        expect(product.qty).toBe('1');
        expect(product.name).not.toBe('');
        expect(product.desc).not.toBe('');
        expect(product.price).toMatch(/\$\d+(\.\d{2})?/);
      }
    });

    await test.step('Verify payment and shipping information', async () => {
      const payment = await checkoutPage.getPaymentInfo();
      const shipping = await checkoutPage.getShippingInfo();
      expect(payment).toBe(checkoutTestData.paymentInfo);
      expect(shipping).toBe(checkoutTestData.shippingInfo);
    });

    await test.step('Verify subtotal, tax, and total amounts', async () => {
      const { subtotal, tax, total } = await checkoutPage.getPriceSummary();
      expect(subtotal).toMatch(/Item total: \$\d+(\.\d{2})?/);
      expect(tax).toMatch(/Tax: \$\d+(\.\d{2})?/);
      expect(total).toMatch(/Total: \$\d+(\.\d{2})?/);
    });
  });

  test('Checkout Complete - Verify Success Message and Home Redirection', async () => {
    await checkoutPage.fillCheckoutForm(
      checkoutTestData.firstName,
      checkoutTestData.lastName,
      checkoutTestData.postalCode
    );
    await checkoutPage.clickContinue();

    await test.step('Complete checkout and verify success message', async () => {
      await checkoutPage.completeCheckout();
      await checkoutPage.verifySuccessfulCheckoutMessage();
    });

    await test.step('Navigate back home and verify redirection', async () => {
      await checkoutPage.navigateBackHome();
      await checkoutPage.verifyRedirectedToHomePage();
    });
  });
});
