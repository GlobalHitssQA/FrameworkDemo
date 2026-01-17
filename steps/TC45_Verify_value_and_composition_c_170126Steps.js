const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user accesses Acticenter with Wealth Management credentials', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToActicenter();
  await valueCompositionPage.loginWithWealthManagementUser();
  const isMainInterfaceVisible = await valueCompositionPage.isMainInterfaceVisible();
  expect(isMainInterfaceVisible).toBeTruthy();
});

When('the browser is configured in Responsive Portrait mode', async function () {
  await valueCompositionPage.setResponsivePortraitMode();
  const isPortraitAdapted = await valueCompositionPage.isInterfaceAdaptedToPortrait();
  expect(isPortraitAdapted).toBeTruthy();
});

When('the user selects an active Wealth Management contract', async function () {
  await valueCompositionPage.selectActiveWealthManagementContract();
  const isComponentVisible = await valueCompositionPage.isValueCompositionComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the total contract value is displayed correctly in Portrait view', async function () {
  const totalValue = await valueCompositionPage.getTotalContractValue();
  expect(totalValue).toMatch(/^\$[\d,]+(\.\d{2})?$/);
  const isFormatCorrect = await valueCompositionPage.isMonetaryFormatCorrect();
  expect(isFormatCorrect).toBeTruthy();
});

When('the user clicks on the total value component', async function () {
  await valueCompositionPage.clickOnTotalValueComponent();
});

Then('the popup displays the breakdown of all applicable items', async function () {
  const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const breakdownItems = await valueCompositionPage.getBreakdownItemsCount();
  expect(breakdownItems).toBeGreaterThan(0);
});

Then('the breakdown list is vertically aligned with the main component', async function () {
  const isVerticallyAligned = await valueCompositionPage.isBreakdownVerticallyAligned();
  expect(isVerticallyAligned).toBeTruthy();
});

When('the user clicks outside the expanded component', async function () {
  await valueCompositionPage.clickOutsidePopup();
});

Then('the popup closes and the system returns to normal view', async function () {
  const isPopupClosed = await valueCompositionPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
  const isNormalViewRestored = await valueCompositionPage.isNormalViewDisplayed();
  expect(isNormalViewRestored).toBeTruthy();
});