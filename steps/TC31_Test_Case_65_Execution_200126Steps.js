const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TestPage = require('../pages/TestPage');

let testPage;

Given('the user navigates to the application', async function () {
  testPage = new TestPage(this.page);
  await testPage.navigateToApplication();
});

When('the user performs the required action', async function () {
  await testPage.performRequiredAction();
});

Then('the expected result should be displayed', async function () {
  const isResultVisible = await testPage.isExpectedResultVisible();
  expect(isResultVisible).toBeTruthy();
});