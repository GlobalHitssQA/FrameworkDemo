const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated and on the Acticenter main screen', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user selects a contract with pending settlement operations', async function () {
  await acticenterPage.openContractSearch();
  await acticenterPage.selectContractWithPendingOperations();
  await acticenterPage.verifyContractIsLoaded();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValue();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Pending Settlement item is visible in the breakdown', async function () {
  const isPendingSettlementVisible = await acticenterPage.isPendingSettlementItemVisible();
  expect(isPendingSettlementVisible).toBeTruthy();
});

Then('the Pending Settlement value reflects the total amount of pending operations', async function () {
  const pendingValue = await acticenterPage.getPendingSettlementValue();
  expect(pendingValue).not.toBeNull();
  expect(pendingValue).toMatch(/^\$?[\d,]+(\.\d{2})?$/);
});