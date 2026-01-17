const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractCompositionPage = require('../pages/ContractCompositionPage');

let contractCompositionPage;

Given('I am authenticated in the Acticenter system', async function () {
  contractCompositionPage = new ContractCompositionPage(this.page);
  await contractCompositionPage.navigateToLogin();
  await contractCompositionPage.login();
  await contractCompositionPage.verifySuccessfulLogin();
});

When('I select a contract without composition information', async function () {
  await contractCompositionPage.openContractSearch();
  await contractCompositionPage.searchContractWithoutData();
  await contractCompositionPage.selectContractFromResults();
});

When('I attempt to view the contract value and composition component', async function () {
  await contractCompositionPage.clickContractValueComponent();
});

Then('I should see an informative message indicating no data is available', async function () {
  const messageVisible = await contractCompositionPage.isNoDataMessageVisible();
  expect(messageVisible).toBeTruthy();
  const messageText = await contractCompositionPage.getNoDataMessageText();
  expect(messageText).toContain('no hay datos disponibles');
});

Then('all applicable monetary fields should display zero value', async function () {
  const zeroValues = await contractCompositionPage.verifyAllFieldsShowZeroValue();
  expect(zeroValues).toBeTruthy();
});