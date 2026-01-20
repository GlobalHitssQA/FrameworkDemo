const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TestPage = require('../pages/TestPage');

let testPage;

Given('the user is on the application home page', async function () {
  testPage = new TestPage(this.page);
  await testPage.navigateToHomePage();
});

When('the user navigates to the main section', async function () {
  await testPage.navigateToMainSection();
});

Then('the page should be displayed correctly', async function () {
  const isDisplayed = await testPage.isPageDisplayedCorrectly();
  expect(isDisplayed).toBeTruthy();
});

Then('the main elements should be visible', async function () {
  const areElementsVisible = await testPage.areMainElementsVisible();
  expect(areElementsVisible).toBeTruthy();
});