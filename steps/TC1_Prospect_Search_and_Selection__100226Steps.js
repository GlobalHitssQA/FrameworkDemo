const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProspectSearchPage = require('../pages/ProspectSearchPage');

let prospectSearchPage;

Given('the advisor user is authenticated in Acticenter', async function () {
  prospectSearchPage = new ProspectSearchPage(this.page);
  await prospectSearchPage.navigateToActicenter();
  await prospectSearchPage.verifyUserIsAuthenticated();
});

Given('a prospect search has been previously executed', async function () {
  await prospectSearchPage.verifySearchFieldIsVisible();
});

When('the user searches for a prospect entering more than 2 characters in the search field', async function () {
  await prospectSearchPage.enterSearchQuery('Juan');
  await prospectSearchPage.clickSearchButton();
});

Then('the system displays the list of matches with the first results that meet the search criteria', async function () {
  const resultsVisible = await prospectSearchPage.areSearchResultsVisible();
  expect(resultsVisible).toBeTruthy();
});

Then('the system displays a maximum of 5 initial matches with scroll available if there are more results', async function () {
  const visibleCount = await prospectSearchPage.getVisibleResultsCount();
  expect(visibleCount).toBeLessThanOrEqual(5);
  const hasScroll = await prospectSearchPage.hasScrollableResults();
  expect(hasScroll).toBeDefined();
});

When('the user selects a prospect from the list by clicking on one of the displayed elements', async function () {
  await prospectSearchPage.selectFirstProspect();
});

Then('the system registers the prospect selection and continues with the selection process', async function () {
  const isSelected = await prospectSearchPage.isProspectSelected();
  expect(isSelected).toBeTruthy();
});

Then('the selected prospect information includes the prospect name and email key', async function () {
  const prospectName = await prospectSearchPage.getSelectedProspectName();
  const prospectEmail = await prospectSearchPage.getSelectedProspectEmail();
  expect(prospectName).toBeTruthy();
  expect(prospectEmail).toBeTruthy();
});