const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfileSearchPage = require('../pages/GitHubProfileSearchPage');

let page;
let gitHubProfileSearchPage;

Given('I access the GitHub profile search application', async function () {
  page = this.page;
  gitHubProfileSearchPage = new GitHubProfileSearchPage(page);
  await gitHubProfileSearchPage.navigate();
});

Given('the search component is displayed with input field and search button', async function () {
  const isSearchInputVisible = await gitHubProfileSearchPage.isSearchInputVisible();
  const isSearchButtonVisible = await gitHubProfileSearchPage.isSearchButtonVisible();
  expect(isSearchInputVisible).toBe(true);
  expect(isSearchButtonVisible).toBe(true);
});

When('I enter a valid GitHub username {string} in the search field', async function (username) {
  await gitHubProfileSearchPage.enterUsername(username);
});

When('I click the search button with magnifying glass icon', async function () {
  await gitHubProfileSearchPage.clickSearchButton();
});

When('I wait for the API response to complete', async function () {
  await gitHubProfileSearchPage.waitForProfileLoad();
});

Then('the user profile information is loaded successfully', async function () {
  const isProfileVisible = await gitHubProfileSearchPage.isProfileCardVisible();
  expect(isProfileVisible).toBe(true);
});

Then('the Repos metric counter is displayed with a valid numeric value', async function () {
  const reposValue = await gitHubProfileSearchPage.getReposCount();
  expect(reposValue).not.toBeNull();
  expect(Number.isInteger(reposValue)).toBe(true);
});

Then('the Followers metric counter is displayed with a valid numeric value', async function () {
  const followersValue = await gitHubProfileSearchPage.getFollowersCount();
  expect(followersValue).not.toBeNull();
  expect(Number.isInteger(followersValue)).toBe(true);
});

Then('the Following metric counter is displayed with a valid numeric value', async function () {
  const followingValue = await gitHubProfileSearchPage.getFollowingCount();
  expect(followingValue).not.toBeNull();
  expect(Number.isInteger(followingValue)).toBe(true);
});

Then('the Gists metric counter is displayed with a valid numeric value', async function () {
  const gistsValue = await gitHubProfileSearchPage.getGistsCount();
  expect(gistsValue).not.toBeNull();
  expect(Number.isInteger(gistsValue)).toBe(true);
});

Then('all metric counters show integer values greater than or equal to zero', async function () {
  const reposValue = await gitHubProfileSearchPage.getReposCount();
  const followersValue = await gitHubProfileSearchPage.getFollowersCount();
  const followingValue = await gitHubProfileSearchPage.getFollowingCount();
  const gistsValue = await gitHubProfileSearchPage.getGistsCount();
  
  expect(reposValue).toBeGreaterThanOrEqual(0);
  expect(followersValue).toBeGreaterThanOrEqual(0);
  expect(followingValue).toBeGreaterThanOrEqual(0);
  expect(gistsValue).toBeGreaterThanOrEqual(0);
});

Then('the API request limit indicator is displayed in format {string}', async function (format) {
  const requestLimitText = await gitHubProfileSearchPage.getRequestLimitText();
  expect(requestLimitText).toMatch(/Requests\s+\d+\/\d+/);
});