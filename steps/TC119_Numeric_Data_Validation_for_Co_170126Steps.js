const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('the backend services are configured to return valid numeric values', async function () {
  await contractValuePage.configureBackendServicesWithValidValues();
});

When('the user selects an active contract', async function () {
  await contractValuePage.clickSearchIcon();
  await contractValuePage.selectActiveContract();
});

Then('all numeric values should be displayed with proper monetary format', async function () {
  const isFormatValid = await contractValuePage.verifyMonetaryFormat();
  expect(isFormatValid).toBeTruthy();
});

When('the backend service returns negative values for a category', async function () {
  await contractValuePage.configureBackendWithNegativeValues();
  await contractValuePage.refreshContractData();
});

Then('the system should validate the received data before rendering', async function () {
  const isDataValidated = await contractValuePage.verifyDataValidationOccurred();
  expect(isDataValidated).toBeTruthy();
});

Then('negative values should be displayed with the corresponding symbol or rejected according to business rules', async function () {
  const negativeValuesHandledCorrectly = await contractValuePage.verifyNegativeValuesHandling();
  expect(negativeValuesHandledCorrectly).toBeTruthy();
});

When('the backend service returns values with extended decimals', async function () {
  await contractValuePage.configureBackendWithExtendedDecimals();
  await contractValuePage.refreshContractData();
});

Then('all amounts should be displayed with a maximum of two decimal places', async function () {
  const decimalsValid = await contractValuePage.verifyTwoDecimalPlaces();
  expect(decimalsValid).toBeTruthy();
});