const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractRetryPage = require('../pages/ContractRetryPage');

let contractRetryPage;
let monitoringLogs;
let callAttempts;

Given('the backend call monitoring system is configured and active', async function () {
  contractRetryPage = new ContractRetryPage(this.page);
  await contractRetryPage.navigateToApplication();
  await contractRetryPage.configureMonitoringSystem();
  const isMonitoringActive = await contractRetryPage.isMonitoringSystemActive();
  expect(isMonitoringActive).toBeTruthy();
});

Given('the contract value service is configured to fail on first call but succeed on retry', async function () {
  await contractRetryPage.configureIntermittentServiceFailure();
  const isFailureConfigured = await contractRetryPage.isIntermittentFailureConfigured();
  expect(isFailureConfigured).toBeTruthy();
});

When('I select a contract and request the component visualization', async function () {
  await contractRetryPage.selectContract();
  await contractRetryPage.requestComponentVisualization();
});

Then('the system should attempt the first call which fails', async function () {
  const firstCallFailed = await contractRetryPage.verifyFirstCallFailed();
  expect(firstCallFailed).toBeTruthy();
});

Then('the system should automatically execute retry attempts', async function () {
  callAttempts = await contractRetryPage.getRetryAttemptCount();
  expect(callAttempts).toBeGreaterThan(1);
});

Then('the logs should show multiple call attempts to the service', async function () {
  monitoringLogs = await contractRetryPage.getMonitoringLogs();
  const retryLogsFound = await contractRetryPage.verifyRetryLogsExist(monitoringLogs);
  expect(retryLogsFound).toBeTruthy();
});

Then('the contract component should display correctly after successful retry', async function () {
  const isComponentVisible = await contractRetryPage.isContractComponentVisible();
  expect(isComponentVisible).toBeTruthy();
  const contractValue = await contractRetryPage.getContractTotalValue();
  expect(contractValue).toBeTruthy();
});