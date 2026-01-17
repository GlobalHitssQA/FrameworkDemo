const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SoldPlanPage = require('../pages/SoldPlanPage');

let soldPlanPage;

Given('a line is provisioned on SOLD plan with VoLTE service enabled', async function () {
  soldPlanPage = new SoldPlanPage(this.page);
  await soldPlanPage.navigateToProvisioningSection();
  await soldPlanPage.provisionLineWithSoldPlan();
  await soldPlanPage.enableVoLTEService();
  const isProvisioned = await soldPlanPage.verifyLineProvisioned();
  expect(isProvisioned).toBeTruthy();
});

Given('the SOLD plan has no included voice minutes', async function () {
  const includedMinutes = await soldPlanPage.getIncludedVoiceMinutes();
  expect(includedMinutes).toBe(0);
});

When('the user generates {int} minutes of local voice traffic during the billing cycle', async function (minutes) {
  await soldPlanPage.navigateToTrafficGeneration();
  await soldPlanPage.generateLocalVoiceTraffic(minutes);
});

Then('the system should register {int} minutes consumption in the traffic table', async function (expectedMinutes) {
  await soldPlanPage.navigateToTrafficTable();
  const registeredMinutes = await soldPlanPage.getRegisteredLocalMinutes();
  expect(registeredMinutes).toBe(expectedMinutes);
});

Then('all {int} minutes should be charged at bulk rate without deducting included minutes', async function (minutes) {
  const chargedMinutes = await soldPlanPage.getBulkRateChargedMinutes();
  expect(chargedMinutes).toBe(minutes);
  const deductedIncluded = await soldPlanPage.getDeductedIncludedMinutes();
  expect(deductedIncluded).toBe(0);
});

Then('the system should generate a charge of S\/. {float} excluding IGV for {int} minutes at S\/. {float} per minute', async function (expectedCharge, minutes, ratePerMinute) {
  const totalCharge = await soldPlanPage.getLocalVoiceCharge();
  expect(totalCharge).toBeCloseTo(expectedCharge, 2);
  const calculatedCharge = minutes * ratePerMinute;
  expect(totalCharge).toBeCloseTo(calculatedCharge, 2);
});

When('the user generates {int} minutes of roaming voice traffic', async function (minutes) {
  await soldPlanPage.navigateToTrafficGeneration();
  await soldPlanPage.generateRoamingVoiceTraffic(minutes);
});

Then('the system should register {int} minutes of roaming consumption', async function (expectedMinutes) {
  await soldPlanPage.navigateToTrafficTable();
  const registeredRoamingMinutes = await soldPlanPage.getRegisteredRoamingMinutes();
  expect(registeredRoamingMinutes).toBe(expectedMinutes);
});

Then('the system should generate a charge of S\/. {float} excluding IGV for {int} roaming minutes at S\/. {float} per minute', async function (expectedCharge, minutes, ratePerMinute) {
  const roamingCharge = await soldPlanPage.getRoamingVoiceCharge();
  expect(roamingCharge).toBeCloseTo(expectedCharge, 2);
  const calculatedCharge = minutes * ratePerMinute;
  expect(roamingCharge).toBeCloseTo(calculatedCharge, 2);
});