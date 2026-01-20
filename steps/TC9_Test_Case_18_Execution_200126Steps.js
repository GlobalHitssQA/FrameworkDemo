const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TestPage = require('../pages/TestPage');

let testPage;

Given('the user is on the application page', async function () {
  testPage = new TestPage(this.page);
  await testPage.navigateToApplication();
});

When('the user performs the required actions', async function () {
  await testPage.performRequiredActions();
});

Then('the expected results should be displayed', async function () {
  const isResultVisible = await testPage.isResultDisplayed();
  expect(isResultVisible).toBeTruthy();
});