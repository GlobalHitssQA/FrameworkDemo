const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user is authenticated and has a contract selected on a tablet device', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToComponent();
  await valueCompositionPage.waitForComponentToLoad();
});

When('the user views the component in landscape orientation', async function () {
  await valueCompositionPage.setTabletLandscapeViewport();
});

Then('the component should be correctly adapted to horizontal orientation', async function () {
  const isDisplayed = await valueCompositionPage.isComponentDisplayedCorrectly();
  expect(isDisplayed).toBe(true);
});

Then('all component elements should be visible and accessible', async function () {
  const areElementsVisible = await valueCompositionPage.areAllElementsVisible();
  expect(areElementsVisible).toBe(true);
});

When('the user rotates the device to portrait orientation', async function () {
  await valueCompositionPage.setTabletPortraitViewport();
});

Then('the component should automatically adapt to vertical orientation', async function () {
  const isAdapted = await valueCompositionPage.isComponentDisplayedCorrectly();
  expect(isAdapted).toBe(true);
});

Then('the breakdown popup should function correctly in both orientations', async function () {
  await valueCompositionPage.setTabletLandscapeViewport();
  await valueCompositionPage.openBreakdownPopup();
  const isPopupVisibleLandscape = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisibleLandscape).toBe(true);
  await valueCompositionPage.closeBreakdownPopup();
  
  await valueCompositionPage.setTabletPortraitViewport();
  await valueCompositionPage.openBreakdownPopup();
  const isPopupVisiblePortrait = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisiblePortrait).toBe(true);
  await valueCompositionPage.closeBreakdownPopup();
});

Then('the client contract search functionality should be available and working', async function () {
  const isSearchVisible = await valueCompositionPage.isSearchFunctionVisible();
  expect(isSearchVisible).toBe(true);
  
  await valueCompositionPage.clickSearchButton();
  const isSearchActive = await valueCompositionPage.isSearchInputActive();
  expect(isSearchActive).toBe(true);
});