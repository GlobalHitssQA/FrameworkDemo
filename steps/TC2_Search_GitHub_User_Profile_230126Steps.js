const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfilePage = require('../pages/GitHubProfilePage');

let profilePage;

Given('the user is on the GitHub homepage', async function () {
  profilePage = new GitHubProfilePage(this.page);
  await profilePage.navigateToHomepage();
});

When('the user navigates to a profile page with username {string}', async function (username) {
  await profilePage.navigateToProfile(username);
});

Then('the user should see the profile avatar', async function () {
  const isVisible = await profilePage.isAvatarVisible();
  expect(isVisible).toBeTruthy();
});

Then('the user should see the full name {string}', async function (fullName) {
  const displayedName = await profilePage.getFullName();
  expect(displayedName).toContain(fullName);
});

Then('the user should see the username {string}', async function (username) {
  const displayedUsername = await profilePage.getUsername();
  expect(displayedUsername).toContain(username);
});

Then('the user should see the followers count', async function () {
  const isVisible = await profilePage.isFollowersLinkVisible();
  expect(isVisible).toBeTruthy();
});

Then('the user should see the following count', async function () {
  const isVisible = await profilePage.isFollowingLinkVisible();
  expect(isVisible).toBeTruthy();
});

Then('the user should see the location {string}', async function (location) {
  const displayedLocation = await profilePage.getLocation();
  expect(displayedLocation).toContain(location);
});

Then('the user should see the organization link', async function () {
  const isVisible = await profilePage.isOrganizationLinkVisible();
  expect(isVisible).toBeTruthy();
});

Then('the user should see the website link', async function () {
  const isVisible = await profilePage.isWebsiteLinkVisible();
  expect(isVisible).toBeTruthy();
});

Then('the user should see the Follow button', async function () {
  const isVisible = await profilePage.isFollowButtonVisible();
  expect(isVisible).toBeTruthy();
});

Then('the user should see the repositories tab with count', async function () {
  const isVisible = await profilePage.isRepositoriesTabVisible();
  expect(isVisible).toBeTruthy();
});