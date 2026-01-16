const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfilePage = require('../pages/GitHubProfilePage');

let gitHubProfilePage;

Given('the GitHub Profile Finder application is loaded', async function () {
  gitHubProfilePage = new GitHubProfilePage(this.page);
  await gitHubProfilePage.navigate();
  const isLoaded = await gitHubProfilePage.isPageLoaded();
  expect(isLoaded).toBeTruthy();
});

When('I enter a valid GitHub username in the search field', async function () {
  await gitHubProfilePage.enterUsername('octocat');
});

When('I click the search button', async function () {
  await gitHubProfilePage.clickSearchButton();
});

Then('the profile information should be displayed', async function () {
  const isProfileVisible = await gitHubProfilePage.isProfileCardVisible();
  expect(isProfileVisible).toBeTruthy();
});

Then('the Repos counter should display the total public repositories', async function () {
  const reposCount = await gitHubProfilePage.getReposCount();
  expect(reposCount).not.toBeNull();
  expect(parseInt(reposCount)).toBeGreaterThanOrEqual(0);
});

Then('the Followers counter should display the total followers count', async function () {
  const followersCount = await gitHubProfilePage.getFollowersCount();
  expect(followersCount).not.toBeNull();
  expect(parseInt(followersCount)).toBeGreaterThanOrEqual(0);
});

Then('the Following counter should display the total following count', async function () {
  const followingCount = await gitHubProfilePage.getFollowingCount();
  expect(followingCount).not.toBeNull();
  expect(parseInt(followingCount)).toBeGreaterThanOrEqual(0);
});

Then('the Gists counter should display the total public gists count', async function () {
  const gistsCount = await gitHubProfilePage.getGistsCount();
  expect(gistsCount).not.toBeNull();
  expect(parseInt(gistsCount)).toBeGreaterThanOrEqual(0);
});