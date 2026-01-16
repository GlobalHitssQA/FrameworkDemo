const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DashboardPage = require('../pages/DashboardPage');

let dashboardPage;

Given('I am on the GitHub Profile Finder application', async function () {
  dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigate();
});

When('I search for an existing GitHub user with complete public data', async function () {
  await dashboardPage.searchUser('torvalds');
});

Then('the system should retrieve and display the user profile correctly', async function () {
  const isProfileVisible = await dashboardPage.isProfileDisplayed();
  expect(isProfileVisible).toBe(true);
});

Then('I should see the metrics section displayed prominently', async function () {
  const isMetricsSectionVisible = await dashboardPage.isMetricsSectionVisible();
  expect(isMetricsSectionVisible).toBe(true);
});

Then('I should see the Repos metric with the total number of public repositories', async function () {
  const reposLabel = await dashboardPage.getReposLabel();
  const reposValue = await dashboardPage.getReposValue();
  expect(reposLabel.toLowerCase()).toContain('repos');
  expect(parseInt(reposValue)).toBeGreaterThanOrEqual(0);
});

Then('I should see the Followers metric with the total number of followers', async function () {
  const followersLabel = await dashboardPage.getFollowersLabel();
  const followersValue = await dashboardPage.getFollowersValue();
  expect(followersLabel.toLowerCase()).toContain('followers');
  expect(parseInt(followersValue)).toBeGreaterThanOrEqual(0);
});

Then('I should see the Following metric with the number of profiles the user follows', async function () {
  const followingLabel = await dashboardPage.getFollowingLabel();
  const followingValue = await dashboardPage.getFollowingValue();
  expect(followingLabel.toLowerCase()).toContain('following');
  expect(parseInt(followingValue)).toBeGreaterThanOrEqual(0);
});

Then('I should see the Gists metric with the total number of public gists', async function () {
  const gistsLabel = await dashboardPage.getGistsLabel();
  const gistsValue = await dashboardPage.getGistsValue();
  expect(gistsLabel.toLowerCase()).toContain('gists');
  expect(parseInt(gistsValue)).toBeGreaterThanOrEqual(0);
});

Then('all metric values should match the actual GitHub API data', async function () {
  const apiData = await dashboardPage.fetchGitHubApiData('torvalds');
  const displayedRepos = await dashboardPage.getReposValue();
  const displayedFollowers = await dashboardPage.getFollowersValue();
  const displayedFollowing = await dashboardPage.getFollowingValue();
  const displayedGists = await dashboardPage.getGistsValue();
  
  expect(parseInt(displayedRepos)).toBe(apiData.public_repos);
  expect(parseInt(displayedFollowers)).toBe(apiData.followers);
  expect(parseInt(displayedFollowing)).toBe(apiData.following);
  expect(parseInt(displayedGists)).toBe(apiData.public_gists);
});