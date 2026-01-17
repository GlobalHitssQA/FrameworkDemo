const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValuationBreakdownPage = require('../pages/ValuationBreakdownPage');

let valuationPage;

Given('the user is authenticated in Acticenter', async function () {
  valuationPage = new ValuationBreakdownPage(this.page);
  await valuationPage.navigateToActicenter();
  await valuationPage.waitForAuthentication();
});

Given('a contract with at least one applicable item without balance is selected', async function () {
  await valuationPage.searchAndSelectContractWithZeroBalanceItem();
});

When('the user views the total contract value component', async function () {
  await valuationPage.waitForContractValueComponentVisible();
});

Then('the system displays the total contract value component', async function () {
  const isVisible = await valuationPage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user identifies which applicable items have no monetary value', async function () {
  await valuationPage.identifyZeroValueItems();
});

Then('the items with zero value are identified', async function () {
  const zeroItems = await valuationPage.getIdentifiedZeroValueItems();
  expect(zeroItems.length).toBeGreaterThan(0);
});

When('the user clicks on the total contract value component', async function () {
  await valuationPage.clickContractValueComponent();
});

Then('the system displays the popup with detailed contract value breakdown', async function () {
  const isPopupVisible = await valuationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user verifies the applicable items without monetary value in the list', async function () {
  await valuationPage.scrollToViewAllBreakdownItems();
});

Then('all applicable items are displayed and those without monetary value show exactly $0.00 on the right side', async function () {
  const zeroValueItemsDisplayCorrectly = await valuationPage.verifyZeroValueItemsDisplayAsZero();
  expect(zeroValueItemsDisplayCorrectly).toBeTruthy();
});