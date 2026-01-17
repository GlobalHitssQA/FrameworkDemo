const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TimeoutConfigurationPage = require('../pages/TimeoutConfigurationPage');

let timeoutPage;
let responseMetrics = [];

Given('the performance monitoring system is active and recording response times', async function () {
  timeoutPage = new TimeoutConfigurationPage(this.page);
  await timeoutPage.setupPerformanceMonitoring();
  const isActive = await timeoutPage.isMonitoringActive();
  expect(isActive).toBeTruthy();
});

Given('I am authenticated in the system with available contracts', async function () {
  await timeoutPage.navigateToApplication();
  await timeoutPage.authenticateUser();
  const hasContracts = await timeoutPage.verifyContractsAvailable();
  expect(hasContracts).toBeTruthy();
});

When('I simulate a backend service with delayed response within acceptable timeout limits', async function () {
  await timeoutPage.configureServiceDelay(15000);
  const delayConfigured = await timeoutPage.isDelayConfigured();
  expect(delayConfigured).toBeTruthy();
});

When('I select a contract and request the value and composition component', async function () {
  await timeoutPage.selectFirstAvailableContract();
  responseMetrics = await timeoutPage.requestValueAndCompositionComponent();
});

Then('the system waits for the service response and displays the component when data is available', async function () {
  const componentVisible = await timeoutPage.isValueComponentVisible();
  expect(componentVisible).toBeTruthy();
  const responseTime = responseMetrics.responseTime;
  expect(responseTime).toBeGreaterThan(0);
  expect(responseTime).toBeLessThan(30000);
});

When('I simulate a backend service that exceeds the configured timeout', async function () {
  await timeoutPage.configureServiceDelay(45000);
  await timeoutPage.triggerTimeoutScenario();
});

Then('the system cancels the request after timeout and displays an informative error message', async function () {
  const errorMessage = await timeoutPage.getTimeoutErrorMessage();
  expect(errorMessage).toBeTruthy();
  const isUserFriendly = await timeoutPage.isErrorMessageUserFriendly();
  expect(isUserFriendly).toBeTruthy();
});

Then('the interface remains responsive and not blocked', async function () {
  const isResponsive = await timeoutPage.verifyInterfaceResponsiveness();
  expect(isResponsive).toBeTruthy();
  const canInteract = await timeoutPage.canUserInteractWithUI();
  expect(canInteract).toBeTruthy();
});

Then('the logs confirm timeout is configured at a reasonable value of {int} seconds', async function (expectedTimeout) {
  const configuredTimeout = await timeoutPage.getConfiguredTimeoutFromLogs();
  expect(configuredTimeout).toBe(expectedTimeout * 1000);
  const logsValid = await timeoutPage.verifyTimeoutLogsCorrect();
  expect(logsValid).toBeTruthy();
});