const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with an active contract', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.login();
  await contractValuePage.waitForDashboardToLoad();
});

When('the user accesses Acticenter from a desktop resolution of {int}x{int}', async function (width, height) {
  await contractValuePage.setViewportSize(width, height);
  await contractValuePage.refreshPage();
});

Then('the component should display with the complete desktop design', async function () {
  const isDesktopLayoutVisible = await contractValuePage.isDesktopLayoutVisible();
  expect(isDesktopLayoutVisible).toBeTruthy();
  const isContractValueComponentVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isContractValueComponentVisible).toBeTruthy();
});

When('the user accesses from a tablet resolution of {int}x{int}', async function (width, height) {
  await contractValuePage.setViewportSize(width, height);
  await contractValuePage.refreshPage();
});

Then('the component should adapt to tablet size with all elements visible and functional', async function () {
  const isTabletLayoutVisible = await contractValuePage.isTabletLayoutVisible();
  expect(isTabletLayoutVisible).toBeTruthy();
  const areAllElementsVisible = await contractValuePage.areAllComponentElementsVisible();
  expect(areAllElementsVisible).toBeTruthy();
});

When('the user accesses from a mobile resolution of {int}x{int}', async function (width, height) {
  await contractValuePage.setViewportSize(width, height);
  await contractValuePage.refreshPage();
});

Then('the component should adapt to mobile size with appropriate responsive adjustments', async function () {
  const isMobileLayoutVisible = await contractValuePage.isMobileLayoutVisible();
  expect(isMobileLayoutVisible).toBeTruthy();
  const isComponentResponsive = await contractValuePage.isComponentResponsiveForMobile();
  expect(isComponentResponsive).toBeTruthy();
});

Then('the user expands the breakdown section at each resolution', async function () {
  await contractValuePage.clickOnContractValueComponent();
  await contractValuePage.waitForBreakdownPopupToAppear();
});

Then('the breakdown list should be legible and navigable with functional scroll if needed', async function () {
  const isBreakdownListVisible = await contractValuePage.isBreakdownListVisible();
  expect(isBreakdownListVisible).toBeTruthy();
  const isBreakdownScrollable = await contractValuePage.isBreakdownScrollFunctional();
  expect(isBreakdownScrollable).toBeTruthy();
  const areBreakdownItemsLegible = await contractValuePage.areBreakdownItemsLegible();
  expect(areBreakdownItemsLegible).toBeTruthy();
  await contractValuePage.closeBreakdownPopup();
});

Then('the monetary values should maintain correct format with thousands separators and currency symbols at all resolutions', async function () {
  const areMonetaryValuesFormatted = await contractValuePage.areMonetaryValuesCorrectlyFormatted();
  expect(areMonetaryValuesFormatted).toBeTruthy();
});