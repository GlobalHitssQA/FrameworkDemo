const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProspectSearchPage = require('../pages/ProspectSearchPage');

let prospectSearchPage;

Given('the user is authenticated in Acticenter as a Patrimonial, Private or Wealth Management advisor', async function () {
  prospectSearchPage = new ProspectSearchPage(this.page);
  await prospectSearchPage.navigateToActicenter();
  await prospectSearchPage.authenticateAsAdvisor();
});

Given('the main dashboard is displayed', async function () {
  const isDashboardVisible = await prospectSearchPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
});

When('the user locates the prospect search field', async function () {
  await prospectSearchPage.locateSearchField();
});

Then('the search field is enabled and ready for text input', async function () {
  const isSearchFieldEnabled = await prospectSearchPage.isSearchFieldEnabled();
  expect(isSearchFieldEnabled).toBeTruthy();
});

When('the user enters more than 2 alphanumeric characters {string} in the search field', async function (searchText) {
  await prospectSearchPage.enterSearchText(searchText);
});

Then('the system allows the capture of the alphanumeric characters', async function () {
  const enteredText = await prospectSearchPage.getSearchFieldValue();
  expect(enteredText.length).toBeGreaterThan(2);
});

When('the user clicks the search button or presses Enter', async function () {
  await prospectSearchPage.clickSearchButton();
});

Then('the system displays search results with matching prospects', async function () {
  const areResultsVisible = await prospectSearchPage.areSearchResultsVisible();
  expect(areResultsVisible).toBeTruthy();
});

Then('the matching characters {string} are highlighted in bold within the prospect names', async function (searchText) {
  const isBoldHighlightPresent = await prospectSearchPage.verifyBoldHighlightInResults(searchText);
  expect(isBoldHighlightPresent).toBeTruthy();
});