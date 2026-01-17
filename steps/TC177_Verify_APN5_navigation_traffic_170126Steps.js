const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SoldPlanPage = require('../pages/SoldPlanPage');

let soldPlanPage;

Given('a line is provisioned in SOLD plan with APN5 configured for IPv4 IPv6 infotainment FOTA navigation', async function () {
  soldPlanPage = new SoldPlanPage(this.page);
  await soldPlanPage.navigateToProvisioningSection();
  await soldPlanPage.provisionLineWithSoldPlan();
  await soldPlanPage.configureApn5ForNavigation();
  const isProvisioned = await soldPlanPage.verifyLineProvisionedWithApn5();
  expect(isProvisioned).toBeTruthy();
});

When('traffic of 350 MB is generated through APN5 during the billing cycle', async function () {
  await soldPlanPage.navigateToTrafficSimulator();
  await soldPlanPage.generateApn5Traffic(350);
  await soldPlanPage.waitForTrafficProcessing();
});

Then('the system records the consumption of 350 MB in UDR_LT_01 table', async function () {
  await soldPlanPage.navigateToUdrTable();
  const recordedConsumption = await soldPlanPage.getRecordedConsumptionFromUdr();
  expect(recordedConsumption).toBe('350');
});

Then('the APN5 traffic is charged at bulk rate and excluded from In Pool calculation', async function () {
  await soldPlanPage.navigateToBillingDetails();
  const isExcludedFromInPool = await soldPlanPage.verifyTrafficExcludedFromInPool();
  expect(isExcludedFromInPool).toBeTruthy();
  const isBulkRateApplied = await soldPlanPage.verifyBulkRateApplied();
  expect(isBulkRateApplied).toBeTruthy();
});

Then('the system generates a charge of 71.16 soles without tax for 350 MB at 0.2033 soles per MB', async function () {
  const totalCharge = await soldPlanPage.getTotalChargeWithoutTax();
  expect(totalCharge).toBe('71.16');
  const ratePerMb = await soldPlanPage.getRatePerMb();
  expect(ratePerMb).toBe('0.2033');
});

Then('the APN5 traffic is displayed in Additional Services section with Plan field set to SOLD', async function () {
  await soldPlanPage.navigateToInvoice();
  await soldPlanPage.expandAdditionalServicesSection();
  const planValue = await soldPlanPage.getPlanValueFromAdditionalServices();
  expect(planValue).toBe('SOLD');
  const isApn5Displayed = await soldPlanPage.verifyApn5InAdditionalServices();
  expect(isApn5Displayed).toBeTruthy();
});

Then('the APN5 traffic is displayed in Traffic Detail section with Plan field set to SOLD', async function () {
  await soldPlanPage.expandTrafficDetailSection();
  const planValueInDetail = await soldPlanPage.getPlanValueFromTrafficDetail();
  expect(planValueInDetail).toBe('SOLD');
  const isApn5InTrafficDetail = await soldPlanPage.verifyApn5InTrafficDetail();
  expect(isApn5InTrafficDetail).toBeTruthy();
});