const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('the user is authenticated in the BSCS7 billing system', async function () {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.verifyUserIsAuthenticated();
});

Given('there are active lines in SOLD plan with telemetry consumption within the In Pool allocation', async function () {
  await billingPage.verifyActiveSOLDLinesExist();
  await billingPage.verifyInPoolConsumptionWithinAllocation();
});

When('the user accesses the billing system for General Motors client', async function () {
  await billingPage.selectClient('General Motors');
  await billingPage.verifyClientBillingScreenDisplayed();
});

When('the user executes the monthly billing process with cutoff on day 28', async function () {
  await billingPage.setBillingCutoffDay('28');
  await billingPage.executeMonthlyBillingProcess();
  await billingPage.waitForBillingProcessCompletion();
});

When('the user navigates to the Receipt Summary section in the generated invoice', async function () {
  await billingPage.openGeneratedInvoice();
  await billingPage.navigateToReceiptSummarySection();
});

Then('the Services In Pool item should be displayed', async function () {
  const isVisible = await billingPage.isServicesInPoolItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('the calculated amount should reflect the number of active lines at S\/. 1.30 per 10MB package', async function () {
  const amount = await billingPage.getServicesInPoolAmount();
  const activeLines = await billingPage.getActiveSOLDLinesCount();
  const expectedAmount = activeLines * 1.30;
  expect(amount).toContain(expectedAmount.toFixed(2));
});