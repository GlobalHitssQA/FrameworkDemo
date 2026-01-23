const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubSearchPage = require('../pages/GitHubSearchPage');
const GitHubProfilePage = require('../pages/GitHubProfilePage');

let searchPage;
let profilePage;

Given('the user is on the GitHub search page', async function () {
  searchPage = new GitHubSearchPage(this.page);
  await searchPage.navigate();
});

When('the user searches for a username in the search box', async function () {
  await searchPage.searchForUser('torvalds');
});

When('the user clicks on the user result from the search results', async function () {
  await searchPage.clickOnFirstUserResult();
  profilePage = new GitHubProfilePage(this.page);
});

Then('the user profile page should be displayed', async function () {
  const isProfileVisible = await profilePage.isProfilePageVisible();
  expect(isProfileVisible).toBeTruthy();
});

Then('the user should see the profile metrics including followers and repositories', async function () {
  const followersCount = await profilePage.getFollowersCount();
  const reposCount = await profilePage.getRepositoriesCount();
  expect(followersCount).toBeTruthy();
  expect(reposCount).toBeTruthy();
});

Then('the user should see the user personal information', async function () {
  const fullName = await profilePage.getFullName();
  const username = await profilePage.getUsername();
  const location = await profilePage.getLocation();
  expect(fullName).toBeTruthy();
  expect(username).toBeTruthy();
  expect(location).toBeTruthy();
});