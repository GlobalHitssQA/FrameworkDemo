const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('a user is authenticated with Private Banking profile in Acticenter', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToActicenter();
  await valueCompositionPage.loginWithPrivateBankingProfile();
});

Given('a Private Banking Individual contract is available', async function () {
  const isAvailable = await valueCompositionPage.verifyIndividualContractAvailable();
  expect(isAvailable).toBeTruthy();
});

When('the user selects a Private Banking Individual contract from the contract selector', async function () {
  await valueCompositionPage.openContractSelector();
  await valueCompositionPage.selectPrivateBankingIndividualContract();
});

Then('the system loads the Private Banking Individual contract correctly', async function () {
  const isLoaded = await valueCompositionPage.verifyContractLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('the total contract value component is visible on screen', async function () {
  const isVisible = await valueCompositionPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await valueCompositionPage.clickTotalValueComponent();
});

Then('the system displays the popup with the complete contract value breakdown', async function () {
  const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('all applicable items for Private Banking Individual are shown in the breakdown', async function () {
  const itemsDisplayed = await valueCompositionPage.verifyPrivateBankingIndividualItemsDisplayed();
  expect(itemsDisplayed).toBeTruthy();
});

Then('each item displays its monetary value aligned to the right', async function () {
  const valuesAligned = await valueCompositionPage.verifyMonetaryValuesAlignedRight();
  expect(valuesAligned).toBeTruthy();
});

Then('items without value display zero pesos format', async function () {
  const zeroValuesFormatted = await valueCompositionPage.verifyZeroValuesFormatted();
  expect(zeroValuesFormatted).toBeTruthy();
});

When('the user clicks outside the breakdown popup', async function () {
  await valueCompositionPage.clickOutsidePopup();
});

Then('the popup closes and returns to the main component view', async function () {
  const isPopupClosed = await valueCompositionPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
  const isMainViewVisible = await valueCompositionPage.isTotalValueComponentVisible();
  expect(isMainViewVisible).toBeTruthy();
});