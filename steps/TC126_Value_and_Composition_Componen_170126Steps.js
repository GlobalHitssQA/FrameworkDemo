const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user opens Mozilla Firefox browser', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.verifyBrowserIsOpen();
});

Given('the user navigates to the Acticenter module', async function () {
  await valueCompositionPage.navigateToActicenter();
});

When('the user logs in with valid credentials', async function () {
  await valueCompositionPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
});

When('the user selects a Bank Individual Person contract', async function () {
  await valueCompositionPage.selectBankIndividualContract();
});

Then('the value and composition component renders correctly', async function () {
  const isVisible = await valueCompositionPage.isValueCompositionComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the component to display the breakdown popup', async function () {
  await valueCompositionPage.clickValueCompositionComponent();
});

Then('the popup opens showing all applicable bank contract items', async function () {
  const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the bank specific items Efectivo MXN and Efectivo USD for Mexdolar are displayed correctly', async function () {
  const isMxnVisible = await valueCompositionPage.isEfectivoMxnVisible();
  const isUsdVisible = await valueCompositionPage.isEfectivoUsdVisible();
  expect(isMxnVisible).toBeTruthy();
  expect(isUsdVisible).toBeTruthy();
});

When('the user clicks outside the component to close the popup', async function () {
  await valueCompositionPage.clickOutsidePopup();
});

Then('the popup closes correctly', async function () {
  const isPopupHidden = await valueCompositionPage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
});

Then('no Firefox compatibility console errors are present', async function () {
  const consoleErrors = await valueCompositionPage.getConsoleErrors();
  expect(consoleErrors.length).toBe(0);
});