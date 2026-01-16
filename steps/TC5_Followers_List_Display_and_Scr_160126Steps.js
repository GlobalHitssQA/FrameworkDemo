const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FollowersPage = require('../pages/FollowersPage');

let followersPage;

Given('the GitHub Profile Finder application is loaded', async function () {
  followersPage = new FollowersPage(this.page);
  await followersPage.navigate();
  const isLoaded = await followersPage.isApplicationLoaded();
  expect(isLoaded).toBeTruthy();
});

When('I enter a GitHub username with multiple followers in the search field', async function () {
  await followersPage.enterUsername('torvalds');
});

When('I click the search button', async function () {
  await followersPage.clickSearchButton();
  await followersPage.waitForProfileToLoad();
});

Then('the followers list should be displayed in the right section', async function () {
  const isVisible = await followersPage.isFollowersListVisible();
  expect(isVisible).toBeTruthy();
});

Then('each follower should display an avatar image', async function () {
  const avatarsVisible = await followersPage.areFollowerAvatarsVisible();
  expect(avatarsVisible).toBeTruthy();
});

Then('each follower should display a username', async function () {
  const usernamesVisible = await followersPage.areFollowerUsernamesVisible();
  expect(usernamesVisible).toBeTruthy();
});

Then('each follower should have a link to their GitHub profile', async function () {
  const linksPresent = await followersPage.areFollowerLinksPresent();
  expect(linksPresent).toBeTruthy();
});

When('I scroll down in the followers list container', async function () {
  await followersPage.scrollFollowersList();
});

Then('additional followers should become visible', async function () {
  const additionalVisible = await followersPage.areAdditionalFollowersVisible();
  expect(additionalVisible).toBeTruthy();
});

When('I click on a follower profile link', async function () {
  this.followerLink = await followersPage.getFirstFollowerLink();
  await followersPage.clickFirstFollowerLink();
});

Then('I should be redirected to the follower GitHub profile page', async function () {
  const currentUrl = await followersPage.getCurrentUrl();
  expect(currentUrl).toContain('github.com');
});