const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage');

let searchPage;

Given('the user is authenticated in Acticenter', async function () {
  searchPage = new SearchPage(this.page);
  await searchPage.navigateToActicenter();
  await searchPage.login();
});

Given('the main interface is displayed', async function () {
  await searchPage.waitForMainInterface();
});

When('the user verifies the magnifying glass icon in desktop view', async function () {
  await searchPage.setDesktopViewport();
});

Then('the magnifying glass icon should be visible and accessible in desktop view', async function () {
  const isVisible = await searchPage.isMagnifyingGlassVisible();
  expect(isVisible).toBeTruthy();
});

When('the user switches to responsive landscape view', async function () {
  await searchPage.setLandscapeViewport();
});

Then('the magnifying glass icon should be visible and accessible in landscape view', async function () {
  const isVisible = await searchPage.isMagnifyingGlassVisible();
  expect(isVisible).toBeTruthy();
});

When('the user switches to responsive portrait view', async function () {
  await searchPage.setPortraitViewport();
});

Then('the magnifying glass icon should be visible and accessible in portrait view', async function () {
  const isVisible = await searchPage.isMagnifyingGlassVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the magnifying glass icon', async function () {
  await searchPage.clickMagnifyingGlass();
});

Then('the search function for client or contract should be activated', async function () {
  const isActive = await searchPage.isSearchFunctionActive();
  expect(isActive).toBeTruthy();
});

Then('the search function should allow entering criteria to locate clients or contracts', async function () {
  const isInputEnabled = await searchPage.isSearchInputEnabled();
  expect(isInputEnabled).toBeTruthy();
});