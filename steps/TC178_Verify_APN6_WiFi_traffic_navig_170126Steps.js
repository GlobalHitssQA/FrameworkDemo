const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SoldPlanTrafficPage = require('../pages/SoldPlanTrafficPage');

let soldPlanTrafficPage;

Given('a line is provisioned in SOLD plan with APN6 configured for WiFi traffic', async function () {
  soldPlanTrafficPage = new SoldPlanTrafficPage(this.page);
  await soldPlanTrafficPage.navigateToProvisioningSystem();
  await soldPlanTrafficPage.provisionLineWithSoldPlan();
  await soldPlanTrafficPage.configureApn6ForWifiTraffic();
  const isProvisioned = await soldPlanTrafficPage.verifyLineProvisionedWithApn6();
  expect(isProvisioned).toBeTruthy();
});

When('the line generates 500 MB of traffic through APN6 during the billing cycle', async function () {
  await soldPlanTrafficPage.navigateToTrafficSimulator();
  await soldPlanTrafficPage.generateApn6Traffic('500');
  await soldPlanTrafficPage.waitForTrafficRegistration();
});

Then('the system registers 500 MB consumption in UDR_LT_01 table', async function () {
  await soldPlanTrafficPage.navigateToUdrConsole();
  const registeredTraffic = await soldPlanTrafficPage.getUdrLt01TrafficRecord();
  expect(registeredTraffic).toContain('500');
});

Then('the APN6 traffic is charged at bulk rate and excluded from In Pool calculation', async function () {
  await soldPlanTrafficPage.navigateToBillingSystem();
  const isExcludedFromInPool = await soldPlanTrafficPage.verifyTrafficExcludedFromInPool();
  expect(isExcludedFromInPool).toBeTruthy();
  const chargeType = await soldPlanTrafficPage.getApn6ChargeType();
  expect(chargeType).toBe('GRANEL');
});

Then('the system generates a charge of S\/. 101.65 without IGV for 500 MB at S\/. 0.2033 per MB', async function () {
  const totalCharge = await soldPlanTrafficPage.getApn6TotalCharge();
  expect(totalCharge).toBe('101.65');
  const ratePerMb = await soldPlanTrafficPage.getApn6RatePerMb();
  expect(ratePerMb).toBe('0.2033');
});

Then('the invoice displays APN6 consumption in Additional Services and Traffic Detail sections with Plan equals SOLD', async function () {
  await soldPlanTrafficPage.navigateToInvoicePreview();
  const isInAdditionalServices = await soldPlanTrafficPage.verifyApn6InAdditionalServicesSection();
  expect(isInAdditionalServices).toBeTruthy();
  const isInTrafficDetail = await soldPlanTrafficPage.verifyApn6InTrafficDetailSection();
  expect(isInTrafficDetail).toBeTruthy();
  const planValue = await soldPlanTrafficPage.getPlanFieldValue();
  expect(planValue).toBe('SOLD');
});

Then('the line can activate and consume Trial 6GB and B2B2C commercial packages without conflict', async function () {
  await soldPlanTrafficPage.navigateToPackageManagement();
  await soldPlanTrafficPage.activateTrial6GbPackage();
  const isTrial6GbActive = await soldPlanTrafficPage.verifyPackageActivation('TRIAL_6GB');
  expect(isTrial6GbActive).toBeTruthy();
  await soldPlanTrafficPage.activateB2b2cPackage();
  const isB2b2cActive = await soldPlanTrafficPage.verifyPackageActivation('B2B2C');
  expect(isB2b2cActive).toBeTruthy();
  const hasConflict = await soldPlanTrafficPage.checkPackageConflictWithBulkTraffic();
  expect(hasConflict).toBeFalsy();
});