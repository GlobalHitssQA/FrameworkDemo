const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7Page = require('../pages/bscs7.page');

let bscs7Page;

Given('the BSCS7 system is available and configured', async function () {
  bscs7Page = new BSCS7Page(this.page);
  await bscs7Page.navigateToSystem();
  await bscs7Page.verifySystemAvailable();
});

Given('the In Pool 10MB package is configured in the system', async function () {
  await bscs7Page.verifyInPool10MBPackageConfigured();
});

Given('the General Motors account is active in BSCS7', async function () {
  await bscs7Page.verifyGeneralMotorsAccountActive();
});

When('I provision a new General Motors line with SOLD plan RatePlan 3', async function () {
  await bscs7Page.navigateToLineProvisioning();
  await bscs7Page.selectGeneralMotorsAccount();
  await bscs7Page.selectSOLDPlanRatePlan3();
  await bscs7Page.confirmLineProvisioning();
});

Then('the line should be provisioned correctly in BSCS7 with SOLD plan assigned', async function () {
  const isProvisioned = await bscs7Page.verifyLineProvisionedWithSOLDPlan();
  expect(isProvisioned).toBeTruthy();
});

When('I verify the In Pool 10MB package assignment in BSCS7', async function () {
  await bscs7Page.navigateToPackageAssignments();
  await bscs7Page.searchProvisionedLine();
});

Then('the In Pool 10MB package should be active and associated to the SOLD plan line without manual intervention', async function () {
  const isAutoAssigned = await bscs7Page.verifyInPool10MBAutoAssigned();
  expect(isAutoAssigned).toBeTruthy();
});

When('I query the package configuration tables for the assigned In Pool package', async function () {
  await bscs7Page.navigateToPackageConfigurationTables();
  await bscs7Page.queryInPoolPackageConfiguration();
});

Then('the package should have capacity of 10MB per line', async function () {
  const capacity = await bscs7Page.getPackageCapacity();
  expect(capacity).toBe('10MB');
});

Then('the package should have rate of 1.30 soles without IGV', async function () {
  const rate = await bscs7Page.getPackageRate();
  expect(rate).toBe('1.30');
});

Then('the package should cover only APN1 and APN4', async function () {
  const apnCoverage = await bscs7Page.getAPNCoverage();
  expect(apnCoverage).toContain('APN1');
  expect(apnCoverage).toContain('APN4');
  expect(apnCoverage.length).toBe(2);
});

Then('the package should apply only to local consumption', async function () {
  const consumptionType = await bscs7Page.getConsumptionType();
  expect(consumptionType).toBe('Local');
});