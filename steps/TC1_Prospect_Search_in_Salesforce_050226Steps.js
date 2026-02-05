const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProspectSearchPage = require('../pages/ProspectSearchPage');

let prospectSearchPage;

Given('the user is on the advisor dashboard', async function () {
  prospectSearchPage = new ProspectSearchPage(this.page);
  await prospectSearchPage.navigateToDashboard();
});

When('the user enters a prospect name in the search field', async function () {
  await prospectSearchPage.enterProspectName('Juan Perez');
});

When('the user clicks the search button', async function () {
  await prospectSearchPage.clickSearchButton();
});

Then('a list of matching prospects should be displayed', async function () {
  const isVisible = await prospectSearchPage.isProspectListVisible();
  expect(isVisible).toBeTruthy();
});

Then('the user should be able to scroll through the matches', async function () {
  await prospectSearchPage.scrollThroughMatches();
  const hasMatches = await prospectSearchPage.hasProspectMatches();
  expect(hasMatches).toBeTruthy();
});