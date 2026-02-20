const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterDashboardPage = require('../pages/ActicenterDashboardPage');

let dashboardPage;

Given('the advisor user is authenticated in Acticenter dashboard', async function () {
  dashboardPage = new ActicenterDashboardPage(this.page);
  await dashboardPage.navigateToDashboard();
  await dashboardPage.verifyDashboardIsDisplayed();
});

Given('the prospect search field is available', async function () {
  const isVisible = await dashboardPage.isProspectSearchFieldVisible();
  expect(isVisible).toBeTruthy();
});

When('the user enters more than 2 characters that do not match any existing prospect', async function () {
  await dashboardPage.enterProspectSearchText('XYZ999NONEXISTENT');
});

When('the system executes the automatic search', async function () {
  await dashboardPage.waitForSearchExecution();
});

Then('the system should display a message indicating no results were found', async function () {
  const noResultsMessage = await dashboardPage.getNoResultsMessage();
  expect(noResultsMessage).toBeTruthy();
});

Then('the user should remain on the Acticenter dashboard', async function () {
  const isOnDashboard = await dashboardPage.verifyDashboardIsDisplayed();
  expect(isOnDashboard).toBeTruthy();
});

Then('the user should be able to perform a new search or register a new prospect', async function () {
  const canPerformNewSearch = await dashboardPage.isProspectSearchFieldEnabled();
  const canRegisterNewProspect = await dashboardPage.isNewProspectButtonVisible();
  expect(canPerformNewSearch || canRegisterNewProspect).toBeTruthy();
});