const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BulkDataBillingPage = require('../pages/BulkDataBillingPage');

let bulkDataBillingPage;

Given('a line is configured with SOLD plan with bulk billing APNs', async function () {
  bulkDataBillingPage = new BulkDataBillingPage(this.page);
  await bulkDataBillingPage.navigateToLineConfiguration();
  await bulkDataBillingPage.selectSOLDPlan();
  await bulkDataBillingPage.configureBulkBillingAPNs(['APN2', 'APN5', 'APN6']);
  const isConfigured = await bulkDataBillingPage.verifyLineConfiguredWithSOLDPlan();
  expect(isConfigured).toBeTruthy();
});

When('I register {int} MB of local data consumption on APN2 gmsa for FOTA navigation', async function (megabytes) {
  await bulkDataBillingPage.navigateToConsumptionRegistration();
  await bulkDataBillingPage.selectAPN('APN2');
  await bulkDataBillingPage.enterDataConsumption(megabytes);
  await bulkDataBillingPage.selectNavigationType('FOTA');
  await bulkDataBillingPage.submitConsumptionRegistration();
  const registeredMB = await bulkDataBillingPage.getRegisteredConsumption();
  expect(registeredMB).toBe(megabytes);
});

When('I execute the billing process for the corresponding cycle', async function () {
  await bulkDataBillingPage.navigateToBillingProcess();
  await bulkDataBillingPage.selectCurrentBillingCycle();
  await bulkDataBillingPage.executeBillingProcess();
  await bulkDataBillingPage.waitForBillingProcessCompletion();
});

Then('the invoice should show a bulk data charge of S\/. {float} without IGV', async function (expectedAmount) {
  await bulkDataBillingPage.navigateToInvoiceDetails();
  const bulkDataChargeWithoutIGV = await bulkDataBillingPage.getBulkDataChargeWithoutIGV();
  expect(bulkDataChargeWithoutIGV).toBeCloseTo(expectedAmount, 2);
});

Then('the invoice should show a total charge with IGV of S\/. {float}', async function (expectedAmountWithIGV) {
  const bulkDataChargeWithIGV = await bulkDataBillingPage.getBulkDataChargeWithIGV();
  expect(bulkDataChargeWithIGV).toBeCloseTo(expectedAmountWithIGV, 2);
});