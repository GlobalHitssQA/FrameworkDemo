const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ManufacturePlanPage = require('../pages/ManufacturePlanPage');

let manufacturePlanPage;

Given('a line is provisioned with MANUFACTURE plan including {int} min voice and {int} SMS and {int} MB data', async function(voiceMinutes, smsCount, dataMB) {
  manufacturePlanPage = new ManufacturePlanPage(this.page);
  await manufacturePlanPage.navigateToProvisioningSection();
  await manufacturePlanPage.provisionLineWithManufacturePlan(voiceMinutes, smsCount, dataMB);
  const isActive = await manufacturePlanPage.verifyLineIsActive();
  expect(isActive).toBeTruthy();
});

Given('the line is active with configured APNs', async function() {
  const apnsConfigured = await manufacturePlanPage.verifyAPNsConfiguration();
  expect(apnsConfigured).toBeTruthy();
});

When('the line consumes {int} MB of data through the configured APNs during the billing cycle', async function(consumedMB) {
  await manufacturePlanPage.registerDataConsumption(consumedMB);
  const consumptionRegistered = await manufacturePlanPage.verifyConsumptionRegistered(consumedMB);
  expect(consumptionRegistered).toBeTruthy();
});

When('I check the remaining data balance for the line', async function() {
  await manufacturePlanPage.navigateToBalanceSection();
  await manufacturePlanPage.queryDataBalance();
});

Then('the system should show {int} MB remaining from the {int} MB allowance', async function(remainingMB, totalMB) {
  const displayedRemaining = await manufacturePlanPage.getRemainingDataBalance();
  expect(displayedRemaining).toBe(remainingMB);
});

Then('the invoice should not show any charge for the {int} MB consumed within the allowance', async function(consumedMB) {
  await manufacturePlanPage.navigateToInvoiceSection();
  const hasExtraCharge = await manufacturePlanPage.checkDataChargesInInvoice(consumedMB);
  expect(hasExtraCharge).toBeFalsy();
});