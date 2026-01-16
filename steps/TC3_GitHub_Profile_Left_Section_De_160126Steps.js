const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfilePage = require('../pages/GitHubProfilePage');

let page;
let gitHubProfilePage;

Given('I navigate to the GitHub Profile Finder application', async function () {
  page = await this.browser.newPage();
  gitHubProfilePage = new GitHubProfilePage(page);
  await gitHubProfilePage.navigateToApp();
  const isLoaded = await gitHubProfilePage.isPageLoaded();
  expect(isLoaded).toBeTruthy();
});

When('I enter a username with complete profile information in the search field', async function () {
  await gitHubProfilePage.enterUsername('sindresorhus');
});

When('I click the search button', async function () {
  await gitHubProfilePage.clickSearchButton();
});

Then('I should see the user avatar displayed correctly', async function () {
  const isAvatarVisible = await gitHubProfilePage.isAvatarVisible();
  expect(isAvatarVisible).toBeTruthy();
  const avatarSrc = await gitHubProfilePage.getAvatarSource();
  expect(avatarSrc).toBeTruthy();
});

Then('I should see the full name and username with at symbol', async function () {
  const fullName = await gitHubProfilePage.getFullName();
  expect(fullName).toBeTruthy();
  const username = await gitHubProfilePage.getUsername();
  expect(username).toContain('@');
});

Then('I should see the user biography', async function () {
  const bio = await gitHubProfilePage.getBiography();
  expect(bio).toBeTruthy();
});

Then('I should see the location and company information', async function () {
  const location = await gitHubProfilePage.getLocation();
  const company = await gitHubProfilePage.getCompany();
  const hasLocationOrCompany = location || company;
  expect(hasLocationOrCompany).toBeTruthy();
});

Then('I should see the personal website link as clickable', async function () {
  const isWebsiteLinkVisible = await gitHubProfilePage.isWebsiteLinkVisible();
  expect(isWebsiteLinkVisible).toBeTruthy();
  const websiteHref = await gitHubProfilePage.getWebsiteLinkHref();
  expect(websiteHref).toBeTruthy();
});

Then('I should see the Follow button', async function () {
  const isFollowButtonVisible = await gitHubProfilePage.isFollowButtonVisible();
  expect(isFollowButtonVisible).toBeTruthy();
});

When('I search for a user with incomplete profile information', async function () {
  await gitHubProfilePage.clearSearchField();
  await gitHubProfilePage.enterUsername('torvalds');
  await gitHubProfilePage.clickSearchButton();
});

Then('I should see empty fields or not available message without interface errors', async function () {
  const hasNoErrors = await gitHubProfilePage.verifyNoInterfaceErrors();
  expect(hasNoErrors).toBeTruthy();
});