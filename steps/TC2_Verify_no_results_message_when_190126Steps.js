const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SearchProspectPage = require('../pages/SearchProspectPage');

let searchProspectPage;

Given('the user is authenticated as a Patrimonial, Private or Wealth Management advisor in Acticenter', async function () {
  searchProspectPage = new SearchProspectPage(this.page);
  await searchProspectPage.navigateToActicenter();
  await searchProspectPage.loginAsAdvisor();
});

Given('the user sees the main dashboard', async function () {
  const isDashboardVisible = await searchProspectPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
});

When('the user locates the prospect search field', async function () {
  const isSearchFieldVisible = await searchProspectPage.isSearchFieldVisible();
  expect(isSearchFieldVisible).toBeTruthy();
});

When('the user enters alphanumeric characters that do not match any existing prospect {string}', async function (searchText) {
  await searchProspectPage.enterSearchText(searchText);
});

When('the user clicks the search button or presses Enter', async function () {
  await searchProspectPage.clickSearchButton();
});

Then('the system should display a no results message indicating no matches were found', async function () {
  const isNoResultsMessageVisible = await searchProspectPage.isNoResultsMessageVisible();
  expect(isNoResultsMessageVisible).toBeTruthy();
  const noResultsMessageText = await searchProspectPage.getNoResultsMessageText();
  expect(noResultsMessageText).toBeTruthy();
});