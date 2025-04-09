// pages/cartPage.ts
// All cart page related functions are stored in this file

import { Page, expect } from '@playwright/test';
import { cartSelectors } from '../resources/cartVariables';

export class CartPage {
  constructor(private page: Page) {}

  async removeFirstItem(): Promise<void> {
    const removeButtons = await this.page.$$(cartSelectors.btnRemoveItemInCart);
    if (removeButtons.length > 0) {
      await removeButtons[0].click();
    }
  }

  async getCartItemCount(): Promise<number> {
    return await this.page.locator(cartSelectors.cartItem).count();
  }

  async verifyCartItemDetails(): Promise<void> {
    const items = await this.page.$$(cartSelectors.cartItem);
  
    for (const [index, item] of items.entries()) {
      const qty = await item.$eval(cartSelectors.txtCartItemQty, el => el.textContent?.trim());
      const name = await item.$eval(cartSelectors.txtCartItemName, el => el.textContent?.trim());
      const desc = await item.$eval(cartSelectors.txtCartItemDesc, el => el.textContent?.trim());
      const price = await item.$eval(cartSelectors.txtCartItemPrice, el => el.textContent?.trim());
  
      expect(qty, `Item #${index} quantity`).toBeTruthy();
      expect(parseInt(qty || '')).toBeGreaterThan(0);
  
      expect(name, `Item #${index} name`).toBeTruthy();
      expect(desc, `Item #${index} description`).toBeTruthy();
  
      expect(price, `Item #${index} price`).toMatch(/^\$\d+(\.\d{2})?$/);
    }
  }

  async clickCheckout() {
    await this.page.click(cartSelectors.btnCheckout);
  }
  
}
