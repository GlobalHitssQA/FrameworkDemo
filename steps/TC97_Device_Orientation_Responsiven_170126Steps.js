const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractComponentPage = require('../pages/ContractComponentPage');

let contractPage;

Given('the user is authenticated in Acticenter on a mobile device in landscape orientation', async function () {
  contractPage = new ContractComponentPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.setViewportLandscape();
  await contractPage.waitForAuthentication();
});

Given('an active contract is selected', async function () {
  await contractPage.selectActiveContract();
});

When('the user views the contract value and composition component in landscape', async function () {
  await contractPage.waitForContractComponentVisible();
});

Then('the component should display adapted to horizontal orientation', async function () {
  const isAdaptedLandscape = await contractPage.isComponentAdaptedToLandscape();
  expect(isAdaptedLandscape).toBe(true);
});

When('the user clicks on the component to expand the breakdown', async function () {
  await contractPage.clickContractComponent();
});

Then('the popup should display correctly with all items visible in landscape orientation', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  const areAllItemsVisible = await contractPage.areAllBreakdownItemsVisible();
  expect(areAllItemsVisible).toBe(true);
});

When('the user changes the device orientation to portrait', async function () {
  await contractPage.setViewportPortrait();
});

Then('the component and breakdown should reorganize automatically for vertical orientation', async function () {
  const isAdaptedPortrait = await contractPage.isComponentAdaptedToPortrait();
  expect(isAdaptedPortrait).toBe(true);
  const isPopupReorganized = await contractPage.isBreakdownPopupReorganizedForPortrait();
  expect(isPopupReorganized).toBe(true);
});

Then('all elements should be readable and accessible in the new orientation', async function () {
  const areElementsAccessible = await contractPage.areAllElementsAccessibleInPortrait();
  expect(areElementsAccessible).toBe(true);
});

Then('text monetary values and interactive elements should display correctly with appropriate spacing', async function () {
  const isTextReadable = await contractPage.isTextReadableInPortrait();
  expect(isTextReadable).toBe(true);
  const areValuesDisplayedCorrectly = await contractPage.areMonetaryValuesDisplayedCorrectly();
  expect(areValuesDisplayedCorrectly).toBe(true);
  const isSpacingAppropriate = await contractPage.isSpacingAppropriateForPortrait();
  expect(isSpacingAppropriate).toBe(true);
});