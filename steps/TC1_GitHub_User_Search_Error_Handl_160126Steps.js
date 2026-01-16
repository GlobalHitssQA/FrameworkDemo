const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubSearchPage = require('../pages/GitHubSearchPage');

let githubSearchPage;

Given('I am on the GitHub search page', async function () {
  githubSearchPage = new GitHubSearchPage(this.page);
  await githubSearchPage.navigate();
});

When('I enter a non-existent username {string} in the search field', async function (username) {
  await githubSearchPage.enterSearchQuery(username);
});

When('I submit the search', async function () {
  await githubSearchPage.submitSearch();
});

When('I filter results by users', async function () {
  await githubSearchPage.clickUsersFilter();
});

Then('I should see a message indicating no users were found', async function () {
  const isVisible = await githubSearchPage.isNoUsersFoundMessageVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see zero results displayed', async function () {
  const resultsText = await githubSearchPage.getResultsCountText();
  expect(resultsText).toContain('0 results');
});

Then('no profile information should be visible', async function () {
  const hasProfileData = await githubSearchPage.isProfileDataVisible();
  expect(hasProfileData).toBeFalsy();
});