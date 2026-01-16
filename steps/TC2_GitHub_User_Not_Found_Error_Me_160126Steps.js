const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubSearchPage = require('../pages/GitHubSearchPage');

let gitHubSearchPage;

Given('I am on the GitHub search page', async function () {
  gitHubSearchPage = new GitHubSearchPage(this.page);
  await gitHubSearchPage.navigateToSearchPage();
});

Given('the search input and search button are visible', async function () {
  const isSearchInputVisible = await gitHubSearchPage.isSearchInputVisible();
  expect(isSearchInputVisible).toBeTruthy();
});

When('I enter a non-existent username {string} in the search field', async function (username) {
  await gitHubSearchPage.enterSearchQuery(username);
});

When('I click the search button', async function () {
  await gitHubSearchPage.submitSearch();
});

When('I filter results by users', async function () {
  await gitHubSearchPage.clickUsersFilter();
});

Then('I should see a message indicating no users were found', async function () {
  const noResultsMessage = await gitHubSearchPage.getNoResultsMessage();
  expect(noResultsMessage).toContain('Your search did not match any users');
  
  const resultsCount = await gitHubSearchPage.getResultsCount();
  expect(resultsCount).toBe('0 results');
});

Then('I should not see any user profile data', async function () {
  const hasUserProfileData = await gitHubSearchPage.hasUserProfileData();
  expect(hasUserProfileData).toBeFalsy();
});