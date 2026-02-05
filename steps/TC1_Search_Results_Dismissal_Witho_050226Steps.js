const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage');

let searchPage;

Given('the user is logged in to Acticenter as a Banca Patrimonial advisor', async function () {
  searchPage = new SearchPage(this.page);
  await searchPage.navigateToDashboard();
  await searchPage.login();
});

Given('the main dashboard is displayed', async function () {
  const isDashboardVisible = await searchPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
});

When('the user enters more than 2 characters in the prospect search field', async function () {
  await searchPage.enterSearchText('pro');
});

Then('the system displays search results with prospect name and email', async function () {
  const areResultsVisible = await searchPage.areSearchResultsVisible();
  expect(areResultsVisible).toBeTruthy();
  const hasProspectInfo = await searchPage.resultsContainProspectInfo();
  expect(hasProspectInfo).toBeTruthy();
});

When('the user views the search results without clicking any prospect', async function () {
  await searchPage.waitForResultsToBeStable();
});

Then('the search results remain visible on screen', async function () {
  const areResultsVisible = await searchPage.areSearchResultsVisible();
  expect(areResultsVisible).toBeTruthy();
});

When('the user clicks outside the results area or presses Escape key', async function () {
  await searchPage.dismissSearchResults();
});

Then('the search results are closed', async function () {
  const areResultsHidden = await searchPage.areSearchResultsHidden();
  expect(areResultsHidden).toBeTruthy();
});

Then('the user remains on the Acticenter dashboard', async function () {
  const isDashboardVisible = await searchPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
});

Then('the user can continue with other actions without having selected a prospect', async function () {
  const isDashboardInteractive = await searchPage.isDashboardInteractive();
  expect(isDashboardInteractive).toBeTruthy();
});