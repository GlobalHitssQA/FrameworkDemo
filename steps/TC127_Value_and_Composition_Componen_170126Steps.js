const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user opens Safari browser on macOS', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.verifyBrowserReady();
});

Given('the user navigates to the Acticenter module', async function () {
  await valueCompositionPage.navigateToActicenter();
});

When('the user logs in with valid credentials', async function () {
  await valueCompositionPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
});

When('the user selects a Persona Moral contract with active Mexdolar account', async function () {
  await valueCompositionPage.selectPersonaMoralContract();
});

Then('the value and composition component renders correctly', async function () {
  const isVisible = await valueCompositionPage.isValueCompositionComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the component to display the breakdown popup', async function () {
  await valueCompositionPage.clickValueCompositionComponent();
});

Then('the popup opens showing all items including USD Cash', async function () {
  const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasUsdCash = await valueCompositionPage.isUsdCashItemVisible();
  expect(hasUsdCash).toBeTruthy();
});

Then('the USD Cash item displays the Mexdolar account balance without conversion', async function () {
  const usdCashValue = await valueCompositionPage.getUsdCashValue();
  expect(usdCashValue).not.toBeNull();
  expect(usdCashValue).toMatch(/^\$?[\d,]+\.?\d*\s*USD$/);
});

Then('all CSS styles are applied correctly without visual distortions', async function () {
  const stylesValid = await valueCompositionPage.validateVisualStyles();
  expect(stylesValid).toBeTruthy();
});

When('the user clicks outside the component', async function () {
  await valueCompositionPage.clickOutsidePopup();
});

Then('the popup closes correctly without errors', async function () {
  const isPopupClosed = await valueCompositionPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});