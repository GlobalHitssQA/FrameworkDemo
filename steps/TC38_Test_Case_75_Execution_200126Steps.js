const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TestPage = require('../pages/TestPage');

let testPage;

Given('the user is on the application home page', async function () {
  testPage = new TestPage(this.page);
  await testPage.navigateToHomePage();
});

When('the user views the main content area', async function () {
  await testPage.waitForMainContent();
});

Then('the page should be displayed correctly', async function () {
  const isVisible = await testPage.isMainContentVisible();
  expect(isVisible).toBeTruthy();
});