const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PRResponsivePage = require('../pages/PRResponsivePage');

let prResponsivePage;

Given('I have access to the PR Responsive application', async function () {
  prResponsivePage = new PRResponsivePage(this.page);
  await prResponsivePage.navigateToApplication();
});

When('I view the component in landscape mode', async function () {
  await prResponsivePage.setLandscapeOrientation();
});

Then('the component should adapt correctly to horizontal orientation', async function () {
  const isAdapted = await prResponsivePage.isComponentAdaptedToLandscape();
  expect(isAdapted).toBeTruthy();
});

When('I view the component in portrait mode', async function () {
  await prResponsivePage.setPortraitOrientation();
});

Then('the component should adapt correctly to vertical orientation', async function () {
  const isAdapted = await prResponsivePage.isComponentAdaptedToPortrait();
  expect(isAdapted).toBeTruthy();
});

Then('the header with client and contract search should display correctly', async function () {
  const isHeaderVisible = await prResponsivePage.isSearchHeaderVisible();
  const isSearchIconVisible = await prResponsivePage.isSearchIconVisible();
  expect(isHeaderVisible).toBeTruthy();
  expect(isSearchIconVisible).toBeTruthy();
});

When('I open the breakdown popup', async function () {
  await prResponsivePage.clickContractValueComponent();
  await prResponsivePage.waitForBreakdownPopup();
});

When('I tap outside the popup component', async function () {
  await prResponsivePage.tapOutsidePopup();
});

Then('the popup should close correctly', async function () {
  const isPopupClosed = await prResponsivePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});

Then('all breakdown items should be visible and legible in both orientations', async function () {
  await prResponsivePage.clickContractValueComponent();
  await prResponsivePage.waitForBreakdownPopup();
  
  const areItemsVisiblePortrait = await prResponsivePage.areBreakdownItemsVisible();
  expect(areItemsVisiblePortrait).toBeTruthy();
  
  await prResponsivePage.tapOutsidePopup();
  await prResponsivePage.setLandscapeOrientation();
  await prResponsivePage.clickContractValueComponent();
  await prResponsivePage.waitForBreakdownPopup();
  
  const areItemsVisibleLandscape = await prResponsivePage.areBreakdownItemsVisible();
  expect(areItemsVisibleLandscape).toBeTruthy();
});