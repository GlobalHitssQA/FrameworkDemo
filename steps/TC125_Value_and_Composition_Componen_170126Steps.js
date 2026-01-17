const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user opens the Acticenter module in the browser', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToActicenter();
});

Given('the user logs in with valid credentials', async function () {
  await valueCompositionPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
  const isMainScreenVisible = await valueCompositionPage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a Casa de Bolsa contract', async function () {
  await valueCompositionPage.selectCasaDeBolsaContract();
});

Then('the value and composition component is rendered correctly', async function () {
  const isComponentVisible = await valueCompositionPage.isValueCompositionComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user clicks on the component to display the breakdown popup', async function () {
  await valueCompositionPage.clickValueCompositionComponent();
});

Then('the popup opens showing all items with correct format', async function () {
  const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const areItemsFormatted = await valueCompositionPage.areBreakdownItemsFormattedCorrectly();
  expect(areItemsFormatted).toBeTruthy();
});

Then('the breakdown is vertically aligned with the main component', async function () {
  const isAligned = await valueCompositionPage.isBreakdownVerticallyAligned();
  expect(isAligned).toBeTruthy();
});

When('the user clicks outside the component', async function () {
  await valueCompositionPage.clickOutsideComponent();
});

Then('the popup closes correctly', async function () {
  const isPopupHidden = await valueCompositionPage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
});

Then('all monetary values are displayed with correct format', async function () {
  await valueCompositionPage.clickValueCompositionComponent();
  const areValuesFormatted = await valueCompositionPage.areMonetaryValuesFormattedCorrectly();
  expect(areValuesFormatted).toBeTruthy();
});