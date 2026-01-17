const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('the user is authenticated in BSCS7 billing system', async function () {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.verifyUserIsAuthenticated();
});

Given('there are active SOLD plan lines with consumption exceeding the assigned In Pool quota', async function () {
  await billingPage.verifyActiveSoldPlanLinesWithExcessConsumption();
});

Given('the In Pool calculation shell has been executed correctly', async function () {
  await billingPage.verifyInPoolCalculationShellExecuted();
});

Given('the pre-billing process has been completed', async function () {
  await billingPage.verifyPreBillingCompleted();
});

When('the user accesses the billing system for General Motors client', async function () {
  await billingPage.accessClientBilling('General Motors');
});

Then('the system displays the billing screen with GM client data', async function () {
  const isDisplayed = await billingPage.isBillingScreenDisplayedForClient('GM');
  expect(isDisplayed).toBeTruthy();
});

When('the user executes the monthly billing process with cutoff on day 28 for SOLD plan lines with telemetry consumption exceeding the In Pool quota', async function () {
  await billingPage.executeMonthlyBillingProcess(28, 'SOLD');
});

Then('the system processes the billing and generates the corresponding OCCs for In Pool Services and In Pool Granel Services', async function () {
  await billingPage.waitForBillingProcessCompletion();
  const occsGenerated = await billingPage.verifyOCCsGenerated(['In Pool Services', 'In Pool Granel Services']);
  expect(occsGenerated).toBeTruthy();
});

When('the user consults the Receipt Summary section in the generated invoice', async function () {
  await billingPage.navigateToReceiptSummary();
});

Then('the system displays the In Pool Services item with the assigned quota amount', async function () {
  const isVisible = await billingPage.isInPoolServicesItemVisible();
  expect(isVisible).toBeTruthy();
  const hasAmount = await billingPage.inPoolServicesHasValidAmount();
  expect(hasAmount).toBeTruthy();
});

Then('the system displays the In Pool Granel Services item with the calculated excess amount', async function () {
  const isVisible = await billingPage.isInPoolGranelServicesItemVisible();
  expect(isVisible).toBeTruthy();
  const hasAmount = await billingPage.inPoolGranelServicesHasValidAmount();
  expect(hasAmount).toBeTruthy();
});

Then('both items appear separately in the invoice summary with their corresponding amounts', async function () {
  const areSeparate = await billingPage.verifyItemsDisplayedSeparately();
  expect(areSeparate).toBeTruthy();
  const amountsCorrect = await billingPage.verifyBothItemsHaveCorrespondingAmounts();
  expect(amountsCorrect).toBeTruthy();
});