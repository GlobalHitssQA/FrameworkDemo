const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterContractPage = require('../pages/ActicenterContractPage');

let acticenterPage;

Given('the user is authenticated in Acticenter with Banca Patrimonial credentials on a Landscape oriented device', async function () {
  acticenterPage = new ActicenterContractPage(this.page);
  await acticenterPage.setLandscapeViewport();
  await acticenterPage.navigateToActicenter();
  await acticenterPage.authenticateWithBancaPatrimonial();
  const isLoaded = await acticenterPage.isLandscapeInterfaceLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user selects a Banca Patrimonial contract from the query screen', async function () {
  await acticenterPage.selectBancaPatrimonialContract();
});

Then('the system displays the contract with the total value component adapted to Landscape view', async function () {
  const isVisible = await acticenterPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
  const isAdapted = await acticenterPage.isComponentAdaptedToLandscape();
  expect(isAdapted).toBeTruthy();
});

When('the user clicks on the value and composition component to expand the breakdown', async function () {
  await acticenterPage.clickValueCompositionComponent();
});

Then('the system displays the popup with the breakdown of items optimized for Landscape view', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const isOptimized = await acticenterPage.isPopupOptimizedForLandscape();
  expect(isOptimized).toBeTruthy();
});

Then('all applicable Banca Patrimonial items are displayed with correct monetary format and right-aligned values', async function () {
  const hasCorrectFormat = await acticenterPage.verifyMonetaryFormatInBreakdown();
  expect(hasCorrectFormat).toBeTruthy();
  const areValuesRightAligned = await acticenterPage.verifyValuesRightAlignment();
  expect(areValuesRightAligned).toBeTruthy();
  const allItemsDisplayed = await acticenterPage.verifyAllBancaPatrimonialItemsDisplayed();
  expect(allItemsDisplayed).toBeTruthy();
});

When('the user clicks outside the breakdown component to close it', async function () {
  await acticenterPage.clickOutsideBreakdownPopup();
});

Then('the system closes the popup and returns to the main contract view', async function () {
  const isPopupClosed = await acticenterPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
  const isMainViewVisible = await acticenterPage.isMainContractViewVisible();
  expect(isMainViewVisible).toBeTruthy();
});

When('the user uses the search magnifying glass function to search for another client or contract', async function () {
  await acticenterPage.clickSearchMagnifyingGlass();
});

Then('the system presents the search screen and allows selecting the BP or contract to view', async function () {
  const isSearchScreenVisible = await acticenterPage.isSearchScreenVisible();
  expect(isSearchScreenVisible).toBeTruthy();
  const canSelectContract = await acticenterPage.verifyContractSelectionAvailable();
  expect(canSelectContract).toBeTruthy();
});