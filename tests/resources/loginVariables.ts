// resources/loginVariables.ts
// This file contains selectors, credentials, and expected error messages for the login page of SauceDemo tests.

// Selectors
export const loginPageSelectors = {
    inputUsername: 'input#user-name',
    inputPassword: 'input#password',
    btnLogin: 'input#login-button',
    btnMenu: 'button#react-burger-menu-btn',
    btnLogout: 'a#logout_sidebar_link',
    lblProducts: 'span.title', 
  };  
  
// Test Data
export type Credentials = {
    username: string;
    password: string;
};

export const invalidCredentials: Credentials = {
    username: 'invalid_user',
    password: 'wrong_password',
};
  
export const emptyCredentials: Credentials = {
    username: '',
    password: '',
};
  
export const missingUsername: Credentials = {
    username: '',
    password: 'secret_sauce',
};
  
export const missingPassword: Credentials = {
    username: 'standard_user',
    password: '',
};
  
export const lockedCredentials: Credentials = {
    username: 'locked_out_user',
    password: 'secret_sauce',
};

// Error Messages
export const invalidLoginMsgSelectors = {
    loginErrMsg: "//div[@class='error-message-container error']//h3",
};
  
export const errorMessages = {
    invalidCred: 'Epic sadface: Username and password do not match any user in this service',
    emptyCred: 'Epic sadface: Username is required',
    missingUsername: 'Epic sadface: Username is required',
    missingPassword: 'Epic sadface: Password is required',
    lockedCred: 'Epic sadface: Sorry, this user has been locked out.',
};
  