const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage');

let searchPage;

Given('the user is authenticated and accesses Acticenter in Responsive resolution', async function () {
  searchPage = new SearchPage(this.page);
  await searchPage.navigateToActicenter();
  await searchPage.setResponsiveViewport();
  const isLupaVisible = await searchPage.isSearchIconVisible();
  expect(isLupaVisible).toBeTruthy();
});

When('the user clicks on the magnifying glass search icon', async function () {
  await searchPage.clickSearchIcon();
});

Then('the system displays the customer general screen with BP or contracts', async function () {
  const isCustomerScreenVisible = await searchPage.isCustomerGeneralScreenVisible();
  expect(isCustomerScreenVisible).toBeTruthy();
  const hasContracts = await searchPage.hasContractsDisplayed();
  expect(hasContracts).toBeTruthy();
});

When('the user selects a contract from the displayed list', async function () {
  await searchPage.selectFirstContract();
});

Then('the system loads the selected contract and shows the total contract value component in Responsive view', async function () {
  const isContractLoaded = await searchPage.isContractValueComponentVisible();
  expect(isContractLoaded).toBeTruthy();
});