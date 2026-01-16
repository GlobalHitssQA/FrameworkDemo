const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfilePage = require('../pages/GitHubProfilePage');

let gitHubProfilePage;

Given('I am on the GitHub profile finder application', async function () {
  gitHubProfilePage = new GitHubProfilePage(this.page);
  await gitHubProfilePage.navigateToApplication();
  const isLoaded = await gitHubProfilePage.isApplicationLoaded();
  expect(isLoaded).toBeTruthy();
});

When('I search for a user with more than ten followers', async function () {
  await gitHubProfilePage.enterUsername('torvalds');
  await gitHubProfilePage.clickSearchButton();
  await gitHubProfilePage.waitForProfileToLoad();
});

Then('the user profile information should be displayed', async function () {
  const isProfileVisible = await gitHubProfilePage.isProfileDisplayed();
  expect(isProfileVisible).toBeTruthy();
});

Then('the followers list should be visible in the right section', async function () {
  const isFollowersListVisible = await gitHubProfilePage.isFollowersListVisible();
  expect(isFollowersListVisible).toBeTruthy();
});

Then('each follower should display avatar username and profile link', async function () {
  const followersHaveRequiredElements = await gitHubProfilePage.verifyFollowerElementsStructure();
  expect(followersHaveRequiredElements).toBeTruthy();
});

Then('the followers list should be scrollable when exceeding container size', async function () {
  const isScrollable = await gitHubProfilePage.isFollowersListScrollable();
  expect(isScrollable).toBeTruthy();
});

When('I scroll down the followers list', async function () {
  await gitHubProfilePage.scrollFollowersList();
});

Then('I should be able to navigate through all followers', async function () {
  const canNavigate = await gitHubProfilePage.verifyScrollFunctionality();
  expect(canNavigate).toBeTruthy();
});

When('I click on a follower profile link', async function () {
  this.followerProfileUrl = await gitHubProfilePage.clickOnFollowerProfileLink();
});

Then('I should be redirected to the follower GitHub profile page', async function () {
  const isRedirected = await gitHubProfilePage.verifyFollowerProfileRedirection();
  expect(isRedirected).toBeTruthy();
});