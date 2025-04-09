// tests/testCases/footer.test.ts

import { test } from '@playwright/test';
import { performLogin, scrollToFooter } from '../helpers/testHelpers';
import { GlobalPages } from '../pages/globalPages';
import { footerTestData } from '../resources/globalVariables';

test.describe('Footer Test Suite', () => {
  let globalPages: GlobalPages;

  test.beforeEach(async ({ page }) => {
    globalPages = new GlobalPages(page);
    await performLogin(page);
    await scrollToFooter(page);
  });

  test('Verify Footer Social Media Icons', async ({ page }) => {
    for (const socialMedia of footerTestData.socialMediaLinks) {
      const newTab = await globalPages.clickSocialMediaIcon(socialMedia.selector);
      await globalPages.verifySocialMediaPage(
        newTab,
        socialMedia.expectedUrl,
        socialMedia.expectedTitle
      );
    }
  });

  test('Verify Footer Copyright', async ({ page }) => {
    await globalPages.verifyFooterCopyright(footerTestData.copyrightText);
  });  
});
