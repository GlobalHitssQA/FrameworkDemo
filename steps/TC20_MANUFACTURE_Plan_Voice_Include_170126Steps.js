const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ManufacturePlanPage = require('../pages/ManufacturePlanPage');

let manufacturePlanPage;

Given('a line is provisioned in MANUFACTURE plan with {int} min VOICE, {int} SMS and {int} MB included', async function(voiceMinutes, smsCount, dataMB) {
  manufacturePlanPage = new ManufacturePlanPage(this.page);
  await manufacturePlanPage.navigateToProvisioningSection();
  await manufacturePlanPage.selectManufacturePlan();
  await manufacturePlanPage.configureIncludedVoiceMinutes(voiceMinutes);
  await manufacturePlanPage.configureIncludedSMS(smsCount);
  await manufacturePlanPage.configureIncludedData(dataMB);
  await manufacturePlanPage.confirmProvisioning();
  const isProvisioned = await manufacturePlanPage.verifyLineProvisioned();
  expect(isProvisioned).toBeTruthy();
});

When('the line registers {int} minutes of local voice consumption during the billing cycle', async function(consumptionMinutes) {
  await manufacturePlanPage.navigateToConsumptionSection();
  await manufacturePlanPage.registerVoiceConsumption(consumptionMinutes);
  const registeredConsumption = await manufacturePlanPage.getRegisteredVoiceConsumption();
  expect(registeredConsumption).toBe(consumptionMinutes);
});

When('the billing process is executed for the corresponding cycle', async function() {
  await manufacturePlanPage.navigateToBillingSection();
  await manufacturePlanPage.executeBillingProcess();
  const billingCompleted = await manufacturePlanPage.verifyBillingProcessCompleted();
  expect(billingCompleted).toBeTruthy();
});

Then('the first {int} minutes should be deducted from included minutes without charge', async function(includedMinutes) {
  await manufacturePlanPage.navigateToInvoiceDetails();
  const includedMinutesApplied = await manufacturePlanPage.getIncludedMinutesApplied();
  const includedMinutesCharge = await manufacturePlanPage.getIncludedMinutesCharge();
  expect(includedMinutesApplied).toBe(includedMinutes);
  expect(includedMinutesCharge).toBe(0);
});

Then('the {int} excess minutes should be billed in bulk at S\/. {float} without IGV', async function(excessMinutes, expectedCharge) {
  const excessMinutesBilled = await manufacturePlanPage.getExcessMinutesBilled();
  const excessChargeWithoutIGV = await manufacturePlanPage.getExcessChargeWithoutIGV();
  const chargeWithIGV = await manufacturePlanPage.getExcessChargeWithIGV();
  expect(excessMinutesBilled).toBe(excessMinutes);
  expect(excessChargeWithoutIGV).toBeCloseTo(expectedCharge, 2);
  expect(chargeWithIGV).toBeCloseTo(0.413, 2);
});