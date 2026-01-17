const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractComponentPage = require('../pages/ContractComponentPage');

let contractPage;
let page;

Given('a user with advisor or wealth management banker permissions is on the login page', async function() {
  page = this.page;
  contractPage = new ContractComponentPage(page);
  await contractPage.navigateToLoginPage();
});

When('the user authenticates with valid credentials', async function() {
  await contractPage.loginWithAuthorizedUser();
});

Then('the user should access the Acticenter system successfully', async function() {
  const isLoggedIn = await contractPage.isUserLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

Then('the user navigates to the funds operation flow', async function() {
  await contractPage.navigateToFundsOperationFlow();
});

Then('the user selects a valid contract', async function() {
  await contractPage.selectValidContract();
});

Then('the contract value and composition component should be visible', async function() {
  const isComponentVisible = await contractPage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user logs out from the system', async function() {
  await contractPage.logout();
});

When('the user authenticates with a user without component view permissions', async function() {
  await contractPage.loginWithUnauthorizedUser();
});

Then('the contract value and composition component should not be visible or show access restriction message', async function() {
  const isHiddenOrRestricted = await contractPage.isComponentHiddenOrRestricted();
  expect(isHiddenOrRestricted).toBeTruthy();
});