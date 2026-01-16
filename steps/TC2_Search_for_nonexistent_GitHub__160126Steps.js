const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage');

let searchPage;

Given('I am on the GitHub Profile Finder application', async function () {
  searchPage = new SearchPage(this.page);
  await searchPage.navigate();
  const isSearchVisible = await searchPage.isSearchComponentVisible();
  expect(isSearchVisible).toBeTruthy();
});

When('I enter a non-existent username in the search field', async function () {
  await searchPage.enterUsername('usuarioquenoexiste12345xyz');
  const inputValue = await searchPage.getSearchInputValue();
  expect(inputValue).toBe('usuarioquenoexiste12345xyz');
});

When('I click the search button', async function () {
  await searchPage.clickSearchButton();
});

When('I wait for the API response', async function () {
  await searchPage.waitForApiResponse();
});

Then('I should see a friendly error message indicating user not found', async function () {
  const isErrorVisible = await searchPage.isErrorMessageVisible();
  expect(isErrorVisible).toBeTruthy();
  const errorMessage = await searchPage.getErrorMessageText();
  expect(errorMessage).toBeTruthy();
  expect(errorMessage.toLowerCase()).toMatch(/not found|no user|doesn't exist|no existe|no results/);
});

Then('I should not see any profile information or metrics dashboard', async function () {
  const isProfileVisible = await searchPage.isProfileSectionVisible();
  expect(isProfileVisible).toBeFalsy();
  const isMetricsVisible = await searchPage.isMetricsDashboardVisible();
  expect(isMetricsVisible).toBeFalsy();
});