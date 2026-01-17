const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BreakdownPopupPage = require('../pages/BreakdownPopupPage');

let breakdownPopupPage;

Given('the user is authenticated in Acticenter', async function () {
  breakdownPopupPage = new BreakdownPopupPage(this.page);
  await breakdownPopupPage.navigateToActicenter();
  await breakdownPopupPage.verifyUserIsAuthenticated();
});

Given('the user has selected a contract with multiple items', async function () {
  await breakdownPopupPage.selectContractWithMultipleItems();
});

When('the user clicks on the contract value component to open the breakdown popup', async function () {
  await breakdownPopupPage.clickContractValueComponent();
});

Then('the breakdown popup should be displayed with all applicable items', async function () {
  const isVisible = await breakdownPopupPage.isBreakdownPopupVisible();
  expect(isVisible).toBe(true);
  const hasItems = await breakdownPopupPage.popupHasMultipleItems();
  expect(hasItems).toBe(true);
});

When('the user presses Tab key repeatedly to navigate through breakdown elements', async function () {
  await breakdownPopupPage.navigateWithTabKey();
});

Then('the focus should move in sequential order from top to bottom following the expected order', async function () {
  const tabOrderIsCorrect = await breakdownPopupPage.verifyTabOrderSequence();
  expect(tabOrderIsCorrect).toBe(true);
});

Then('the tab order should remain consistent when reopening the popup multiple times', async function () {
  const isConsistent = await breakdownPopupPage.verifyTabOrderConsistencyOnMultipleOpens();
  expect(isConsistent).toBe(true);
});