const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TestPage = require('../pages/TestPage');

let testPage;

Given('the user is on the application home page', async function () {
  testPage = new TestPage(this.page);
  await testPage.navigateToHomePage();
});

When('the user performs the required actions', async function () {
  await testPage.performMainAction();
});

Then('the expected results should be displayed', async function () {
  const isResultVisible = await testPage.isResultVisible();
  expect(isResultVisible).toBeTruthy();
});