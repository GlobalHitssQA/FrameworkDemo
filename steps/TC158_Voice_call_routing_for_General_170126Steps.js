const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const VoiceRoutingPage = require('../pages/VoiceRoutingPage');

let voiceRoutingPage;

Given('a General Motors line is provisioned in RATEPLAN MANUFACTURE with {int} included voice minutes', async function(includedMinutes) {
  voiceRoutingPage = new VoiceRoutingPage(this.page);
  await voiceRoutingPage.navigateToProvisioningSystem();
  await voiceRoutingPage.provisionLineWithRatePlan('MANUFACTURE', includedMinutes);
  const provisionedMinutes = await voiceRoutingPage.getIncludedVoiceMinutes();
  expect(provisionedMinutes).toBe(includedMinutes);
});

When('the user makes a local voice call with duration less than {int} included minutes', async function(maxMinutes) {
  await voiceRoutingPage.navigateToCallSimulator();
  await voiceRoutingPage.makeLocalVoiceCall(maxMinutes - 2);
});

Then('the RED routing system establishes the call and deducts consumed minutes from included balance', async function() {
  const callStatus = await voiceRoutingPage.getCallStatus();
  expect(callStatus).toBe('ESTABLISHED');
  const routingSystem = await voiceRoutingPage.getRoutingSystemUsed();
  expect(routingSystem).toBe('RED');
});

Then('the consumption records show minutes deducted from included balance without additional charge', async function() {
  await voiceRoutingPage.navigateToConsumptionRecords();
  const chargeApplied = await voiceRoutingPage.getAdditionalChargeAmount();
  expect(chargeApplied).toBe(0);
  const deductedFromIncluded = await voiceRoutingPage.isDeductedFromIncludedBalance();
  expect(deductedFromIncluded).toBe(true);
});

When('the user consumes all {int} included minutes and makes an additional call generating excess', async function(includedMinutes) {
  await voiceRoutingPage.navigateToCallSimulator();
  await voiceRoutingPage.consumeAllIncludedMinutes(includedMinutes);
  await voiceRoutingPage.makeLocalVoiceCall(5);
});

Then('the system allows the additional call and applies bulk rate of {float} PEN per minute for excess', async function(bulkRate) {
  const callStatus = await voiceRoutingPage.getCallStatus();
  expect(callStatus).toBe('ESTABLISHED');
  await voiceRoutingPage.navigateToConsumptionRecords();
  const appliedRate = await voiceRoutingPage.getAppliedBulkRate();
  expect(appliedRate).toBe(bulkRate);
});

When('the user makes a local voice call from a RATEPLAN SOLD line without included voice minutes', async function() {
  await voiceRoutingPage.navigateToProvisioningSystem();
  await voiceRoutingPage.provisionLineWithRatePlan('SOLD', 0);
  await voiceRoutingPage.navigateToCallSimulator();
  await voiceRoutingPage.makeLocalVoiceCall(3);
});

Then('the system applies bulk rate of {float} PEN per minute from the first consumed minute', async function(bulkRate) {
  await voiceRoutingPage.navigateToConsumptionRecords();
  const appliedRate = await voiceRoutingPage.getAppliedBulkRate();
  expect(appliedRate).toBe(bulkRate);
  const includedMinutesUsed = await voiceRoutingPage.getIncludedMinutesUsed();
  expect(includedMinutesUsed).toBe(0);
});

Then('the invoice shows local calls in Additional Local Voice Traffic section with applied rates', async function() {
  await voiceRoutingPage.navigateToInvoiceSection();
  const sectionVisible = await voiceRoutingPage.isAdditionalLocalVoiceTrafficSectionVisible();
  expect(sectionVisible).toBe(true);
  const invoiceDetails = await voiceRoutingPage.getLocalCallsInvoiceDetails();
  expect(invoiceDetails.includedMinutesConsumed).toBeGreaterThan(0);
  expect(invoiceDetails.excessMinutesBilled).toBeGreaterThan(0);
  expect(invoiceDetails.bulkRateApplied).toBe(0.07);
});