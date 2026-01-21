const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

let loginPage;

Given('the user is on the login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('the user enters valid credentials', async function () {
  await loginPage.enterUsername(process.env.TEST_USERNAME || 'testuser');
  await loginPage.enterPassword(process.env.TEST_PASSWORD || 'testpassword');
});

When('the user clicks the login button', async function () {
  await loginPage.clickLoginButton();
});

Then('the user should be redirected to the dashboard', async function () {
  await loginPage.waitForDashboard();
  const currentUrl = await loginPage.getCurrentUrl();
  expect(currentUrl).toContain('/dashboard');
});

Then('the user should see the welcome message', async function () {
  const isWelcomeVisible = await loginPage.isWelcomeMessageVisible();
  expect(isWelcomeVisible).toBeTruthy();
});