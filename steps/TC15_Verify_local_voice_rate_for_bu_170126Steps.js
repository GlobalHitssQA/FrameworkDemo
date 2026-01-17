const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('a line is configured with a bulk voice billing plan', async function () {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToPlanConfiguration();
  await billingPage.selectBulkVoicePlan();
  await billingPage.configureLine();
  const isConfigured = await billingPage.isLineConfigured();
  expect(isConfigured).toBeTruthy();
});

When('I register {int} minutes of local voice consumption for the line', async function (minutes) {
  await billingPage.navigateToConsumptionRegistry();
  await billingPage.registerLocalVoiceConsumption(minutes);
  const registeredMinutes = await billingPage.getRegisteredConsumption();
  expect(registeredMinutes).toBe(minutes);
});

When('I execute the billing process for the corresponding cycle', async function () {
  await billingPage.navigateToBillingProcess();
  await billingPage.executeBillingCycle();
  const isProcessed = await billingPage.isBillingProcessed();
  expect(isProcessed).toBeTruthy();
});

Then('the invoice should show a charge of S\/. {float} without IGV for local voice', async function (expectedAmount) {
  await billingPage.navigateToInvoiceDetails();
  const chargeWithoutIGV = await billingPage.getLocalVoiceChargeWithoutIGV();
  expect(chargeWithoutIGV).toBe(expectedAmount);
});

Then('the invoice should show a charge of S\/. {float} with IGV included', async function (expectedAmountWithIGV) {
  const chargeWithIGV = await billingPage.getLocalVoiceChargeWithIGV();
  expect(chargeWithIGV).toBe(expectedAmountWithIGV);
});