const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;
let consoleErrors = [];

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.performLogin();
});

Given('a service scenario is configured to return null values for some items', async function () {
  await contractBreakdownPage.interceptServiceWithNullValues();
  consoleErrors = await contractBreakdownPage.setupConsoleErrorListener();
});

When('the user selects an active contract', async function () {
  await contractBreakdownPage.searchAndSelectContract();
});

When('the user opens the contract value breakdown', async function () {
  await contractBreakdownPage.openContractBreakdown();
});

Then('the component should process the service response without console errors', async function () {
  const errors = await contractBreakdownPage.getConsoleErrors(consoleErrors);
  expect(errors.length).toBe(0);
});

Then('items with null values should display as $0.00', async function () {
  const nullItemsDisplayedCorrectly = await contractBreakdownPage.verifyNullItemsDisplayAsZero();
  expect(nullItemsDisplayedCorrectly).toBe(true);
});

Then('the total value should calculate correctly treating null values as zero', async function () {
  const totalIsCorrect = await contractBreakdownPage.verifyTotalCalculationWithNulls();
  expect(totalIsCorrect).toBe(true);
});

Then('no error messages should be visible to the user', async function () {
  const hasVisibleErrors = await contractBreakdownPage.hasVisibleErrorMessages();
  expect(hasVisibleErrors).toBe(false);
});