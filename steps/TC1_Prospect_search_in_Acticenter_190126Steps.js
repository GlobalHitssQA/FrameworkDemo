const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProspectSearchPage = require('../pages/ProspectSearchPage');

let prospectSearchPage;

Given('the user is authenticated as a Patrimonial Banking advisor in Acticenter', async function () {
  prospectSearchPage = new ProspectSearchPage(this.page);
  await prospectSearchPage.navigateToLogin();
  await prospectSearchPage.loginAsAdvisor();
});

Given('the main dashboard is displayed', async function () {
  const isDashboardVisible = await prospectSearchPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
});

When('the user locates the prospect search field', async function () {
  const isSearchFieldVisible = await prospectSearchPage.isSearchFieldVisible();
  expect(isSearchFieldVisible).toBeTruthy();
});

When('the user enters {string} in the search field', async function (searchText) {
  await prospectSearchPage.enterSearchText(searchText);
});

When('the user clicks the search button or presses Enter', async function () {
  await prospectSearchPage.clickSearchButton();
});

Then('the search results are displayed', async function () {
  const areResultsVisible = await prospectSearchPage.areSearchResultsVisible();
  expect(areResultsVisible).toBeTruthy();
});

Then('each result shows the prospect name and email address', async function () {
  const resultsHaveNameAndEmail = await prospectSearchPage.verifyResultsContainNameAndEmail();
  expect(resultsHaveNameAndEmail).toBeTruthy();
});