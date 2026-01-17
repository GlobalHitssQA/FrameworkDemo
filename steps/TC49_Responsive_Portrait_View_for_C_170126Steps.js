const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractCompositionPage = require('../pages/ContractCompositionPage');

let contractPage;

Given('the user is authenticated in Acticenter system', async function () {
  contractPage = new ContractCompositionPage(this.page);
  await contractPage.navigateToLogin();
  await contractPage.performLogin();
});

Given('the browser is configured in Responsive Portrait mode', async function () {
  await contractPage.setPortraitViewport();
});

When('the user accesses the Acticenter system', async function () {
  await contractPage.navigateToDashboard();
});

Then('the system loads correctly in Responsive Portrait view', async function () {
  const isLoaded = await contractPage.isDashboardLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user selects a contract to view', async function () {
  await contractPage.selectFirstAvailableContract();
});

Then('the value and composition component is displayed adapted to Portrait view', async function () {
  const isVisible = await contractPage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
  const isAdapted = await contractPage.isComponentAdaptedToPortrait();
  expect(isAdapted).toBeTruthy();
});

Then('the search function with magnifying glass icon is available', async function () {
  const isSearchVisible = await contractPage.isSearchIconVisible();
  expect(isSearchVisible).toBeTruthy();
  const isSearchFunctional = await contractPage.isSearchFunctional();
  expect(isSearchFunctional).toBeTruthy();
});

When('the user clicks on the component to expand the breakdown', async function () {
  await contractPage.clickContractValueComponent();
});

Then('the popup with breakdown details displays correctly adapted to Portrait view', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const isPopupAdapted = await contractPage.isPopupAdaptedToPortrait();
  expect(isPopupAdapted).toBeTruthy();
});

Then('all breakdown items are accessible via scroll if necessary', async function () {
  const areItemsAccessible = await contractPage.areAllBreakdownItemsAccessible();
  expect(areItemsAccessible).toBeTruthy();
});

Then('the breakdown list maintains correct vertical alignment with the total value component', async function () {
  const isAligned = await contractPage.isBreakdownListVerticallyAligned();
  expect(isAligned).toBeTruthy();
});