const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user is authenticated and has a contract selected', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToComponent();
});

When('the user accesses the component on a mobile device in portrait orientation', async function () {
  await valueCompositionPage.setViewportToMobilePortrait();
});

Then('the component should be displayed correctly adapted to vertical mobile screen', async function () {
  const isVisible = await valueCompositionPage.isValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the component elements should be reorganized appropriately for small screens without horizontal scroll', async function () {
  const hasNoHorizontalScroll = await valueCompositionPage.verifyNoHorizontalScroll();
  expect(hasNoHorizontalScroll).toBeTruthy();
  const elementsOptimized = await valueCompositionPage.verifyElementsOptimizedForMobile();
  expect(elementsOptimized).toBeTruthy();
});

When('the user rotates the device to landscape orientation', async function () {
  await valueCompositionPage.setViewportToMobileLandscape();
});

Then('the component should automatically adapt to horizontal orientation', async function () {
  const isAdapted = await valueCompositionPage.isComponentAdaptedToLandscape();
  expect(isAdapted).toBeTruthy();
});

When('the user opens the breakdown popup in portrait orientation', async function () {
  await valueCompositionPage.setViewportToMobilePortrait();
  await valueCompositionPage.openBreakdownPopup();
});

Then('the popup should be displayed correctly within the screen bounds', async function () {
  const isWithinBounds = await valueCompositionPage.isPopupWithinScreenBounds();
  expect(isWithinBounds).toBeTruthy();
});

When('the user opens the breakdown popup in landscape orientation', async function () {
  await valueCompositionPage.closeBreakdownPopup();
  await valueCompositionPage.setViewportToMobileLandscape();
  await valueCompositionPage.openBreakdownPopup();
});

Then('the popup should adjust to mobile screen size in landscape orientation', async function () {
  const isAdjusted = await valueCompositionPage.isPopupAdjustedForLandscape();
  expect(isAdjusted).toBeTruthy();
});

Then('the user should be able to open the popup by tapping the component', async function () {
  await valueCompositionPage.closeBreakdownPopup();
  await valueCompositionPage.tapValueComponent();
  const isPopupOpen = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupOpen).toBeTruthy();
});

Then('the user should be able to close the popup by tapping outside of it', async function () {
  await valueCompositionPage.tapOutsidePopup();
  const isPopupClosed = await valueCompositionPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});