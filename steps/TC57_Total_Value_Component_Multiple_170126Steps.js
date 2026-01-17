const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TotalValuePage = require('../pages/TotalValuePage');

let totalValuePage;

Given('the user is authenticated in Acticenter', async function () {
  totalValuePage = new TotalValuePage(this.page);
  await totalValuePage.navigateToApplication();
  await totalValuePage.authenticate();
});

Given('a contract with breakdown items is selected', async function () {
  await totalValuePage.selectContractWithBreakdown();
  const isVisible = await totalValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total value component', async function () {
  await totalValuePage.clickTotalValueComponent();
});

Then('the system displays the breakdown popup with contract items', async function () {
  const isPopupVisible = await totalValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasItems = await totalValuePage.hasBreakdownItems();
  expect(hasItems).toBeTruthy();
});

When('the user clicks outside the popup to close it', async function () {
  await totalValuePage.clickOutsidePopup();
});

Then('the breakdown popup is closed', async function () {
  const isPopupHidden = await totalValuePage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
});

When('the user clicks on the total value component again', async function () {
  await totalValuePage.clickTotalValueComponent();
});

When('the user opens and closes the popup multiple times consecutively', async function () {
  await totalValuePage.openAndClosePopupMultipleTimes(5);
});

Then('the system responds correctly opening and closing the popup without errors', async function () {
  const noErrors = await totalValuePage.verifyNoConsoleErrors();
  expect(noErrors).toBeTruthy();
  const componentFunctional = await totalValuePage.verifyComponentResponsive();
  expect(componentFunctional).toBeTruthy();
});