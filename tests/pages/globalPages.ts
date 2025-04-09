// pages/globalPages.ts
// This file contains the GlobalPages class, which handles interactions with global elements across multiple pages in the application.

import { Page, expect } from '@playwright/test';

export class GlobalPages {
  constructor(public page: Page) {}

  async clickSocialMediaIcon(selector: string) {
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.click(selector),
    ]);
    await newTab.waitForLoadState('load');
    return newTab;
  }

  async verifySocialMediaPage(newTab: Page, expectedUrl: string, expectedTitle: string) {
    await expect(newTab).toHaveURL(expectedUrl);
    await expect(newTab).toHaveTitle(expectedTitle);
    await newTab.close();
  }

  async verifyFooterCopyright(expectedText: string) {
    await expect(this.page.locator('[data-test="footer-copy"]')).toHaveText(expectedText);
  }
  
}
