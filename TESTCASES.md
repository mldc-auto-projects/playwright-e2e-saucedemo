# Test Case Coverage Overview

This document outlines the test scenarios covered in the Playwright E2E automation project for [SauceDemo](https://www.saucedemo.com/).

---

## 🔐 Login

- **Valid Login**
  - Verify login using valid credentials
- **Invalid Login**
  - Verify login using empty credentials
  - Verify login using locked-out user credentials
  - Verify login using incorrect credentials
- **Logout**
  - Verify logout from the homepage

---

## 🏠 Homepage

- **Product Sorting**
  - Verify products are sorted from A to Z
  - Verify products are sorted from Z to A
  - Verify products are sorted by Price (High to Low)
  - Verify products are sorted by Price (Low to High)
- **Product Details**
  - Image is displayed and not broken
  - Description is visible
  - Product price is present
  - Add to Cart button is visible

---

## 🛒 Cart

- **Add/Remove Items**
  - Via Homepage
  - Via Product Page
  - Via Cart Page
- **Cart Details**
  - Verify quantity, title, description, and price of products in the cart

---

## 💳 Checkout

- **Checkout Form**
  - Verify validation message when form is empty
  - Verify form submission with valid data
- **Checkout Overview Page**
  - Verify product quantity, name, description, and price
  - Verify payment information is displayed
  - Verify shipping information is displayed
  - Verify price breakdown: subtotal, tax, total
- **Checkout Complete Page**
  - Verify success message after purchase
  - Verify "Back Home" button redirects to product list

---

## 📎 Footer

- **Social Media Icons**
  - Verify X (Twitter) icon link and title
  - Verify Facebook icon link and title
  - Verify LinkedIn icon link and title
- **Copyright**
  - Verify copyright text

---