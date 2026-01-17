const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SmsBillingPage = require('../pages/SmsBillingPage');

let smsBillingPage;

Given('a line is configured in a Life Cycle plan with bulk SMS billing', async function () {
  smsBillingPage = new SmsBillingPage(this.page);
  await smsBillingPage.navigateToLineConfiguration();
  await smsBillingPage.selectLifeCyclePlan();
  await smsBillingPage.enableBulkSmsBilling();
  await smsBillingPage.saveLineConfiguration();
  const isConfigured = await smsBillingPage.isLineConfiguredSuccessfully();
  expect(isConfigured).toBeTruthy();
});

When('I register consumption of 20 local SMS for the line', async function () {
  await smsBillingPage.navigateToConsumptionRegistration();
  await smsBillingPage.enterLocalSmsCount('20');
  await smsBillingPage.confirmSmsRegistration();
  const registeredCount = await smsBillingPage.getRegisteredSmsCount();
  expect(registeredCount).toBe('20');
});

When('I execute the billing process for the corresponding cycle', async function () {
  await smsBillingPage.navigateToBillingProcess();
  await smsBillingPage.selectCurrentBillingCycle();
  await smsBillingPage.executeBillingProcess();
  await smsBillingPage.waitForBillingCompletion();
});

Then('the invoice should show a charge of S\/. 1.00 without IGV for local SMS', async function () {
  await smsBillingPage.navigateToInvoiceDetails();
  const smsChargeWithoutIgv = await smsBillingPage.getLocalSmsChargeWithoutIgv();
  expect(smsChargeWithoutIgv).toBe('S/. 1.00');
});

Then('the invoice should show a total charge of S\/. 1.18 with IGV included', async function () {
  const smsChargeWithIgv = await smsBillingPage.getLocalSmsChargeWithIgv();
  expect(smsChargeWithIgv).toBe('S/. 1.18');
});