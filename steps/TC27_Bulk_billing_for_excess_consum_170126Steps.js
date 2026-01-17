const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('a line is provisioned on UNSOLD SHOWROOM plan with {int} voice minutes, {int} SMS and {int} GB included', async function(voiceMinutes, smsCount, dataGB) {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToProvisioning();
  await billingPage.provisionLineWithPlan('UNSOLD - SHOWROOM', voiceMinutes, smsCount, dataGB);
});

Given('the line is active with correct allowances assigned', async function() {
  const isActive = await billingPage.verifyLineIsActive();
  expect(isActive).toBeTruthy();
  const allowances = await billingPage.getAllowancesAssigned();
  expect(allowances.voiceMinutes).toBe(100);
  expect(allowances.sms).toBe(100);
  expect(allowances.dataGB).toBe(2);
});

When('the user consumes {int} voice minutes during the billing cycle', async function(minutes) {
  await billingPage.navigateToConsumptionSimulator();
  await billingPage.simulateVoiceConsumption(minutes);
});

Then('the system registers {int} minutes as included and {int} minutes as bulk excess', async function(includedMinutes, excessMinutes) {
  const consumptionDetails = await billingPage.getVoiceConsumptionDetails();
  expect(consumptionDetails.includedMinutes).toBe(includedMinutes);
  expect(consumptionDetails.excessMinutes).toBe(excessMinutes);
});

When('the user consumes {float} GB of data during the billing cycle', async function(dataGB) {
  await billingPage.simulateDataConsumption(dataGB);
});

Then('the system registers {int} GB as included and {int} MB as bulk excess', async function(includedGB, excessMB) {
  const dataDetails = await billingPage.getDataConsumptionDetails();
  expect(dataDetails.includedGB).toBe(includedGB);
  expect(dataDetails.excessMB).toBe(excessMB);
});

When('the user views the billing invoice for the cycle', async function() {
  await billingPage.navigateToInvoice();
  await billingPage.waitForInvoiceToLoad();
});

Then('the invoice shows {int} voice minutes charged at bulk rate of {float} per minute totaling {float}', async function(minutes, ratePerMinute, total) {
  const voiceCharges = await billingPage.getVoiceBulkCharges();
  expect(voiceCharges.minutes).toBe(minutes);
  expect(voiceCharges.ratePerMinute).toBeCloseTo(ratePerMinute, 2);
  expect(voiceCharges.total).toBeCloseTo(total, 2);
});

Then('the invoice shows {int} MB charged at bulk rate of {float} per MB totaling {float}', async function(megabytes, ratePerMB, total) {
  const dataCharges = await billingPage.getDataBulkCharges();
  expect(dataCharges.megabytes).toBe(megabytes);
  expect(dataCharges.ratePerMB).toBeCloseTo(ratePerMB, 4);
  expect(dataCharges.total).toBeCloseTo(total, 2);
});