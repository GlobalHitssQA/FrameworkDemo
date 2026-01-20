const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TestPage = require('../pages/TestPage');

let testPage;

Given('the user is on the application home page', async function () {
  testPage = new TestPage(this.page);
  await testPage.navigateToHomePage();
});

When('the user interacts with the main elements', async function () {
  await testPage.clickMainButton();
});

Then('the expected result should be displayed', async function () {
  const isVisible = await testPage.isResultVisible();
  expect(isVisible).toBeTruthy();
});