const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ClientSearchPage = require('../pages/ClientSearchPage');

let loginPage;
let clientSearchPage;

Given('I am logged into Acticenter with valid credentials', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.login(process.env.ACTICENTER_USER, process.env.ACTICENTER_PASSWORD);
  await loginPage.verifySuccessfulLogin();
});

When('I click on the magnifying glass icon in the application header', async function () {
  clientSearchPage = new ClientSearchPage(this.page);
  await clientSearchPage.clickMagnifyingGlassIcon();
});

Then('the system displays the client general screen', async function () {
  const isVisible = await clientSearchPage.isClientGeneralScreenVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see a list of available Business Partners or contracts', async function () {
  const hasContracts = await clientSearchPage.hasAvailableContracts();
  expect(hasContracts).toBeTruthy();
});

Then('I should be able to select a specific contract from the list', async function () {
  const isSelectable = await clientSearchPage.areContractsSelectable();
  expect(isSelectable).toBeTruthy();
});