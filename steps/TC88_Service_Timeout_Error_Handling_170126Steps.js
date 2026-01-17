const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValuationPage = require('../pages/ValuationPage');

let valuationPage;

Given('the user is authenticated in Acticenter', async function () {
  valuationPage = new ValuationPage(this.page);
  await valuationPage.navigateToApplication();
  await valuationPage.verifyUserIsAuthenticated();
});

Given('the user has an active contract selected', async function () {
  await valuationPage.selectActiveContract();
});

Given('the valuation service is configured to simulate a timeout', async function () {
  await valuationPage.configureServiceTimeout();
});

When('the user accesses the Value and Composition component', async function () {
  await valuationPage.accessValueAndCompositionComponent();
});

When('the system attempts to invoke the valuation service', async function () {
  await valuationPage.waitForServiceInvocation();
});

When('the timeout period is exceeded', async function () {
  await valuationPage.waitForTimeoutToOccur();
});

Then('the system should display a timeout error message', async function () {
  const errorMessage = await valuationPage.getTimeoutErrorMessage();
  expect(errorMessage).toContain('no respondió');
});

Then('the user should be able to retry loading the valuation component', async function () {
  const isRetryButtonVisible = await valuationPage.isRetryButtonVisible();
  expect(isRetryButtonVisible).toBeTruthy();
  await valuationPage.clickRetryButton();
});