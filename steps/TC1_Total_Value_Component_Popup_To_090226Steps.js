const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FundsOperationPage = require('../pages/FundsOperationPage');

let fundsOperationPage;

Given('the user is authenticated and on the funds operation screen with a selected contract', async function () {
  fundsOperationPage = new FundsOperationPage(this.page);
  await fundsOperationPage.navigateToFundsOperation();
});

Given('the total value component is visible', async function () {
  const isVisible = await fundsOperationPage.isTotalValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total value component', async function () {
  await fundsOperationPage.clickTotalValueComponent();
});

Then('the breakdown popup is displayed aligned with the component', async function () {
  const isPopupVisible = await fundsOperationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

When('the user clicks outside the popup and the total value component', async function () {
  await fundsOperationPage.clickOutsidePopup();
});

Then('the breakdown popup is closed', async function () {
  const isPopupVisible = await fundsOperationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(false);
});

Then('the total value component remains visible and functional', async function () {
  const isVisible = await fundsOperationPage.isTotalValueComponentVisible();
  expect(isVisible).toBe(true);
  const hasValue = await fundsOperationPage.getTotalValueText();
  expect(hasValue).toBeTruthy();
});

When('the user clicks on the total value component again', async function () {
  await fundsOperationPage.clickTotalValueComponent();
});

Then('the breakdown popup is displayed again confirming the toggle functionality works correctly', async function () {
  const isPopupVisible = await fundsOperationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  const breakdownItems = await fundsOperationPage.getBreakdownItemsCount();
  expect(breakdownItems).toBeGreaterThan(0);
});