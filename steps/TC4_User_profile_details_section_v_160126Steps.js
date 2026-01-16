const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProfilePage = require('../pages/ProfilePage');

let profilePage;

Given('I am on the GitHub Profile Finder application', async function () {
  profilePage = new ProfilePage(this.page);
  await profilePage.navigate();
});

When('I enter a GitHub username with complete profile information', async function () {
  await profilePage.enterUsername('sindresorhus');
});

When('I click the search button', async function () {
  await profilePage.clickSearchButton();
});

Then('I should see the user avatar displayed', async function () {
  const isAvatarVisible = await profilePage.isAvatarVisible();
  expect(isAvatarVisible).toBeTruthy();
});

Then('I should see the full name and username displayed', async function () {
  const fullName = await profilePage.getFullName();
  const username = await profilePage.getUsername();
  expect(fullName).toBeTruthy();
  expect(username).toBeTruthy();
});

Then('I should see the biography section', async function () {
  const biography = await profilePage.getBiography();
  expect(biography).toBeTruthy();
});

Then('I should see the location information', async function () {
  const location = await profilePage.getLocation();
  expect(location).toBeTruthy();
});

Then('I should see the company information', async function () {
  const company = await profilePage.getCompany();
  expect(company).toBeTruthy();
});

Then('I should see the web link as a functional hyperlink', async function () {
  const webLink = await profilePage.getWebLink();
  expect(webLink).toBeTruthy();
  const isWebLinkClickable = await profilePage.isWebLinkClickable();
  expect(isWebLinkClickable).toBeTruthy();
});

Then('I should see the Follow button', async function () {
  const isFollowButtonVisible = await profilePage.isFollowButtonVisible();
  expect(isFollowButtonVisible).toBeTruthy();
});