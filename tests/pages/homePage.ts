// pages/homePage.ts
// All home page related functions are stored in this file

import { Page, expect } from '@playwright/test';
import { homePageSelectors } from '../resources/homeVariables';
import { globalSelectors } from '../resources/globalVariables';
import { cartSelectors } from '../resources/cartVariables';

export class HomePage {
  constructor(private page: Page) {}

  async sortProducts(optionValue: string): Promise<void> {
    await this.page.selectOption(homePageSelectors.selectSort, optionValue);
  }  

  async getProductNames(): Promise<string[]> {
    return await this.page.$$eval(homePageSelectors.txtProductNames, elements =>
      elements.map(el => el.textContent?.trim() || '')
    );
  }

  async getProductPrices(): Promise<number[]> {
    return await this.page.$$eval(homePageSelectors.txtProductPrices, elements =>
      elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
    );
  }

  async verifyAllProductDetails(): Promise<void> {
    const productCards = await this.page.$$(homePageSelectors.productCard);
  
    for (let i = 0; i < productCards.length; i++) {
      const card = productCards[i];
  
      // Product image verification -- check for broken image or missing image
      const img = await card.$(homePageSelectors.imgProduct);
      expect(img).not.toBeNull();
      const isImageVisible = await img?.isVisible();
      expect(isImageVisible).toBeTruthy();
  
      const imageSrc = await img?.getAttribute('src');
      expect(imageSrc).toBeTruthy();
  
      // Product Description
      const desc = await card.$(homePageSelectors.txtDescription);
      expect(desc).not.toBeNull();
      const descriptionText = await desc?.textContent();
      expect(descriptionText?.trim().length).toBeGreaterThan(0);
  
      // Product Price
      const price = await card.$(homePageSelectors.txtProductPrices);
      expect(price).not.toBeNull();
      const priceText = await price?.textContent();
      expect(priceText?.trim().length).toBeGreaterThan(0);
  
      // Add to cart button
      const button = await card.$(homePageSelectors.btnAddToCart);
      expect(button).not.toBeNull();
      const isButtonVisible = await button?.isVisible();
      expect(isButtonVisible).toBeTruthy();
    }
  }

  async goToCart(): Promise<void> {
    await this.page.click(globalSelectors.btnCartIcon);
    await this.page.waitForSelector(cartSelectors.cartItem);
  }  

  async addToCartByIndex(index: number): Promise<void> {
    const addButtons = await this.page.$$(globalSelectors.btnAddToCart);
    if (addButtons[index]) {
      await addButtons[index].click();
    }
  }

  async removeFromCartByIndex(index: number): Promise<void> {
    const removeButtons = await this.page.$$(globalSelectors.btnRemoveFromCart);
    if (removeButtons[index]) {
      await removeButtons[index].click();
    }
  }

  async goToProductPageByIndex(index: number): Promise<void> {
    const productNames = await this.page.$$(homePageSelectors.txtProductNames);
    if (productNames[index]) {
      await productNames[index].click();
    }
  }

  async getCartBadgeCount(): Promise<number> {
    const badge = await this.page.$(globalSelectors.txtCartBadge);
    if (badge) {
      const count = await badge.textContent();
      return parseInt(count || '0', 10);
    }
    return 0;
  }
  
  async getFirstAvailableProductIndex(): Promise<number | null> {
    const addButtons = await this.page.$$(globalSelectors.btnAddToCart);
  
    for (let i = 0; i < addButtons.length; i++) {
      const button = addButtons[i];
      const text = await button.textContent();
  
      if (text?.trim() === 'Add to cart') {
        return i;
      }
    }
  
    return null;
  }  
}
