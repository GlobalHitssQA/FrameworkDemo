const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractTraceabilityPage = require('../pages/ContractTraceabilityPage');

let contractPage;

Given('the user is authenticated in the system', async function () {
  contractPage = new ContractTraceabilityPage(this.page);
  await contractPage.navigateToLogin();
  await contractPage.performAuthentication();
});

Given('the user selects a contract with composition data', async function () {
  await contractPage.searchAndSelectContract();
  const isComponentVisible = await contractPage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user expands the contract value breakdown', async function () {
  await contractPage.clickContractValueComponent();
});

Then('the system displays the popup with all composition items', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const itemsCount = await contractPage.getCompositionItemsCount();
  expect(itemsCount).toBeGreaterThan(0);
});

When('the user performs a query action on the Debt Funds item', async function () {
  await contractPage.clickOnCompositionItem('Fondos de deuda');
  await contractPage.captureOperationTimestamp();
});

Then('the system processes the action and generates a traceability record', async function () {
  const isProcessed = await contractPage.verifyActionProcessed();
  expect(isProcessed).toBeTruthy();
});

When('the user consults the system logs for the operation', async function () {
  await contractPage.navigateToSystemLogs();
  await contractPage.searchRecentOperationLog();
});

Then('the system shows the log entry with unique identifier and user', async function () {
  const hasUniqueId = await contractPage.verifyLogHasUniqueIdentifier();
  expect(hasUniqueId).toBeTruthy();
  const hasUser = await contractPage.verifyLogHasUserInfo();
  expect(hasUser).toBeTruthy();
});

Then('the log entry contains timestamp and contract information', async function () {
  const hasTimestamp = await contractPage.verifyLogHasTimestamp();
  expect(hasTimestamp).toBeTruthy();
  const hasContractInfo = await contractPage.verifyLogHasContractInfo();
  expect(hasContractInfo).toBeTruthy();
});

Then('the log entry contains the queried item and result', async function () {
  const hasQueriedItem = await contractPage.verifyLogHasQueriedItem();
  expect(hasQueriedItem).toBeTruthy();
  const hasResult = await contractPage.verifyLogHasOperationResult();
  expect(hasResult).toBeTruthy();
});