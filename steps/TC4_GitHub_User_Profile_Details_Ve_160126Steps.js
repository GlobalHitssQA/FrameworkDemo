const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfilePage = require('../pages/GitHubProfilePage');

let profilePage;

Given('I am on the GitHub profile search page', async function () {
  profilePage = new GitHubProfilePage(this.page);
  await profilePage.navigate();
});

When('I search for a user with complete profile information', async function () {
  await profilePage.searchUser('torvalds');
});

Then('I should see the left section with profile details', async function () {
  const isVisible = await profilePage.isProfileSectionVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see the user avatar image', async function () {
  const isVisible = await profilePage.isAvatarVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see the full name and username with @ format', async function () {
  const fullName = await profilePage.getFullName();
  const username = await profilePage.getUsername();
  expect(fullName).toBeTruthy();
  expect(username).toContain('@');
});

Then('I should see the user biography', async function () {
  const biography = await profilePage.getBiography();
  expect(biography).toBeTruthy();
});

Then('I should see the location and company information', async function () {
  const location = await profilePage.getLocation();
  const company = await profilePage.getCompany();
  expect(location || company).toBeTruthy();
});

Then('I should see the web link', async function () {
  const webLink = await profilePage.getWebLink();
  expect(webLink).toBeTruthy();
});

Then('I should see the Follow button', async function () {
  const isVisible = await profilePage.isFollowButtonVisible();
  expect(isVisible).toBeTruthy();
});

When('I search for a user with incomplete profile information', async function () {
  await profilePage.searchUser('ghost');
});

Then('I should see empty fields or not available message for missing data', async function () {
  const hasEmptyOrNotAvailable = await profilePage.hasEmptyOrNotAvailableFields();
  expect(hasEmptyOrNotAvailable).toBeTruthy();
});