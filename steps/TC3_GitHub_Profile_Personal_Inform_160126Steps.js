const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfilePage = require('../pages/GitHubProfilePage');

let profilePage;

Given('the user navigates to the GitHub profile search application', async function() {
  profilePage = new GitHubProfilePage(this.page);
  await profilePage.navigate();
});

When('the user searches for a GitHub user with complete profile information', async function() {
  await profilePage.searchUser('sindresorhus');
});

Then('the user avatar should be displayed in the left section', async function() {
  const isAvatarVisible = await profilePage.isAvatarVisible();
  expect(isAvatarVisible).toBeTruthy();
});

Then('the full name and username should be displayed correctly', async function() {
  const fullName = await profilePage.getFullName();
  const username = await profilePage.getUsername();
  expect(fullName).toBeTruthy();
  expect(username).toBeTruthy();
  expect(username).toContain('sindresorhus');
});

Then('the biography should be displayed in the profile section', async function() {
  const biography = await profilePage.getBiography();
  expect(biography).toBeTruthy();
});

Then('the location and company should be displayed correctly', async function() {
  const hasLocationOrCompany = await profilePage.hasLocationOrCompany();
  expect(hasLocationOrCompany).toBeTruthy();
});

Then('the web link should be displayed and clickable', async function() {
  const isWebLinkVisible = await profilePage.isWebLinkVisible();
  const webLinkHref = await profilePage.getWebLinkHref();
  expect(isWebLinkVisible).toBeTruthy();
  expect(webLinkHref).toBeTruthy();
});

Then('the Follow button should be visible and functional', async function() {
  const isFollowButtonVisible = await profilePage.isFollowButtonVisible();
  expect(isFollowButtonVisible).toBeTruthy();
});

Then('empty fields should display appropriate empty state or not available message', async function() {
  const handlesEmptyFields = await profilePage.validateEmptyFieldsHandling();
  expect(handlesEmptyFields).toBeTruthy();
});