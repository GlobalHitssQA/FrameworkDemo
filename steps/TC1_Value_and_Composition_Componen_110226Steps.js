const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user is authenticated in Acticenter with an active contract selected', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToActicenter();
  await valueCompositionPage.authenticateUser();
  await valueCompositionPage.selectActiveContract();
});

Given('the value and composition component is visible in its initial closed state', async function () {
  const isVisible = await valueCompositionPage.isValueCompositionComponentVisible();
  expect(isVisible).toBeTruthy();
  const isPopupClosed = await valueCompositionPage.isPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});

When('the user clicks on the value and composition component', async function () {
  await valueCompositionPage.clickValueCompositionComponent();
});

Then('the system displays the popup with the detailed contract composition breakdown', async function () {
  const isPopupVisible = await valueCompositionPage.isCompositionPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasBreakdownItems = await valueCompositionPage.hasBreakdownItems();
  expect(hasBreakdownItems).toBeTruthy();
});

When('the user interacts within the popup', async function () {
  await valueCompositionPage.interactWithPopupContent();
});

Then('the popup remains open and all breakdown items are visible', async function () {
  const isPopupVisible = await valueCompositionPage.isCompositionPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const areAllItemsVisible = await valueCompositionPage.areAllBreakdownItemsVisible();
  expect(areAllItemsVisible).toBeTruthy();
});

When('the user clicks outside the composition component', async function () {
  await valueCompositionPage.clickOutsideComponent();
});

Then('the system closes the popup and returns to the initial component state', async function () {
  const isPopupClosed = await valueCompositionPage.isPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});

When('the user clicks on the value and composition component again', async function () {
  await valueCompositionPage.clickValueCompositionComponent();
});

Then('the system displays the popup with the updated composition breakdown', async function () {
  const isPopupVisible = await valueCompositionPage.isCompositionPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasBreakdownItems = await valueCompositionPage.hasBreakdownItems();
  expect(hasBreakdownItems).toBeTruthy();
});