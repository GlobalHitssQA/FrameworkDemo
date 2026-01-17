const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const VoiceTrafficPage = require('../pages/VoiceTrafficPage');

let voiceTrafficPage;

Given('a line is provisioned in the UNSOLD SHOWROOM plan with VoLTE enabled', async function() {
  voiceTrafficPage = new VoiceTrafficPage(this.page);
  await voiceTrafficPage.navigateToProvisioningSection();
  await voiceTrafficPage.selectPlan('UNSOLD - SHOWROOM');
  await voiceTrafficPage.enableVoLTEService();
  await voiceTrafficPage.provisionLine();
  const isProvisioned = await voiceTrafficPage.verifyLineProvisioned();
  expect(isProvisioned).toBeTruthy();
});

When('the user generates {int} minutes of local voice traffic during the billing cycle', async function(minutes) {
  await voiceTrafficPage.navigateToTrafficSimulator();
  await voiceTrafficPage.generateLocalVoiceTraffic(minutes);
});

Then('the system should record {int} minutes consumption in the traffic table', async function(minutes) {
  await voiceTrafficPage.navigateToTrafficTable();
  const recordedMinutes = await voiceTrafficPage.getRecordedLocalMinutes();
  expect(recordedMinutes).toBe(minutes);
});

Then('the system should deduct {int} included minutes from the plan', async function(includedMinutes) {
  const deductedMinutes = await voiceTrafficPage.getDeductedIncludedMinutes();
  expect(deductedMinutes).toBe(includedMinutes);
});

Then('the system should mark {int} minutes as excess consumption', async function(excessMinutes) {
  const excess = await voiceTrafficPage.getExcessMinutes();
  expect(excess).toBe(excessMinutes);
});

When('the excess of {int} minutes is validated for bulk rate charging', async function(excessMinutes) {
  await voiceTrafficPage.navigateToBillingSection();
  await voiceTrafficPage.validateExcessCharges(excessMinutes);
});

Then('the system should generate a charge of {float} soles without IGV for the excess', async function(expectedCharge) {
  const charge = await voiceTrafficPage.getExcessVoiceCharge();
  expect(charge).toBeCloseTo(expectedCharge, 2);
});

When('the user generates {int} minutes of roaming voice traffic', async function(roamingMinutes) {
  await voiceTrafficPage.navigateToTrafficSimulator();
  await voiceTrafficPage.generateRoamingVoiceTraffic(roamingMinutes);
});

Then('the system should charge {int} roaming minutes at bulk rate of {float} soles per minute', async function(minutes, rate) {
  const roamingRate = await voiceTrafficPage.getRoamingRatePerMinute();
  expect(roamingRate).toBeCloseTo(rate, 2);
  const chargedMinutes = await voiceTrafficPage.getRoamingMinutesCharged();
  expect(chargedMinutes).toBe(minutes);
});

Then('the system should generate a roaming charge of {float} soles without IGV', async function(expectedRoamingCharge) {
  const roamingCharge = await voiceTrafficPage.getRoamingVoiceCharge();
  expect(roamingCharge).toBeCloseTo(expectedRoamingCharge, 2);
});