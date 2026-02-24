const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProspectSearchPage = require('../pages/ProspectSearchPage');

let prospectSearchPage;

Given('I am authenticated as an advisor in Acticenter dashboard', async function () {
  prospectSearchPage = new ProspectSearchPage(this.page);
  await prospectSearchPage.navigateToDashboard();
  await prospectSearchPage.verifyDashboardIsDisplayed();
  await prospectSearchPage.verifySearchFieldIsAvailable();
});

When('I click on the prospect search field', async function () {
  await prospectSearchPage.clickSearchField();
});

Then('I should see the last 5 searches with prospect name and email', async function () {
  const recentSearches = await prospectSearchPage.getRecentSearchesCount();
  expect(recentSearches).toBeLessThanOrEqual(5);
  await prospectSearchPage.verifyRecentSearchesHaveNameAndEmail();
});

When('I enter exactly 2 characters in the search field', async function () {
  await prospectSearchPage.enterSearchText('Ab');
});

Then('the system should not execute the search and show no results', async function () {
  const resultsVisible = await prospectSearchPage.areSearchResultsVisible();
  expect(resultsVisible).toBe(false);
});

When('I enter a third character to complete 3 characters', async function () {
  await prospectSearchPage.enterSearchText('Abc');
});

Then('the system should automatically execute the search', async function () {
  await prospectSearchPage.waitForSearchResults();
  const resultsVisible = await prospectSearchPage.areSearchResultsVisible();
  expect(resultsVisible).toBe(true);
});

Then('I should see the first 5 matching prospects with name and email highlighted', async function () {
  const resultsCount = await prospectSearchPage.getSearchResultsCount();
  expect(resultsCount).toBeLessThanOrEqual(5);
  expect(resultsCount).toBeGreaterThan(0);
  await prospectSearchPage.verifyResultsHaveHighlightedMatches();
  await prospectSearchPage.verifyResultsDisplayNameAndEmail();
});