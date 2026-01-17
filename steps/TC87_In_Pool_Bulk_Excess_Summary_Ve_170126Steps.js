const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolSummaryPage = require('../pages/InPoolSummaryPage');

let inPoolSummaryPage;

Given('the telemetry consumption scenario is configured with pool of {int} MB and consumption of {int} MB', async function(poolSize, consumption) {
  inPoolSummaryPage = new InPoolSummaryPage(this.page);
  await inPoolSummaryPage.configureConsumptionScenario(poolSize, consumption);
});

Given('the billing process and In Pool calculation Shell have been executed', async function() {
  await inPoolSummaryPage.executeBillingProcessAndShell();
});

When('I access the In Pool 10 MB summary in the Traffic Detail SOLD section of the invoice', async function() {
  await inPoolSummaryPage.navigateToInvoice();
  await inPoolSummaryPage.accessTrafficDetailSOLDSection();
  await inPoolSummaryPage.accessInPool10MBSummary();
});

Then('I should see the summary with all concepts displayed', async function() {
  const isDisplayed = await inPoolSummaryPage.isSummaryWithAllConceptsVisible();
  expect(isDisplayed).toBeTruthy();
});

Then('I should see the Bulk Excess field showing {int} MB of excess', async function(expectedExcessMB) {
  const excessValue = await inPoolSummaryPage.getBulkExcessMBValue();
  expect(excessValue).toBe(expectedExcessMB);
});

Then('the excess amount should be calculated as {int} MB multiplied by {float} resulting in {float} soles without IGV', async function(excessMB, rate, expectedAmount) {
  const calculatedAmount = await inPoolSummaryPage.getBulkExcessAmount();
  expect(calculatedAmount).toBeCloseTo(expectedAmount, 2);
});

When('I verify a scenario where consumption does not exceed the pool', async function() {
  await inPoolSummaryPage.configureConsumptionScenario(1000, 800);
  await inPoolSummaryPage.executeBillingProcessAndShell();
  await inPoolSummaryPage.navigateToInvoice();
  await inPoolSummaryPage.accessTrafficDetailSOLDSection();
  await inPoolSummaryPage.accessInPool10MBSummary();
});

Then('the Bulk Excess field should not be displayed or should show {float} soles', async function(expectedAmount) {
  const isHidden = await inPoolSummaryPage.isBulkExcessFieldHiddenOrZero();
  expect(isHidden).toBeTruthy();
});