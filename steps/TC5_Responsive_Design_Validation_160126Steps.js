const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GitHubProfileSearchPage = require('../pages/GitHubProfileSearchPage');

let page;
let gitHubProfileSearchPage;

Given('the user navigates to the GitHub Profile Search application', async function() {
  page = this.page;
  gitHubProfileSearchPage = new GitHubProfileSearchPage(page);
  await gitHubProfileSearchPage.navigate();
});

When('the user views the application in desktop resolution {int}x{int}', async function(width, height) {
  await gitHubProfileSearchPage.setViewport(width, height);
});

Then('all components should be visible and properly distributed', async function() {
  const isSearchInputVisible = await gitHubProfileSearchPage.isSearchInputVisible();
  const isSearchButtonVisible = await gitHubProfileSearchPage.isSearchButtonVisible();
  expect(isSearchInputVisible).toBe(true);
  expect(isSearchButtonVisible).toBe(true);
});

When('the user searches for an existing GitHub user in desktop view', async function() {
  await gitHubProfileSearchPage.searchUser('octocat');
});

Then('the metrics dashboard and profile information and followers list should display correctly in horizontal layout', async function() {
  const isMetricsDashboardVisible = await gitHubProfileSearchPage.isMetricsDashboardVisible();
  const isProfileInfoVisible = await gitHubProfileSearchPage.isProfileInfoVisible();
  const isFollowersListVisible = await gitHubProfileSearchPage.isFollowersListVisible();
  expect(isMetricsDashboardVisible).toBe(true);
  expect(isProfileInfoVisible).toBe(true);
  expect(isFollowersListVisible).toBe(true);
});

When('the user resizes the browser to tablet resolution {int}x{int}', async function(width, height) {
  await gitHubProfileSearchPage.setViewport(width, height);
});

Then('components should reorganize without overlapping or clipping', async function() {
  const hasNoOverlap = await gitHubProfileSearchPage.checkNoElementOverlap();
  expect(hasNoOverlap).toBe(true);
});

When('the user resizes the browser to mobile portrait resolution {int}x{int}', async function(width, height) {
  await gitHubProfileSearchPage.setViewport(width, height);
});

Then('the interface should adapt to vertical layout for optimal mobile viewing', async function() {
  const isVerticalLayout = await gitHubProfileSearchPage.isVerticalLayoutActive();
  expect(isVerticalLayout).toBe(true);
});

Then('the search input and button should be accessible with appropriate touch size', async function() {
  const searchInputSize = await gitHubProfileSearchPage.getSearchInputDimensions();
  const searchButtonSize = await gitHubProfileSearchPage.getSearchButtonDimensions();
  expect(searchInputSize.height).toBeGreaterThanOrEqual(44);
  expect(searchButtonSize.height).toBeGreaterThanOrEqual(44);
});

When('the user changes to mobile landscape orientation {int}x{int}', async function(width, height) {
  await gitHubProfileSearchPage.setViewport(width, height);
});

Then('the interface should adapt automatically maintaining functionality', async function() {
  const isSearchInputVisible = await gitHubProfileSearchPage.isSearchInputVisible();
  const isSearchButtonVisible = await gitHubProfileSearchPage.isSearchButtonVisible();
  expect(isSearchInputVisible).toBe(true);
  expect(isSearchButtonVisible).toBe(true);
});

When('the user scrolls in both portrait and landscape orientations', async function() {
  await gitHubProfileSearchPage.scrollToBottom();
  await gitHubProfileSearchPage.scrollToTop();
});

Then('vertical scroll should work correctly to access all content', async function() {
  const canScroll = await gitHubProfileSearchPage.verifyScrollFunctionality();
  expect(canScroll).toBe(true);
});

When('the user performs a complete search on mobile device', async function() {
  await gitHubProfileSearchPage.searchUser('octocat');
});

Then('all functionalities should work correctly including links and metrics and followers list', async function() {
  const isMetricsDashboardVisible = await gitHubProfileSearchPage.isMetricsDashboardVisible();
  const isProfileInfoVisible = await gitHubProfileSearchPage.isProfileInfoVisible();
  const areFollowerLinksClickable = await gitHubProfileSearchPage.areFollowerLinksClickable();
  const areMetricsDisplayed = await gitHubProfileSearchPage.areMetricsDisplayed();
  expect(isMetricsDashboardVisible).toBe(true);
  expect(isProfileInfoVisible).toBe(true);
  expect(areFollowerLinksClickable).toBe(true);
  expect(areMetricsDisplayed).toBe(true);
});