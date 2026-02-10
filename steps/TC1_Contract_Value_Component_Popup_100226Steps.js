const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with an active contract selected', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToOperationScreen();
  await contractValuePage.selectActiveContract();
});

When('the user views the contract value component on the operation screen', async function () {
  await contractValuePage.waitForContractValueComponent();
});

Then('the system displays the closed contract value component', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBe(true);
  const isPopupClosed = await contractValuePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBe(true);
});

When('the user clicks on the contract value component', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the system displays the pop-up with the complete contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('the pop-up remains visible with all financial item information', async function () {
  const hasFinancialItems = await contractValuePage.hasFinancialItemsInBreakdown();
  expect(hasFinancialItems).toBe(true);
  const isStillVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isStillVisible).toBe(true);
});

When('the user clicks outside the component and the breakdown pop-up', async function () {
  await contractValuePage.clickOutsidePopup();
});

Then('the system closes the breakdown pop-up and returns to the view with only the contract value component visible', async function () {
  const isPopupClosed = await contractValuePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBe(true);
  const isComponentVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isComponentVisible).toBe(true);
});

When('the user clicks on the contract value component again', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the system displays the pop-up with the updated breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  const hasFinancialItems = await contractValuePage.hasFinancialItemsInBreakdown();
  expect(hasFinancialItems).toBe(true);
});