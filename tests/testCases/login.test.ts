import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { navigateToSite } from '../pages/setup';
import {
  emptyCredentials,
  invalidCredentials,
  lockedCredentials,
  missingUsername,
  missingPassword,
  errorMessages
} from '../resources/loginVariables';
import {
  loginWithValidCredentials,
  verifyUserIsLoggedIn,
  logoutFromSite
} from '../helpers/testHelpers';

test.describe('Login Page Test Cases', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await navigateToSite(page);
  });

  test('Valid Login', async () => {
    await loginWithValidCredentials(loginPage);
    await verifyUserIsLoggedIn(loginPage);
  });

  test('Valid Logout', async () => {
    await loginWithValidCredentials(loginPage);
    await logoutFromSite(loginPage);
  });

  test('Invalid Login Scenarios', async () => {
    const invalidLoginTests = [
      {
        description: 'Empty credentials',
        credentials: emptyCredentials,
        expectedMessage: errorMessages.emptyCred,
      },
      {
        description: 'Locked out user',
        credentials: lockedCredentials,
        expectedMessage: errorMessages.lockedCred,
      },
      {
        description: 'Wrong credentials',
        credentials: invalidCredentials,
        expectedMessage: errorMessages.invalidCred,
      },
      {
        description: 'Missing username',
        credentials: missingUsername,
        expectedMessage: errorMessages.missingUsername,
      },
      {
        description: 'Missing password',
        credentials: missingPassword,
        expectedMessage: errorMessages.missingPassword,
      },
    ];

    for (const { description, credentials, expectedMessage } of invalidLoginTests) {
      await test.step(`Verify: ${description}`, async () => {
        await loginPage.loginAndAssertError(credentials, expectedMessage);
        await loginPage.clearFields();
      });
    }
  });
});
