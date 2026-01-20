const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

let loginPage;

Given('the user is on the login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('the user enters valid username', async function () {
  await loginPage.enterUsername(this.testData.username);
});

When('the user enters valid password', async function () {
  await loginPage.enterPassword(this.testData.password);
});

When('the user clicks the login button', async function () {
  await loginPage.clickLoginButton();
});

Then('the user should be redirected to the dashboard', async function () {
  const isDashboardVisible = await loginPage.isDashboardVisible();
  expect(isDashboardVisible).toBeTruthy();
});