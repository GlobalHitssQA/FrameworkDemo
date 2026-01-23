const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfileSearchPage = require('../pages/GitHubProfileSearchPage');

let gitHubProfileSearchPage;

Given('I am on the GitHub profile search component', async function () {
  gitHubProfileSearchPage = new GitHubProfileSearchPage(this.page);
  await gitHubProfileSearchPage.navigate();
});

Given('the search input and search button are enabled', async function () {
  const isInputEnabled = await gitHubProfileSearchPage.isSearchInputEnabled();
  const isButtonEnabled = await gitHubProfileSearchPage.isSearchButtonEnabled();
  expect(isInputEnabled).toBeTruthy();
  expect(isButtonEnabled).toBeTruthy();
});

When('I enter a valid GitHub username in the search field', async function () {
  await gitHubProfileSearchPage.enterUsername('octocat');
});

When('I click the search button', async function () {
  await gitHubProfileSearchPage.clickSearchButton();
});

When('I wait for the API response', async function () {
  await gitHubProfileSearchPage.waitForProfileToLoad();
});

Then('I should see the user profile information displayed', async function () {
  const isProfileVisible = await gitHubProfileSearchPage.isProfileSectionVisible();
  expect(isProfileVisible).toBeTruthy();
});

Then('I should see the avatar, full name, username, bio, location, company, website link and follow button', async function () {
  const isAvatarVisible = await gitHubProfileSearchPage.isAvatarVisible();
  const isFullNameVisible = await gitHubProfileSearchPage.isFullNameVisible();
  const isUsernameVisible = await gitHubProfileSearchPage.isUsernameVisible();
  const isBioVisible = await gitHubProfileSearchPage.isBioVisible();
  const isLocationVisible = await gitHubProfileSearchPage.isLocationVisible();
  const isCompanyVisible = await gitHubProfileSearchPage.isCompanyVisible();
  const isWebsiteLinkVisible = await gitHubProfileSearchPage.isWebsiteLinkVisible();
  const isFollowButtonVisible = await gitHubProfileSearchPage.isFollowButtonVisible();
  
  expect(isAvatarVisible).toBeTruthy();
  expect(isFullNameVisible).toBeTruthy();
  expect(isUsernameVisible).toBeTruthy();
  expect(isBioVisible).toBeTruthy();
  expect(isLocationVisible).toBeTruthy();
  expect(isCompanyVisible).toBeTruthy();
  expect(isWebsiteLinkVisible).toBeTruthy();
  expect(isFollowButtonVisible).toBeTruthy();
});