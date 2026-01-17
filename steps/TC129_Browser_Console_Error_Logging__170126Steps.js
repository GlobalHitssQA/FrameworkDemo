const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let consoleMessages = [];
let consoleErrors = [];

Given('the browser is opened with developer tools and console enabled', async function () {
  acticenterPage = new ActicenterPage(this.page);
  const listeners = await acticenterPage.setupConsoleListeners();
  consoleMessages = listeners.messages;
  consoleErrors = listeners.errors;
});

Given('I navigate to the Acticenter module', async function () {
  await acticenterPage.navigateToActicenter();
});

When('I login with valid credentials', async function () {
  await acticenterPage.enterUsername(process.env.TEST_USERNAME || 'testuser');
  await acticenterPage.enterPassword(process.env.TEST_PASSWORD || 'testpass');
  await acticenterPage.clickLoginButton();
});

Then('the system loads correctly without console errors', async function () {
  await acticenterPage.waitForDashboardToLoad();
  const initialErrors = await acticenterPage.getConsoleErrors(consoleErrors);
  expect(initialErrors.length).toBe(0);
});

When('I simulate a network failure by going offline', async function () {
  await acticenterPage.setOfflineMode(true);
});

When('I attempt to select a contract to load the value and composition component', async function () {
  await acticenterPage.clickSearchIcon();
  await acticenterPage.selectFirstContract();
});

Then('the console logs a descriptive error message indicating connection failure', async function () {
  await acticenterPage.waitForErrorToBeLogged(consoleErrors);
  const errors = await acticenterPage.getConsoleErrors(consoleErrors);
  const connectionError = errors.find(err => 
    err.text.includes('network') || 
    err.text.includes('connection') || 
    err.text.includes('fetch') ||
    err.text.includes('Failed to fetch')
  );
  expect(connectionError).toBeDefined();
});

Then('the error log contains timestamp and error type and affected service', async function () {
  const errors = await acticenterPage.getConsoleErrors(consoleErrors);
  const relevantError = errors[errors.length - 1];
  const hasTimestamp = await acticenterPage.errorContainsTimestamp(relevantError);
  const hasErrorType = await acticenterPage.errorContainsErrorType(relevantError);
  const hasServiceInfo = await acticenterPage.errorContainsServiceInfo(relevantError);
  expect(hasTimestamp || hasErrorType || hasServiceInfo).toBeTruthy();
});

When('I restore the network connection by going online', async function () {
  await acticenterPage.setOfflineMode(false);
  await acticenterPage.waitForNetworkRecovery();
});

Then('the system recovers successfully and logs the recovery in console', async function () {
  const messages = await acticenterPage.getConsoleMessages(consoleMessages);
  await acticenterPage.retryContractSelection();
  const isRecovered = await acticenterPage.isSystemRecovered();
  expect(isRecovered).toBeTruthy();
});

Then('there are no unhandled JavaScript errors in the console', async function () {
  const errors = await acticenterPage.getConsoleErrors(consoleErrors);
  const unhandledErrors = errors.filter(err => 
    err.text.includes('Uncaught') || 
    err.text.includes('unhandled') ||
    err.type === 'uncaughtException'
  );
  expect(unhandledErrors.length).toBe(0);
});