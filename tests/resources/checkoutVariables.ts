// resources/checkoutVariables.ts

export const checkoutSelectors = {
  // Checkout Form
  inputFirstName: '#first-name',
  inputLastName: '#last-name',
  inputPostalCode: '#postal-code',
  btnContinue: '#continue',
  lblErrorMsg: '[data-test="error"]',
  lblOverviewTitle: '[data-test="title"]',

  // Overview Page
  cartItems: '.cart_item',
  itemQty: '.cart_quantity',
  itemName: '.inventory_item_name',
  itemDesc: '.inventory_item_desc',
  itemPrice: '.inventory_item_price',
  paymentInfo: '[data-test="payment-info-value"]',
  shippingInfo: '[data-test="shipping-info-value"]',
  subtotal: '[data-test="subtotal-label"]',
  tax: '[data-test="tax-label"]',
  total: '[data-test="total-label"]',

  // Checkout Complete Page
  btnFinish: '#finish',
  msgSuccessfulCheckout: '[data-test="checkout-complete-container"] .complete-text',
  btnBackHome: '[data-test="back-to-products"]',

  // Home Page Validation (Post-checkout redirection)
  homePageTitle: '[data-test="title"]',
};

export const errorMessages = {
  firstNameRequired: 'Error: First Name is required',
};

export const checkoutTestData = {
  firstName: 'QA',
  lastName: 'Test',
  postalCode: '8888',
  paymentInfo: 'SauceCard #31337',
  shippingInfo: 'Free Pony Express Delivery!',

  // Checkout Complete Page
  successfulCheckoutMessage: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',

  // Homepage
  homePageTitleText: 'Products',
};
