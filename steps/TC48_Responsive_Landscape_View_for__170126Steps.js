const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractCompositionPage = require('../pages/ContractCompositionPage');

let contractPage;

Given('the user is authenticated in Acticenter system', async function () {
  contractPage = new ContractCompositionPage(this.page);
  await contractPage.navigateToLogin();
  await contractPage.performLogin();
});

Given('the browser is configured in Responsive Landscape mode', async function () {
  await contractPage.setLandscapeViewport();
});

When('the user accesses the Acticenter system', async function () {
  await contractPage.navigateToDashboard();
});

Then('the system loads correctly in Responsive Landscape view', async function () {
  const isLoaded = await contractPage.isDashboardLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user selects a contract to view', async function () {
  await contractPage.selectFirstAvailableContract();
});

Then('the value and composition component is displayed adapted to Responsive Landscape view', async function () {
  const isComponentVisible = await contractPage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
  const isAdapted = await contractPage.isComponentAdaptedToLandscape();
  expect(isAdapted).toBeTruthy();
});

When('the user verifies the search function with magnifying glass icon', async function () {
  await contractPage.verifySearchIconPresence();
});

Then('the search function is available and displays the general client screen when pressed', async function () {
  const isSearchVisible = await contractPage.isSearchIconVisible();
  expect(isSearchVisible).toBeTruthy();
  await contractPage.clickSearchIcon();
  const isClientScreenDisplayed = await contractPage.isGeneralClientScreenDisplayed();
  expect(isClientScreenDisplayed).toBeTruthy();
  await contractPage.closeClientScreen();
});

When('the user clicks on the component to expand the breakdown', async function () {
  await contractPage.clickContractValueComponent();
});

Then('the popup with breakdown displays correctly adapted to Landscape view', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const isPopupAdapted = await contractPage.isBreakdownAdaptedToLandscape();
  expect(isPopupAdapted).toBeTruthy();
});

Then('all breakdown items are visible and legible', async function () {
  const areItemsVisible = await contractPage.areAllBreakdownItemsVisible();
  expect(areItemsVisible).toBeTruthy();
});

Then('all items are correctly formatted in Landscape view', async function () {
  const areItemsFormatted = await contractPage.areBreakdownItemsFormattedCorrectly();
  expect(areItemsFormatted).toBeTruthy();
});

When('the user clicks outside the expanded component', async function () {
  await contractPage.clickOutsideBreakdown();
});

Then('the breakdown closes correctly', async function () {
  const isPopupClosed = await contractPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});