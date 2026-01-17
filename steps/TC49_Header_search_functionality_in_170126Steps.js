const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterSearchPage = require('../pages/ActicenterSearchPage');

let acticenterSearchPage;

Given('the user is authenticated and on Acticenter desktop version', async function () {
  acticenterSearchPage = new ActicenterSearchPage(this.page);
  await acticenterSearchPage.navigateToActicenter();
  await acticenterSearchPage.verifyDesktopInterfaceIsVisible();
});

When('the user locates the search function in the header', async function () {
  const isSearchVisible = await acticenterSearchPage.isHeaderSearchVisible();
  expect(isSearchVisible).toBeTruthy();
});

When('the user enters search criteria in the header search field', async function () {
  await acticenterSearchPage.enterSearchCriteria('12345');
});

When('the user executes the search from the header', async function () {
  await acticenterSearchPage.executeSearch();
});

When('the user selects a result from the search', async function () {
  await acticenterSearchPage.selectFirstSearchResult();
});

Then('the system loads the selected client or contract information', async function () {
  const isClientInfoVisible = await acticenterSearchPage.isClientContractInfoVisible();
  expect(isClientInfoVisible).toBeTruthy();
});

Then('the search functionality is consistent across all Acticenter screens', async function () {
  const isSearchConsistent = await acticenterSearchPage.verifySearchConsistency();
  expect(isSearchConsistent).toBeTruthy();
});