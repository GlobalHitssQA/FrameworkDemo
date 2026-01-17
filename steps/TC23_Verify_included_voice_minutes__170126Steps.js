const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const UnsoldShowroomPage = require('../pages/UnsoldShowroomPage');

let unsoldShowroomPage;

Given('a line is provisioned in UNSOLD SHOWROOM plan with included benefits', async function () {
  unsoldShowroomPage = new UnsoldShowroomPage(this.page);
  await unsoldShowroomPage.navigateToProvisioningSection();
  await unsoldShowroomPage.provisionLineInUnsoldShowroomPlan();
  const isActive = await unsoldShowroomPage.isLineActiveInPlan();
  expect(isActive).toBeTruthy();
});

Given('the plan has 100 voice minutes, 100 SMS and 2 GB included', async function () {
  const planDetails = await unsoldShowroomPage.getPlanIncludedBenefits();
  expect(planDetails.voiceMinutes).toBe(100);
  expect(planDetails.sms).toBe(100);
  expect(planDetails.dataGB).toBe(2);
});

When('the user consumes 60 voice minutes during the billing cycle', async function () {
  await unsoldShowroomPage.navigateToConsumptionSimulator();
  await unsoldShowroomPage.simulateVoiceConsumption(60);
  await unsoldShowroomPage.confirmConsumptionRegistration();
});

Then('the system registers the consumption of 60 minutes deducted from the 100 included', async function () {
  const consumptionRecord = await unsoldShowroomPage.getVoiceConsumptionRecord();
  expect(consumptionRecord.consumedMinutes).toBe(60);
  expect(consumptionRecord.deductedFromIncluded).toBeTruthy();
});

Then('the remaining voice minutes balance shows 40 minutes', async function () {
  await unsoldShowroomPage.navigateToBalanceSection();
  const remainingMinutes = await unsoldShowroomPage.getRemainingVoiceMinutes();
  expect(remainingMinutes).toBe(40);
});

Then('the invoice does not show charges for the 60 consumed minutes', async function () {
  await unsoldShowroomPage.navigateToInvoiceSection();
  const voiceCharges = await unsoldShowroomPage.getVoiceChargesFromInvoice();
  expect(voiceCharges).toBe(0);
  const includedConsumptionVisible = await unsoldShowroomPage.isIncludedConsumptionDisplayedCorrectly();
  expect(includedConsumptionVisible).toBeTruthy();
});