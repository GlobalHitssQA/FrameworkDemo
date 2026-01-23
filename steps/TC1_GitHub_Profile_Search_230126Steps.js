const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfilePage = require('../pages/GitHubProfilePage');

let gitHubProfilePage;

Given('I am on the GitHub search page', async function () {
  gitHubProfilePage = new GitHubProfilePage(this.page);
  await gitHubProfilePage.navigateToSearchPage();
});

When('I enter a valid username in the search field', async function () {
  await gitHubProfilePage.enterUsername('octocat');
});

When('I click the search button', async function () {
  await gitHubProfilePage.clickSearchButton();
});

When('I wait for the search results to load', async function () {
  await gitHubProfilePage.waitForSearchResults();
});

Then('I should see the user profile information displayed', async function () {
  await gitHubProfilePage.clickOnUserProfile();
  await gitHubProfilePage.waitForProfileToLoad();
  const isProfileVisible = await gitHubProfilePage.isProfileVisible();
  expect(isProfileVisible).toBeTruthy();
});

Then('I should see the avatar, full name, username, bio, location, organization, website link and Follow button', async function () {
  const isAvatarVisible = await gitHubProfilePage.isAvatarVisible();
  expect(isAvatarVisible).toBeTruthy();

  const isFullNameVisible = await gitHubProfilePage.isFullNameVisible();
  expect(isFullNameVisible).toBeTruthy();

  const isUsernameVisible = await gitHubProfilePage.isUsernameVisible();
  expect(isUsernameVisible).toBeTruthy();

  const isLocationVisible = await gitHubProfilePage.isLocationVisible();
  expect(isLocationVisible).toBeTruthy();

  const isOrganizationVisible = await gitHubProfilePage.isOrganizationVisible();
  expect(isOrganizationVisible).toBeTruthy();

  const isWebsiteLinkVisible = await gitHubProfilePage.isWebsiteLinkVisible();
  expect(isWebsiteLinkVisible).toBeTruthy();

  const isFollowButtonVisible = await gitHubProfilePage.isFollowButtonVisible();
  expect(isFollowButtonVisible).toBeTruthy();
});