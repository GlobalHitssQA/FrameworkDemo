const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user is authenticated in Acticenter with an active contract selected', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToActicenter();
  await valueCompositionPage.verifyMainScreenWithActiveContract();
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await valueCompositionPage.clickTotalValueComponent();
});

Then('the system displays the popup with the itemized breakdown list', async function () {
  const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user clicks outside the breakdown component', async function () {
  await valueCompositionPage.clickOutsideBreakdownComponent();
});

Then('the system closes the breakdown popup automatically', async function () {
  const isPopupHidden = await valueCompositionPage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
});

Then('the total value component remains visible in its initial state', async function () {
  const isComponentVisible = await valueCompositionPage.isTotalValueComponentVisible();
  const isPopupClosed = await valueCompositionPage.isBreakdownPopupHidden();
  expect(isComponentVisible).toBeTruthy();
  expect(isPopupClosed).toBeTruthy();
});