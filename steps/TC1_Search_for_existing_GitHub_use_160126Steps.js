const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubSearchPage = require('../pages/GitHubSearchPage');

let gitHubSearchPage;

Given('I am on the GitHub profile search component page', async function () {
  gitHubSearchPage = new GitHubSearchPage(this.page);
  await gitHubSearchPage.navigate();
});

Given('the search input and search button with magnifying glass icon are visible', async function () {
  const isSearchInputVisible = await gitHubSearchPage.isSearchInputVisible();
  const isSearchButtonVisible = await gitHubSearchPage.isSearchButtonVisible();
  expect(isSearchInputVisible).toBeTruthy();
  expect(isSearchButtonVisible).toBeTruthy();
});

When('I enter a valid GitHub username {string} in the search input', async function (username) {
  await gitHubSearchPage.enterUsername(username);
});

Then('the entered text {string} is displayed correctly in the input', async function (expectedText) {
  const inputValue = await gitHubSearchPage.getSearchInputValue();
  expect(inputValue).toBe(expectedText);
});

When('I click on the search button with magnifying glass icon', async function () {
  await gitHubSearchPage.clickSearchButton();
});

Then('the system initiates the API request to fetch the user profile', async function () {
  await gitHubSearchPage.waitForProfileToLoad();
});

Then('the user profile is displayed with avatar, full name, username, bio, location, company, web link and Follow button', async function () {
  const isAvatarVisible = await gitHubSearchPage.isAvatarVisible();
  const isFullNameVisible = await gitHubSearchPage.isFullNameVisible();
  const isUsernameVisible = await gitHubSearchPage.isUsernameDisplayVisible();
  const isBioVisible = await gitHubSearchPage.isBioVisible();
  const isLocationVisible = await gitHubSearchPage.isLocationVisible();
  const isCompanyVisible = await gitHubSearchPage.isCompanyVisible();
  const isWebLinkVisible = await gitHubSearchPage.isWebLinkVisible();
  const isFollowButtonVisible = await gitHubSearchPage.isFollowButtonVisible();
  
  expect(isAvatarVisible).toBeTruthy();
  expect(isFullNameVisible).toBeTruthy();
  expect(isUsernameVisible).toBeTruthy();
  expect(isBioVisible).toBeTruthy();
  expect(isLocationVisible).toBeTruthy();
  expect(isCompanyVisible).toBeTruthy();
  expect(isWebLinkVisible).toBeTruthy();
  expect(isFollowButtonVisible).toBeTruthy();
});

Then('the total metrics are displayed showing Repos, Followers, Following and Gists values', async function () {
  const isReposCountVisible = await gitHubSearchPage.isReposCountVisible();
  const isFollowersCountVisible = await gitHubSearchPage.isFollowersCountVisible();
  const isFollowingCountVisible = await gitHubSearchPage.isFollowingCountVisible();
  const isGistsCountVisible = await gitHubSearchPage.isGistsCountVisible();
  
  expect(isReposCountVisible).toBeTruthy();
  expect(isFollowersCountVisible).toBeTruthy();
  expect(isFollowingCountVisible).toBeTruthy();
  expect(isGistsCountVisible).toBeTruthy();
});

Then('the Requests indicator is updated showing the current count over the total limit', async function () {
  const isRequestsIndicatorVisible = await gitHubSearchPage.isRequestsIndicatorVisible();
  const requestsText = await gitHubSearchPage.getRequestsIndicatorText();
  
  expect(isRequestsIndicatorVisible).toBeTruthy();
  expect(requestsText).toMatch(/\d+\/\d+/);
});