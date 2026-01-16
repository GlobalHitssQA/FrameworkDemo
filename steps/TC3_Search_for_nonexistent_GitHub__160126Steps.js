const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubSearchPage = require('../pages/GitHubSearchPage');

let gitHubSearchPage;

Given('I am on the GitHub search page', async function () {
  gitHubSearchPage = new GitHubSearchPage(this.page);
  await gitHubSearchPage.navigate();
  await gitHubSearchPage.verifySearchComponentIsVisible();
});

When('I enter a non-existent username {string} in the search field', async function (username) {
  await gitHubSearchPage.openSearchDialog();
  await gitHubSearchPage.enterSearchQuery(username);
});

When('I click the search button', async function () {
  await gitHubSearchPage.submitSearch();
});

Then('the system should attempt to query the GitHub API', async function () {
  await gitHubSearchPage.waitForSearchResults();
});

Then('I should see a friendly message indicating no users were found', async function () {
  await gitHubSearchPage.navigateToUsersTab();
  const isErrorMessageVisible = await gitHubSearchPage.isNoUsersFoundMessageVisible();
  expect(isErrorMessageVisible).toBe(true);
  const resultsCount = await gitHubSearchPage.getResultsCount();
  expect(resultsCount).toBe('0 results');
});