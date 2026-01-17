const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TotalValuePage = require('../pages/TotalValuePage');

let totalValuePage;

Given('the user is authenticated in Acticenter with a selected contract', async function () {
  totalValuePage = new TotalValuePage(this.page);
  await totalValuePage.navigateToActicenter();
  await totalValuePage.waitForContractLoaded();
});

When('the user navigates to the total value component using Tab key', async function () {
  await totalValuePage.tabToTotalValueComponent();
});

Then('the focus should be positioned on the total value component', async function () {
  const isFocused = await totalValuePage.isTotalValueComponentFocused();
  expect(isFocused).toBeTruthy();
});

When('the user presses Enter or Space to open the breakdown popup', async function () {
  await totalValuePage.pressEnterOnFocusedElement();
});

Then('the breakdown popup should be displayed showing the breakdown items', async function () {
  const isVisible = await totalValuePage.isBreakdownPopupVisible();
  expect(isVisible).toBeTruthy();
});

When('the user navigates through breakdown items using Tab and Shift+Tab', async function () {
  await totalValuePage.navigateThroughBreakdownItems();
});

Then('the focus should move sequentially through each breakdown item in order', async function () {
  const focusMovedCorrectly = await totalValuePage.verifyBreakdownItemsFocusOrder();
  expect(focusMovedCorrectly).toBeTruthy();
});

When('the user presses Escape key to close the popup', async function () {
  await totalValuePage.pressEscapeKey();
});

Then('the popup should close and focus should return to the total value component', async function () {
  const popupClosed = await totalValuePage.isBreakdownPopupHidden();
  const focusReturned = await totalValuePage.isTotalValueComponentFocused();
  expect(popupClosed).toBeTruthy();
  expect(focusReturned).toBeTruthy();
});

Then('all interactive elements should have a visible focus indicator', async function () {
  const hasFocusIndicators = await totalValuePage.verifyFocusIndicatorsVisible();
  expect(hasFocusIndicators).toBeTruthy();
});