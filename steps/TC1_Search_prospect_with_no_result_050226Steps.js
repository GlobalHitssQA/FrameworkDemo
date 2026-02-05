const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProspectSearchPage = require('../pages/ProspectSearchPage');

let prospectSearchPage;

Given('the advisor user is authenticated and on the Acticenter dashboard', async function () {
  prospectSearchPage = new ProspectSearchPage(this.page);
  await prospectSearchPage.navigateToDashboard();
  const isDashboardVisible = await prospectSearchPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
});

When('the user selects the prospect search option', async function () {
  await prospectSearchPage.selectProspectSearchOption();
  const isSearchFieldVisible = await prospectSearchPage.isSearchFieldVisible();
  expect(isSearchFieldVisible).toBeTruthy();
});

When('the user enters a non-existent name or email in the search field', async function () {
  const nonExistentSearchTerm = 'nonexistent_user_12345@invalid.test';
  await prospectSearchPage.enterSearchTerm(nonExistentSearchTerm);
});

When('the user executes the search', async function () {
  await prospectSearchPage.clickSearchButton();
  await prospectSearchPage.waitForSearchResults();
});

Then('the system displays a message indicating no results were found', async function () {
  const noResultsMessage = await prospectSearchPage.getNoResultsMessage();
  expect(noResultsMessage).toBeTruthy();
  expect(noResultsMessage.toLowerCase()).toContain('no');
});

Then('the user remains on the Acticenter dashboard', async function () {
  const isDashboardVisible = await prospectSearchPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
});

Then('the user can perform a new search', async function () {
  const isSearchFieldEnabled = await prospectSearchPage.isSearchFieldEnabled();
  expect(isSearchFieldEnabled).toBeTruthy();
});