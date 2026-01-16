const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfilePage = require('../pages/GitHubProfilePage');

let gitHubProfilePage;

Given('I am on the GitHub Profile Finder application', async function () {
  gitHubProfilePage = new GitHubProfilePage(this.page);
  await gitHubProfilePage.navigateToApp();
});

When('I search for an existing GitHub user with public metrics', async function () {
  await gitHubProfilePage.searchUser('torvalds');
});

Then('I should see the user profile information displayed', async function () {
  const isProfileVisible = await gitHubProfilePage.isProfileDisplayed();
  expect(isProfileVisible).toBeTruthy();
});

Then('I should see the Repos metric with a numeric value', async function () {
  const reposValue = await gitHubProfilePage.getReposCount();
  expect(reposValue).toMatch(/^\d+$/);
});

Then('I should see the Followers metric with a numeric value', async function () {
  const followersValue = await gitHubProfilePage.getFollowersCount();
  expect(followersValue).toMatch(/^\d+$/);
});

Then('I should see the Following metric with a numeric value', async function () {
  const followingValue = await gitHubProfilePage.getFollowingCount();
  expect(followingValue).toMatch(/^\d+$/);
});

Then('I should see the Gists metric with a numeric value', async function () {
  const gistsValue = await gitHubProfilePage.getGistsCount();
  expect(gistsValue).toMatch(/^\d+$/);
});

Then('the displayed metrics should match the GitHub API values', async function () {
  const apiData = await gitHubProfilePage.fetchUserDataFromAPI('torvalds');
  
  const displayedRepos = await gitHubProfilePage.getReposCount();
  const displayedFollowers = await gitHubProfilePage.getFollowersCount();
  const displayedFollowing = await gitHubProfilePage.getFollowingCount();
  const displayedGists = await gitHubProfilePage.getGistsCount();
  
  expect(parseInt(displayedRepos)).toBe(apiData.public_repos);
  expect(parseInt(displayedFollowers)).toBe(apiData.followers);
  expect(parseInt(displayedFollowing)).toBe(apiData.following);
  expect(parseInt(displayedGists)).toBe(apiData.public_gists);
});