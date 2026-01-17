const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('a user with patrimonial banking profile is authenticated', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToLogin();
  await contractValuePage.authenticateWithProfile('patrimonial');
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('a user with private banking profile is authenticated', async function () {
  await contractValuePage.logout();
  await contractValuePage.navigateToLogin();
  await contractValuePage.authenticateWithProfile('private');
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('a user with wealth management profile is authenticated', async function () {
  await contractValuePage.logout();
  await contractValuePage.navigateToLogin();
  await contractValuePage.authenticateWithProfile('wealthManagement');
  await contractValuePage.verifyUserIsAuthenticated();
});

When('the user selects a contract and views the value and composition component', async function () {
  await contractValuePage.selectContract();
  await contractValuePage.viewValueAndCompositionComponent();
});

Then('the component displays information corresponding to patrimonial banking profile', async function () {
  const isDisplayed = await contractValuePage.verifyProfileRestrictions('patrimonial');
  expect(isDisplayed).toBeTruthy();
});

Then('the component displays information corresponding to private banking profile', async function () {
  const isDisplayed = await contractValuePage.verifyProfileRestrictions('private');
  expect(isDisplayed).toBeTruthy();
});

Then('the component displays information corresponding to wealth management profile', async function () {
  const isDisplayed = await contractValuePage.verifyProfileRestrictions('wealthManagement');
  expect(isDisplayed).toBeTruthy();
});