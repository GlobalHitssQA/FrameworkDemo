const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SearchHistoryPage = require('../pages/SearchHistoryPage');

let searchHistoryPage;

Given('the advisor is authenticated in Acticenter as Banca Patrimonial, Privada or Wealth Management user', async function () {
  searchHistoryPage = new SearchHistoryPage(this.page);
  await searchHistoryPage.navigateToActicenter();
  await searchHistoryPage.loginAsAdvisor();
  const isDashboardVisible = await searchHistoryPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
});

Given('the advisor has performed at least 5 previous searches', async function () {
  const hasSearchHistory = await searchHistoryPage.verifySearchHistoryExists();
  expect(hasSearchHistory).toBeTruthy();
});

When('the advisor locates the prospect search field', async function () {
  const isSearchFieldVisible = await searchHistoryPage.isSearchFieldVisible();
  expect(isSearchFieldVisible).toBeTruthy();
});

When('the advisor clicks on the search field or enters the first alphanumeric character', async function () {
  await searchHistoryPage.clickSearchField();
  await searchHistoryPage.enterFirstCharacter('a');
});

Then('the system displays a list with the last 5 searches performed by the advisor', async function () {
  const isHistoryListVisible = await searchHistoryPage.isSearchHistoryListVisible();
  expect(isHistoryListVisible).toBeTruthy();
});

Then('each history item shows the prospect name and email address', async function () {
  const historyItems = await searchHistoryPage.getHistoryItems();
  for (const item of historyItems) {
    const hasName = await searchHistoryPage.historyItemHasName(item);
    const hasEmail = await searchHistoryPage.historyItemHasEmail(item);
    expect(hasName).toBeTruthy();
    expect(hasEmail).toBeTruthy();
  }
});

Then('the history displays a maximum of 5 searches only', async function () {
  const historyCount = await searchHistoryPage.getHistoryItemsCount();
  expect(historyCount).toBeLessThanOrEqual(5);
});