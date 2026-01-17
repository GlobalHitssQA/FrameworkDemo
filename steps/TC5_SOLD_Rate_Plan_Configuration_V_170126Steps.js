const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7RatePlanPage = require('../pages/BSCS7RatePlanPage');

let bscs7Page;

Given('I am logged into the BSCS7 system with query permissions', async function () {
  bscs7Page = new BSCS7RatePlanPage(this.page);
  await bscs7Page.navigateToSystem();
  await bscs7Page.login();
  const isLoggedIn = await bscs7Page.verifyQueryPermissions();
  expect(isLoggedIn).toBeTruthy();
});

When('I access the SOLD Rate Plan configuration', async function () {
  await bscs7Page.navigateToRatePlanConfiguration();
  await bscs7Page.selectRatePlan('SOLD');
});

Then('the system displays the SOLD Rate Plan homologated with current RP3', async function () {
  const ratePlanInfo = await bscs7Page.getRatePlanDetails();
  expect(ratePlanInfo.name).toBe('SOLD');
  expect(ratePlanInfo.homologatedWith).toBe('RP3');
});

Then('the In Pool 10MB package is configured with price {float} per package and {float} per MB excess without IGV', async function (packagePrice, excessPrice) {
  const packageConfig = await bscs7Page.getInPoolPackageConfiguration();
  expect(packageConfig.packageSize).toBe('10MB');
  expect(packageConfig.pricePerPackage).toBe(packagePrice);
  expect(packageConfig.excessPricePerMB).toBe(excessPrice);
  expect(packageConfig.includesIGV).toBe(false);
  const paramTableValue = await bscs7Page.verifyParametricTable('TIM.BSCST_FECT_RNG_PARAM');
  expect(paramTableValue).toBeTruthy();
});

Then('the In Pool package is restricted to APN1 Onstarsa and APN4 Onstar01v6 for telemetry traffic', async function () {
  const apnRestrictions = await bscs7Page.getInPoolAPNRestrictions();
  expect(apnRestrictions).toContain('APN1 Onstarsa');
  expect(apnRestrictions).toContain('APN4 Onstar01.v6');
  expect(apnRestrictions.length).toBe(2);
});

Then('APN2 gmsa, APN5 onstarlmu and APN6 onstarvlrp are configured for bulk billing at {float} per MB', async function (bulkRate) {
  const bulkBillingConfig = await bscs7Page.getBulkBillingConfiguration();
  expect(bulkBillingConfig.apns).toContain('APN2 gmsa');
  expect(bulkBillingConfig.apns).toContain('APN5 onstarlmu');
  expect(bulkBillingConfig.apns).toContain('APN6 onstarvlrp');
  expect(bulkBillingConfig.ratePerMB).toBe(bulkRate);
  expect(bulkBillingConfig.inPoolParticipation).toBe(false);
});

Then('the SOLD Rate Plan allows activation of TRIAL 6GB and B2B2C packages', async function () {
  const allowedPackages = await bscs7Page.getAllowedPackageTypes();
  expect(allowedPackages).toContain('TRIAL 6GB');
  expect(allowedPackages).toContain('B2B2C');
});

Then('the In Pool modality is configured only for local consumption excluding Roaming traffic', async function () {
  const inPoolModality = await bscs7Page.getInPoolModalityConfiguration();
  expect(inPoolModality.localConsumption).toBe(true);
  expect(inPoolModality.roamingIncluded).toBe(false);
});