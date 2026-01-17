const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage');

let searchPage;

Given('the user is authenticated in Acticenter', async function () {
  searchPage = new SearchPage(this.page);
  await searchPage.navigateToActicenter();
  await searchPage.verifyMainInterfaceIsDisplayed();
});

When('the user clicks on the magnifying glass icon', async function () {
  await searchPage.clickMagnifyingGlassIcon();
});

Then('the system displays the customer general screen', async function () {
  const isDisplayed = await searchPage.isCustomerGeneralScreenDisplayed();
  expect(isDisplayed).toBeTruthy();
});

Then('the customer general screen matches the Advisor Module behavior', async function () {
  const matchesStructure = await searchPage.verifyAdvisorModuleStructure();
  expect(matchesStructure).toBeTruthy();
});

Then('the customer general data is visible including available contracts', async function () {
  const isDataVisible = await searchPage.isCustomerDataVisible();
  const areContractsVisible = await searchPage.areContractsVisible();
  expect(isDataVisible).toBeTruthy();
  expect(areContractsVisible).toBeTruthy();
});

Then('the user can navigate through customer information sections', async function () {
  const canNavigate = await searchPage.verifyNavigationThroughSections();
  expect(canNavigate).toBeTruthy();
});