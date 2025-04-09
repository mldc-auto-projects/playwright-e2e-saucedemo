// pages/loginPages.ts
// All login page related functions are stored in this file including the logout

import { Page, expect } from '@playwright/test';
import { loginPageSelectors, invalidLoginMsgSelectors } from '../resources/loginVariables';

export class LoginPage {
  constructor(private page: Page) {}

  private usernameInput = loginPageSelectors.inputUsername;
  private passwordInput = loginPageSelectors.inputPassword;
  private loginButton = loginPageSelectors.btnLogin;
  private loginErrorMessage = invalidLoginMsgSelectors.loginErrMsg;
  private menuButton = loginPageSelectors.btnMenu;
  private logoutButton = loginPageSelectors.btnLogout;

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async clearFields() {
    await this.page.fill(this.usernameInput, '');
    await this.page.fill(this.passwordInput, '');
  }

  async getLoginErrorMessage() {
    const errorLocator = this.page.locator(this.loginErrorMessage);
    await errorLocator.waitFor({ state: 'visible' });
    return await errorLocator.innerText();
  }

  async loginAndAssertError(
    credentials: { username: string; password: string },
    expectedMessage: string
  ) {
    await this.login(credentials.username, credentials.password);
    const errorMessage = await this.getLoginErrorMessage();
    expect(errorMessage).toBe(expectedMessage);
  }

  async logout() {
    await this.page.click(this.menuButton);
    await this.page.click(this.logoutButton);
  }

  async getInventoryHeaderText(): Promise<string> {
    const header = this.page.locator('.title');
    await header.waitFor({ state: 'visible' });
    return await header.textContent() || '';
  }
}
