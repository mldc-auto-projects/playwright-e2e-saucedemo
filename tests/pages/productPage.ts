// pages/productPage.ts
// All product page related functions are stored in this file

import { Page } from '@playwright/test';
import { globalSelectors } from '../resources/globalVariables';

export class ProductPage {
  constructor(private page: Page) {}

  async addToCart(): Promise<void> {
    const addBtn = this.page.locator(globalSelectors.btnAddToCart);
    await addBtn.waitFor({ state: 'visible' });
    await addBtn.click();
  }

  async removeFromCart(): Promise<void> {
    const removeBtn = this.page.locator(globalSelectors.btnRemoveFromCart);
    await removeBtn.waitFor({ state: 'visible' });
    await removeBtn.click();
  }

  async clickContinueShopping(): Promise<void> {
    const continueBtn = this.page.locator(globalSelectors.btnContinueShopping);
    await continueBtn.waitFor({ state: 'visible' });
    await continueBtn.click();
  }
}
