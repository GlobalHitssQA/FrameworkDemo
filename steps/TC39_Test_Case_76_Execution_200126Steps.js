const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TestPage = require('../pages/TestPage');

let testPage;

Given('the user is on the application page', async function () {
  testPage = new TestPage(this.page);
  await testPage.navigateToPage();
});

When('the user interacts with the main elements', async function () {
  await testPage.performMainInteraction();
});

Then('the expected result should be displayed', async function () {
  const isResultVisible = await testPage.isResultDisplayed();
  expect(isResultVisible).toBe(true);
});