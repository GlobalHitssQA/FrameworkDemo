const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractRecoveryPage = require('../pages/ContractRecoveryPage');

let contractRecoveryPage;
let serviceErrorDisplayed = false;

Given('the backend contract services are temporarily unavailable', async function () {
  contractRecoveryPage = new ContractRecoveryPage(this.page);
  await contractRecoveryPage.simulateBackendServiceFailure();
});

Given('a user is authenticated in the system', async function () {
  await contractRecoveryPage.navigateToApplication();
  await contractRecoveryPage.authenticateUser();
});

When('the user attempts to select a contract while services are down', async function () {
  await contractRecoveryPage.searchAndSelectContract();
  serviceErrorDisplayed = await contractRecoveryPage.isServiceErrorDisplayed();
});

Then('the system should display a service unavailability error message', async function () {
  expect(serviceErrorDisplayed).toBeTruthy();
  const errorMessage = await contractRecoveryPage.getErrorMessageText();
  expect(errorMessage).toBeTruthy();
});

When('the backend services are restored to operational status', async function () {
  await contractRecoveryPage.restoreBackendServices();
});

When('the user refreshes the contract component without restarting the session', async function () {
  await contractRecoveryPage.refreshContractComponent();
});

Then('the system should automatically recover the connection', async function () {
  const isConnected = await contractRecoveryPage.isBackendConnectionRestored();
  expect(isConnected).toBeTruthy();
});

Then('the contract value component should display information correctly', async function () {
  const isComponentVisible = await contractRecoveryPage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
  
  const hasValidData = await contractRecoveryPage.hasValidContractData();
  expect(hasValidData).toBeTruthy();
});

Then('no application or session restart should be required', async function () {
  const sessionActive = await contractRecoveryPage.isUserSessionActive();
  expect(sessionActive).toBeTruthy();
  
  const requiresRestart = await contractRecoveryPage.checkIfRestartRequired();
  expect(requiresRestart).toBeFalsy();
});