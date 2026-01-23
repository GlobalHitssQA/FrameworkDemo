const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfilePage = require('../pages/GitHubProfilePage');

let gitHubProfilePage;

Given('I access the GitHub profile search component', async function () {
  gitHubProfilePage = new GitHubProfilePage(this.page);
  await gitHubProfilePage.navigate();
});

Given('the search input and search button are enabled', async function () {
  const isSearchInputVisible = await gitHubProfilePage.isSearchInputVisible();
  expect(isSearchInputVisible).toBe(true);
});

When('I enter a valid GitHub username in the search field', async function () {
  await gitHubProfilePage.enterUsername('octocat');
});

Then('the entered text is displayed correctly in the input', async function () {
  const inputValue = await gitHubProfilePage.getSearchInputValue();
  expect(inputValue).toBe('octocat');
});

When('I click the search button', async function () {
  await gitHubProfilePage.submitSearch();
});

Then('the system queries the GitHub API', async function () {
  await gitHubProfilePage.waitForSearchResults();
});

Then('the system loads and displays the user profile information', async function () {
  await gitHubProfilePage.clickOnUserProfile('octocat');
  await gitHubProfilePage.waitForProfileToLoad();
});

Then('I should see the user avatar', async function () {
  const isAvatarVisible = await gitHubProfilePage.isAvatarVisible();
  expect(isAvatarVisible).toBe(true);
});

Then('I should see the full name and username', async function () {
  const fullName = await gitHubProfilePage.getFullName();
  const username = await gitHubProfilePage.getUsername();
  expect(fullName).toBeTruthy();
  expect(username).toBeTruthy();
});

Then('I should see the followers and following counts', async function () {
  const isFollowersVisible = await gitHubProfilePage.isFollowersCountVisible();
  const isFollowingVisible = await gitHubProfilePage.isFollowingCountVisible();
  expect(isFollowersVisible).toBe(true);
  expect(isFollowingVisible).toBe(true);
});

Then('I should see the location and organization', async function () {
  const isLocationVisible = await gitHubProfilePage.isLocationVisible();
  const isOrganizationVisible = await gitHubProfilePage.isOrganizationVisible();
  expect(isLocationVisible).toBe(true);
  expect(isOrganizationVisible).toBe(true);
});

Then('I should see the website link', async function () {
  const isWebsiteLinkVisible = await gitHubProfilePage.isWebsiteLinkVisible();
  expect(isWebsiteLinkVisible).toBe(true);
});

Then('I should see the Follow button', async function () {
  const isFollowButtonVisible = await gitHubProfilePage.isFollowButtonVisible();
  expect(isFollowButtonVisible).toBe(true);
});