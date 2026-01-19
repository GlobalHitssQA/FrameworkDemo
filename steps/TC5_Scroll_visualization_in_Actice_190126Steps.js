const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProspectSearchPage = require('../pages/ProspectSearchPage');

let prospectSearchPage;

Given('the user is authenticated in Acticenter as a Patrimonial Banking advisor', async function () {
  prospectSearchPage = new ProspectSearchPage(this.page);
  await prospectSearchPage.navigateToLogin();
  await prospectSearchPage.loginAsAdvisor();
});

Given('the user is on the main dashboard', async function () {
  const isDashboardVisible = await prospectSearchPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
});

When('the user locates the prospect search field', async function () {
  await prospectSearchPage.locateSearchField();
});

Then('the search field should be enabled for text input', async function () {
  const isEnabled = await prospectSearchPage.isSearchFieldEnabled();
  expect(isEnabled).toBeTruthy();
});

When('the user enters more than 2 alphanumeric characters that generate more than 5 matches', async function () {
  await prospectSearchPage.enterSearchCriteria('Mar');
});

Then('the system allows the capture of alphanumeric characters', async function () {
  const searchValue = await prospectSearchPage.getSearchFieldValue();
  expect(searchValue).toBe('Mar');
});

When('the user clicks the search button or presses Enter', async function () {
  await prospectSearchPage.clickSearchButton();
});

Then('the system executes the search in the Salesforce database', async function () {
  await prospectSearchPage.waitForSearchResults();
});

Then('the first 5 matching prospects are displayed with name and email', async function () {
  const visibleCount = await prospectSearchPage.getVisibleProspectCount();
  expect(visibleCount).toBeGreaterThanOrEqual(5);
  const hasNameAndEmail = await prospectSearchPage.verifyProspectsHaveNameAndEmail();
  expect(hasNameAndEmail).toBeTruthy();
});

Then('a scroll bar is visible in the results area', async function () {
  const isScrollVisible = await prospectSearchPage.isScrollBarVisible();
  expect(isScrollVisible).toBeTruthy();
});

When('the user scrolls down in the results area', async function () {
  await prospectSearchPage.scrollDownResults();
});

Then('additional prospects from the sixth result onwards are displayed with name and email', async function () {
  const additionalProspectsVisible = await prospectSearchPage.areAdditionalProspectsVisible();
  expect(additionalProspectsVisible).toBeTruthy();
  const hasNameAndEmail = await prospectSearchPage.verifyProspectsHaveNameAndEmail();
  expect(hasNameAndEmail).toBeTruthy();
});