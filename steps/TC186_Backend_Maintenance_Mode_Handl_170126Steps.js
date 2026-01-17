const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let maintenanceSimulated = false;

Given('the backend services for contract value consultation are in maintenance mode', async function () {
  maintenanceSimulated = await contractValuePage.simulateBackendMaintenance();
  expect(maintenanceSimulated).toBe(true);
});

Given('I am authenticated in the system', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigate();
  await contractValuePage.authenticate();
});

When('I select a contract and navigate to the funds operation screen', async function () {
  await contractValuePage.selectContract();
  await contractValuePage.navigateToFundsOperationScreen();
});

When('I attempt to view the contract value and composition component', async function () {
  await contractValuePage.attemptToViewContractValueComponent();
});

Then('the system should display an informative maintenance message', async function () {
  const isMaintenanceMessageVisible = await contractValuePage.isMaintenanceMessageVisible();
  expect(isMaintenanceMessageVisible).toBe(true);
  
  const messageText = await contractValuePage.getMaintenanceMessageText();
  expect(messageText).toContain('mantenimiento');
});

Then('the system should not display any technical errors', async function () {
  const hasTechnicalErrors = await contractValuePage.hasTechnicalErrorsDisplayed();
  expect(hasTechnicalErrors).toBe(false);
});

Then('the application should remain stable without failures', async function () {
  const isApplicationStable = await contractValuePage.isApplicationStable();
  expect(isApplicationStable).toBe(true);
});