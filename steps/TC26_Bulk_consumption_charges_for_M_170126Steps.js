const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ManufacturePlanPage = require('../pages/ManufacturePlanPage');

let manufacturePlanPage;

Given('a line is provisioned with MANUFACTURE plan with {int} minutes voice, {int} SMS and {int} MB data included', async function(voiceMinutes, smsCount, dataMB) {
  manufacturePlanPage = new ManufacturePlanPage(this.page);
  await manufacturePlanPage.navigateToProvisioningSection();
  await manufacturePlanPage.provisionLineWithManufacturePlan(voiceMinutes, smsCount, dataMB);
});

Given('the line is active with assigned included limits', async function() {
  const isActive = await manufacturePlanPage.verifyLineIsActive();
  expect(isActive).toBe(true);
  const hasIncludedLimits = await manufacturePlanPage.verifyIncludedLimitsAssigned();
  expect(hasIncludedLimits).toBe(true);
});

When('the user consumes {int} SMS during the billing cycle', async function(smsCount) {
  await manufacturePlanPage.navigateToConsumptionSection();
  await manufacturePlanPage.registerSMSConsumption(smsCount);
});

Then('the system registers {int} SMS as included and {int} SMS as bulk excess', async function(includedSMS, excessSMS) {
  const includedCount = await manufacturePlanPage.getIncludedSMSCount();
  const excessCount = await manufacturePlanPage.getExcessSMSCount();
  expect(includedCount).toBe(includedSMS);
  expect(excessCount).toBe(excessSMS);
});

When('the user consumes {int} MB of data during the billing cycle', async function(dataMB) {
  await manufacturePlanPage.registerDataConsumption(dataMB);
});

Then('the system registers {int} MB as included and {int} MB as bulk excess', async function(includedMB, excessMB) {
  const includedData = await manufacturePlanPage.getIncludedDataMB();
  const excessData = await manufacturePlanPage.getExcessDataMB();
  expect(includedData).toBe(includedMB);
  expect(excessData).toBe(excessMB);
});

When('the user views the billing invoice for the cycle', async function() {
  await manufacturePlanPage.navigateToBillingInvoice();
});

Then('the invoice shows {int} SMS charged at bulk rate of {float} PEN per SMS totaling {float} PEN', async function(smsCount, ratePerSMS, totalAmount) {
  const invoiceSMSCount = await manufacturePlanPage.getInvoiceBulkSMSCount();
  const invoiceSMSRate = await manufacturePlanPage.getInvoiceBulkSMSRate();
  const invoiceSMSTotal = await manufacturePlanPage.getInvoiceBulkSMSTotal();
  expect(invoiceSMSCount).toBe(smsCount);
  expect(invoiceSMSRate).toBeCloseTo(ratePerSMS, 2);
  expect(invoiceSMSTotal).toBeCloseTo(totalAmount, 2);
});

Then('the invoice shows {int} MB charged at bulk rate of {float} PEN per MB totaling {float} PEN', async function(dataMB, ratePerMB, totalAmount) {
  const invoiceDataMB = await manufacturePlanPage.getInvoiceBulkDataMB();
  const invoiceDataRate = await manufacturePlanPage.getInvoiceBulkDataRate();
  const invoiceDataTotal = await manufacturePlanPage.getInvoiceBulkDataTotal();
  expect(invoiceDataMB).toBe(dataMB);
  expect(invoiceDataRate).toBeCloseTo(ratePerMB, 4);
  expect(invoiceDataTotal).toBeCloseTo(totalAmount, 3);
});