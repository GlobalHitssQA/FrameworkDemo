const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfilePage = require('../pages/GitHubProfilePage');

let gitHubProfilePage;

Given('I am on the GitHub homepage', async function () {
  gitHubProfilePage = new GitHubProfilePage(this.page);
  await gitHubProfilePage.navigate();
});

When('I search for a user with more than ten followers', async function () {
  await gitHubProfilePage.searchUser('torvalds');
});

Then('the user profile is displayed successfully', async function () {
  const isProfileVisible = await gitHubProfilePage.isProfileVisible();
  expect(isProfileVisible).toBeTruthy();
});

Then('the followers section is visible on the right side', async function () {
  const isFollowersSectionVisible = await gitHubProfilePage.isFollowersSectionVisible();
  expect(isFollowersSectionVisible).toBeTruthy();
});

Then('each follower displays avatar username and profile link', async function () {
  const followersHaveRequiredElements = await gitHubProfilePage.verifyFollowersHaveRequiredElements();
  expect(followersHaveRequiredElements).toBeTruthy();
});

Then('the vertical scrollbar is visible in the followers container', async function () {
  const isScrollbarVisible = await gitHubProfilePage.isFollowersScrollbarVisible();
  expect(isScrollbarVisible).toBeTruthy();
});

When('I scroll down in the followers list', async function () {
  await gitHubProfilePage.scrollFollowersList();
});

Then('the list scrolls correctly showing previously hidden followers', async function () {
  const hasScrolledSuccessfully = await gitHubProfilePage.verifyListScrolledSuccessfully();
  expect(hasScrolledSuccessfully).toBeTruthy();
});

Then('the scroll is smooth and continuous', async function () {
  const isScrollSmooth = await gitHubProfilePage.verifyScrollIsSmoothAndContinuous();
  expect(isScrollSmooth).toBeTruthy();
});

When('I click on a follower profile link', async function () {
  await gitHubProfilePage.clickOnFollowerProfileLink();
});

Then('I am redirected to the follower GitHub profile page', async function () {
  const isRedirectedToFollowerProfile = await gitHubProfilePage.verifyRedirectedToFollowerProfile();
  expect(isRedirectedToFollowerProfile).toBeTruthy();
});