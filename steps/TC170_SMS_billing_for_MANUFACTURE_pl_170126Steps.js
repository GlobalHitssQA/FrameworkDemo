const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ManufacturePlanPage = require('../pages/ManufacturePlanPage');

let manufacturePlanPage;

Given('a line is provisioned in MANUFACTURE plan with {int} included SMS', async function(includedSms) {
  manufacturePlanPage = new ManufacturePlanPage(this.page);
  await manufacturePlanPage.navigateToProvisioningSection();
  await manufacturePlanPage.provisionLineInManufacturePlan(includedSms);
  const isProvisioned = await manufacturePlanPage.verifyLineProvisionedSuccessfully();
  expect(isProvisioned).toBeTruthy();
});

Given('BSCS7 shows the line has {int} included SMS in the billing cycle', async function(expectedSms) {
  await manufacturePlanPage.navigateToBSCS7Console();
  const includedSms = await manufacturePlanPage.getIncludedSmsFromBSCS7();
  expect(includedSms).toBe(expectedSms);
});

When('the user sends {int} SMS within the billing cycle', async function(smsCount) {
  await manufacturePlanPage.navigateToSmsConsumptionSection();
  await manufacturePlanPage.sendSmsMessages(smsCount);
});

Then('the consumption is deducted from included SMS without additional charges', async function() {
  const additionalCharges = await manufacturePlanPage.getAdditionalSmsCharges();
  expect(additionalCharges).toBe(0);
  const remainingIncluded = await manufacturePlanPage.getRemainingIncludedSms();
  expect(remainingIncluded).toBeGreaterThanOrEqual(0);
});

When('the user sends {int} additional SMS exceeding the {int} included SMS', async function(additionalSms, includedLimit) {
  await manufacturePlanPage.sendSmsMessages(additionalSms);
});

Then('the system registers {int} excess SMS with bulk rate of {float} per SMS without tax', async function(excessCount, bulkRate) {
  await manufacturePlanPage.navigateToConsumptionDetail();
  const excessSms = await manufacturePlanPage.getExcessSmsCount();
  const registeredRate = await manufacturePlanPage.getBulkRatePerSms();
  expect(excessSms).toBe(excessCount);
  expect(registeredRate).toBe(bulkRate);
});

Then('the invoice shows charges only for the {int} excess SMS at bulk rate', async function(excessCount) {
  await manufacturePlanPage.navigateToInvoiceSection();
  const invoicedExcessSms = await manufacturePlanPage.getInvoicedExcessSmsCount();
  const includedSmsCharge = await manufacturePlanPage.getIncludedSmsChargeOnInvoice();
  expect(invoicedExcessSms).toBe(excessCount);
  expect(includedSmsCharge).toBe(0);
});