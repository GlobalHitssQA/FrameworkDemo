const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfileSearchPage = require('../pages/GitHubProfileSearchPage');

let gitHubProfileSearchPage;

Given('I am on the GitHub Profile Finder application', async function () {
  gitHubProfileSearchPage = new GitHubProfileSearchPage(this.page);
  await gitHubProfileSearchPage.navigate();
  await gitHubProfileSearchPage.verifyPageLoaded();
});

When('I enter a valid GitHub username {string} in the search field', async function (username) {
  await gitHubProfileSearchPage.enterUsername(username);
});

When('I click the search button with magnifying glass icon', async function () {
  await gitHubProfileSearchPage.clickSearchButton();
});

Then('I should see the user profile information displayed', async function () {
  await gitHubProfileSearchPage.waitForProfileToLoad();
  const isProfileVisible = await gitHubProfileSearchPage.isProfileContainerVisible();
  expect(isProfileVisible).toBe(true);
});

Then('I should see the user avatar image', async function () {
  const isAvatarVisible = await gitHubProfileSearchPage.isAvatarVisible();
  expect(isAvatarVisible).toBe(true);
});

Then('I should see the full name {string}', async function (expectedFullName) {
  const fullName = await gitHubProfileSearchPage.getFullName();
  expect(fullName).toContain(expectedFullName);
});

Then('I should see the username {string}', async function (expectedUsername) {
  const username = await gitHubProfileSearchPage.getUsername();
  expect(username).toContain(expectedUsername);
});