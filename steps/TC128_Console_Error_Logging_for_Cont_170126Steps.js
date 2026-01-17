const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let consoleMessages = [];
let consoleErrors = [];

Given('the user has browser developer tools enabled', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.setupConsoleListener((msg) => {
    consoleMessages.push(msg);
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleErrors.push(msg);
    }
  });
});

Given('the user is authenticated in Acticenter', async function () {
  await contractValuePage.navigateToActicenter();
  await contractValuePage.login();
});

When('the user opens the browser developer console', async function () {
  consoleMessages = [];
  consoleErrors = [];
  await contractValuePage.clearConsoleMessages();
});

When('the user accesses a contract and clicks on the total value component', async function () {
  await contractValuePage.searchContract();
  await contractValuePage.clickTotalValueComponent();
});

Then('the popup should display and informative logs should be captured if configured', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const infoLogs = consoleMessages.filter(msg => msg.type() === 'log' || msg.type() === 'info');
  console.log(`Captured ${infoLogs.length} informative logs`);
});

When('the user simulates an error by loading a contract with incomplete data or unavailable services', async function () {
  consoleErrors = [];
  await contractValuePage.loadContractWithIncompleteData();
});

Then('errors should be logged in the console with appropriate level and descriptive messages', async function () {
  await contractValuePage.waitForConsoleErrors();
  const hasErrors = consoleErrors.length > 0;
  expect(hasErrors).toBeTruthy();
  for (const error of consoleErrors) {
    const errorType = error.type();
    expect(['error', 'warning']).toContain(errorType);
    const errorText = error.text();
    expect(errorText.length).toBeGreaterThan(0);
  }
});

Then('the error messages should include relevant information like error type, affected component and stack trace', async function () {
  for (const error of consoleErrors) {
    const errorText = error.text();
    const hasRelevantInfo = await contractValuePage.validateErrorMessageContent(errorText);
    expect(hasRelevantInfo).toBeTruthy();
  }
});

When('the user interacts with the component during normal operation', async function () {
  consoleErrors = [];
  await contractValuePage.closeBreakdownPopup();
  await contractValuePage.searchValidContract();
  await contractValuePage.clickTotalValueComponent();
  await contractValuePage.interactWithBreakdownItems();
});

Then('no error messages should appear in the console during normal functioning', async function () {
  const errorsDuringNormalOperation = consoleErrors.filter(msg => msg.type() === 'error');
  expect(errorsDuringNormalOperation.length).toBe(0);
});