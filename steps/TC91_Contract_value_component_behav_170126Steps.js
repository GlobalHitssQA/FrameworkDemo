const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in the system', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.performLogin();
});

Given('a contract is previously selected', async function () {
  await contractValuePage.selectContract();
});

Given('the backend services are disconnected', async function () {
  await contractValuePage.interceptAndBlockBackendRequests();
});

When('the user attempts to load the contract value and composition component', async function () {
  await contractValuePage.loadContractValueComponent();
});

Then('the system detects the lack of connection with the backend', async function () {
  const connectionError = await contractValuePage.isConnectionErrorDetected();
  expect(connectionError).toBe(true);
});

Then('an appropriate error message is displayed to the user', async function () {
  const errorMessage = await contractValuePage.getErrorMessageText();
  expect(errorMessage).toBeTruthy();
  const isValidErrorMessage = await contractValuePage.isErrorMessageAppropriate();
  expect(isValidErrorMessage).toBe(true);
});

Then('the component does not show incorrect or blank data without notification', async function () {
  const hasPartialData = await contractValuePage.hasPartialOrMisleadingData();
  expect(hasPartialData).toBe(false);
  const errorMessageVisible = await contractValuePage.isErrorMessageVisible();
  expect(errorMessageVisible).toBe(true);
});