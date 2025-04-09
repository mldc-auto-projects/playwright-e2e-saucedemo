// resources/globalVariables.ts
// This file contains global/shared variables for SauceDemo tests that are used across multiple test files.

export const BASE_URL = 'https://www.saucedemo.com/';

// Login credentials
export const validCredentials = {
    username: 'standard_user',
    password: 'secret_sauce',
};

// Shared/global selectors
export const globalSelectors = {
    btnCartIcon: 'a.shopping_cart_link',
    txtCartBadge: '.shopping_cart_badge',
    btnAddToCart: 'button.btn_inventory',
    btnRemoveFromCart: 'button:has-text("Remove")',
    btnContinueShopping: 'button[data-test="continue-shopping"]',
    lblCopyright: '[data-test="footer-copy"]',
};

export const footerTestData = {
    socialMediaLinks: [
      {
        selector: '[data-test="social-twitter"]',
        expectedUrl: 'https://x.com/saucelabs',
        expectedTitle: 'Sauce Labs (@saucelabs) / X',
      },
      {
        selector: '[data-test="social-facebook"]',
        expectedUrl: 'https://www.facebook.com/saucelabs',
        expectedTitle: 'Sauce Labs | Facebook',
      },
      {
        selector: '[data-test="social-linkedin"]',
        expectedUrl: 'https://www.linkedin.com/company/sauce-labs/',
        expectedTitle: 'Sauce Labs | LinkedIn',
      },
    ],
    copyrightText:
    '© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy',
  };
