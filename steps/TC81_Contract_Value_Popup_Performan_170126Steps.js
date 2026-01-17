const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let performanceMetrics = [];

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.login();
});

Given('the user has selected an active contract', async function () {
  await contractValuePage.selectActiveContract();
});

When('the user views the total contract value component', async function () {
  await contractValuePage.waitForContractValueComponent();
});

Then('the total contract value component should be displayed', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the breakdown popup should be displayed with all monetary items', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  const hasMonetaryItems = await contractValuePage.hasMonetaryItems();
  expect(hasMonetaryItems).toBe(true);
});

When('the user clicks outside the popup to close it', async function () {
  await contractValuePage.clickOutsidePopup();
});

Then('the popup should be closed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(false);
});

When('the user opens and closes the popup {int} consecutive times', async function (times) {
  performanceMetrics = await contractValuePage.openAndClosePopupMultipleTimes(times);
});

Then('the component should respond correctly without performance degradation', async function () {
  const allResponsesValid = contractValuePage.validatePerformanceMetrics(performanceMetrics);
  expect(allResponsesValid).toBe(true);
});

Then('no console errors should be present', async function () {
  const consoleErrors = await contractValuePage.getConsoleErrors();
  expect(consoleErrors.length).toBe(0);
});

Then('no error messages should be displayed on screen', async function () {
  const hasErrorMessages = await contractValuePage.hasErrorMessagesOnScreen();
  expect(hasErrorMessages).toBe(false);
});