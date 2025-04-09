// pages/checkoutPage.ts

import { Page, expect } from '@playwright/test';
import { checkoutSelectors, checkoutTestData } from '../resources/checkoutVariables';

export class CheckoutPage {
  constructor(public page: Page) {}

  // Checkout Form Actions
  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(checkoutSelectors.inputFirstName, firstName);
    await this.page.fill(checkoutSelectors.inputLastName, lastName);
    await this.page.fill(checkoutSelectors.inputPostalCode, postalCode);
  }

  async clickContinue() {
    await this.page.click(checkoutSelectors.btnContinue);
  }

  async getErrorMessage(): Promise<string> {
    const errorLocator = this.page.locator(checkoutSelectors.lblErrorMsg);
    await errorLocator.waitFor({ state: 'visible' });
    return await errorLocator.innerText();
  }

  // Overview Page Actions
  async getOverviewProductDetails(): Promise<{ qty: string; name: string; desc: string; price: string }[]> {
    const itemLocator = this.page.locator(checkoutSelectors.cartItems);
    const itemCount = await itemLocator.count();

    const productDetails: { qty: string; name: string; desc: string; price: string }[] = [];

    for (let i = 0; i < itemCount; i++) {
      const item = itemLocator.nth(i);

      const qty = await item.locator(checkoutSelectors.itemQty).innerText();
      const name = await item.locator(checkoutSelectors.itemName).innerText();
      const desc = await item.locator(checkoutSelectors.itemDesc).innerText();
      const price = await item.locator(checkoutSelectors.itemPrice).innerText();

      productDetails.push({ qty, name, desc, price });
    }

    return productDetails;
  }

  async getPaymentInfo(): Promise<string> {
    return this.page.locator(checkoutSelectors.paymentInfo).innerText();
  }

  async getShippingInfo(): Promise<string> {
    return this.page.locator(checkoutSelectors.shippingInfo).innerText();
  }

  async getPriceSummary(): Promise<{ subtotal: string; tax: string; total: string }> {
    return {
      subtotal: await this.page.locator(checkoutSelectors.subtotal).innerText(),
      tax: await this.page.locator(checkoutSelectors.tax).innerText(),
      total: await this.page.locator(checkoutSelectors.total).innerText(),
    };
  }

  // Checkout Complete Page Actions
  async completeCheckout() {
    await this.page.click(checkoutSelectors.btnFinish);
  }

  async verifySuccessfulCheckoutMessage() {
    await expect(this.page.locator(checkoutSelectors.msgSuccessfulCheckout)).toHaveText(
      checkoutTestData.successfulCheckoutMessage
    );
  }

  async navigateBackHome() {
    await this.page.click(checkoutSelectors.btnBackHome);
  }

  async verifyRedirectedToHomePage() {
    await expect(this.page.locator(checkoutSelectors.homePageTitle)).toHaveText(
      checkoutTestData.homePageTitleText
    );
  }
}
