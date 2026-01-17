const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterHeaderPage = require('../pages/ActicenterHeaderPage');

let acticenterHeaderPage;

Given('the user is authenticated and accesses Acticenter application in Desktop view', async function () {
  acticenterHeaderPage = new ActicenterHeaderPage(this.page);
  await acticenterHeaderPage.navigateToActicenter();
  await acticenterHeaderPage.setDesktopViewport();
  const isHeaderVisible = await acticenterHeaderPage.isHeaderVisible();
  expect(isHeaderVisible).toBeTruthy();
});

When('the user locates the magnifying glass icon in the application header', async function () {
  await acticenterHeaderPage.locateSearchIcon();
});

Then('the magnifying glass icon should be visible in the header', async function () {
  const isSearchIconVisible = await acticenterHeaderPage.isSearchIconVisible();
  expect(isSearchIconVisible).toBeTruthy();
});

Then('the magnifying glass icon should be positioned according to the standard Acticenter module design', async function () {
  const isSearchIconInHeader = await acticenterHeaderPage.isSearchIconPositionedInHeader();
  expect(isSearchIconInHeader).toBeTruthy();
  const isSearchIconAccessible = await acticenterHeaderPage.isSearchIconAccessible();
  expect(isSearchIconAccessible).toBeTruthy();
});