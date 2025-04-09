# Playwright E2E Test Automation for SauceDemo

This project is an end-to-end test automation framework built using [SauceDemo](https://www.saucedemo.com/) as the sample web application under test.

It leverages **Playwright** with **TypeScript** to provide fast, reliable, and maintainable test execution for common user workflows such as login, product interactions, cart management, checkout, and footer validation.

---

## Tools & Technologies

- **Framework:** Playwright Test (TypeScript)
- **Language:** TypeScript
- **Test Runner:** Playwright's built-in test runner
- **Reporter:** Playwright HTML Reporter
- **IDE:** Visual Studio Code (VS Code)
- **CI-ready:** Configurable and scalable

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mldc-auto-projects/playwright-e2e-saucedemo.git
cd playwright-e2e-saucedemo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

---

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/testCases/login.test.ts
```

### Open the HTML report

```bash
npx playwright show-report
```

---

## Test Coverage

- **Login** (valid, empty, locked-out, invalid)
- **Logout functionality**
- **Homepage product sorting:**
  - A-Z
  - Z-A
  - Price: High to Low
  - Price: Low to High
- **Homepage product detail validation**
- **Cart add/remove from:**
  - Homepage
  - Product Page
  - Cart Page
- **Cart product detail validation**
- **Checkout form:**
  - Empty form validation
  - Valid filled form
- **Checkout overview:**
  - Product details
  - Payment & shipping info
  - Price summary (subtotal, tax, total)
- **Checkout complete:**
  - Success message
  - Redirection via "Back Home"
- **Footer:**
  - Social media links (X, Facebook, LinkedIn)
  - Copyright

---

## Folder Structure

```
playwright-e2e-saucedemo/
├── node_modules/                # Project dependencies
├── playwright-report/           # Playwright HTML test report
├── test-results/                # Test output (videos, screenshots, logs)
├── tests/
│   ├── helpers/                 # Reusable helper functions
│   │   └── testHelpers.ts
│   ├── pages/                   # Page object model files
│   │   ├── cartPage.ts
│   │   ├── checkoutPage.ts
│   │   ├── globalPages.ts
│   │   ├── homePage.ts
│   │   ├── loginPage.ts
│   │   ├── productPage.ts
│   │   └── setup.ts
│   ├── resources/               # Selectors & test data
│   │   ├── cartVariables.ts
│   │   ├── checkoutVariables.ts
│   │   ├── globalVariables.ts
│   │   ├── homeVariables.ts
│   │   └── loginVariables.ts
│   └── testCases/               # All test case scripts
│       ├── cart.test.ts
│       ├── checkout.test.ts
│       ├── footer.test.ts
│       ├── home.test.ts
│       └── login.test.ts
├── README.md                    # Project documentation
├── TESTCASES.md                 # Overview of test cases
├── package.json                 # Project config and scripts
├── package-lock.json
└── playwright.config.ts         # Playwright test configuration
```

---

## Notes

- Test reports are generated in `playwright-report/`
- Videos and screenshots are automatically captured for failed tests
- For visual debugging, SlowMo is enabled in Chromium. You may adjust or disable it in `playwright.config.ts`

---

## Public Access

This repository is **public** and can be cloned, installed, and executed without special permissions.  
Please feel free to reach out if access issues arise.