const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractLoggingPage = require('../pages/ContractLoggingPage');

let contractLoggingPage;
let capturedFrontendLogs = [];
let capturedBackendLogs = [];

Given('the logging system is configured in verbose or debug mode', async function () {
  contractLoggingPage = new ContractLoggingPage(this.page);
  await contractLoggingPage.configureVerboseLogging();
  capturedFrontendLogs = await contractLoggingPage.initializeLogCapture();
});

Given('the user is authenticated in Acticenter', async function () {
  await contractLoggingPage.navigateToApplication();
  await contractLoggingPage.verifyUserIsAuthenticated();
});

When('the user accesses the contract value and composition component', async function () {
  await contractLoggingPage.accessContractValueComponent();
  await contractLoggingPage.waitForComponentToLoad();
});

When('the user expands the contract breakdown details', async function () {
  await contractLoggingPage.clickContractValueToExpandBreakdown();
  await contractLoggingPage.waitForBreakdownPopupToAppear();
});

When('the user performs update operations on the component', async function () {
  await contractLoggingPage.performRefreshOperation();
  await contractLoggingPage.interactWithBreakdownItems();
  await contractLoggingPage.closeBreakdownPopup();
});

Then('the frontend logs should not contain sensitive financial data', async function () {
  const frontendLogs = await contractLoggingPage.collectFrontendLogs();
  const sensitiveDataFound = await contractLoggingPage.checkLogsForSensitiveMonetaryData(frontendLogs);
  expect(sensitiveDataFound).toBe(false);
});

Then('the backend logs should not contain complete contract numbers', async function () {
  const backendLogs = await contractLoggingPage.fetchBackendLogs();
  const completeContractNumbersFound = await contractLoggingPage.checkLogsForCompleteContractNumbers(backendLogs);
  expect(completeContractNumbersFound).toBe(false);
});

Then('all logged identifiers should be masked or use operation codes only', async function () {
  const allLogs = await contractLoggingPage.getAllCapturedLogs();
  const unmmaskedIdentifiersFound = await contractLoggingPage.checkLogsForUnmaskedIdentifiers(allLogs);
  expect(unmmaskedIdentifiersFound).toBe(false);
  await contractLoggingPage.generateSecurityAuditReport();
});