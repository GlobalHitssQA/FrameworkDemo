const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TrialPackagePage = require('../pages/TrialPackagePage');

let trialPackagePage;
let activationDate;
let expirationDate;

Given('a user has an active GM line with SOLD plan', async function () {
  trialPackagePage = new TrialPackagePage(this.page);
  await trialPackagePage.navigateToLineManagement();
  await trialPackagePage.verifyActiveGMLineWithSOLDPlan();
});

Given('TRIAL 6GB package is configured with 90 days validity in BSCS7', async function () {
  await trialPackagePage.navigateToBSCS7Configuration();
  await trialPackagePage.verifyTrialPackageValidityConfiguration(90);
});

When('I activate a TRIAL 6GB package on the line and record the activation date', async function () {
  activationDate = await trialPackagePage.activateTrialPackage();
});

Then('the TRIAL 6GB package is activated with 90 days validity and calculated expiration date', async function () {
  const packageStatus = await trialPackagePage.getPackageStatus();
  expect(packageStatus.isActive).toBe(true);
  expect(packageStatus.validityDays).toBe(90);
  expirationDate = await trialPackagePage.getExpirationDate();
  expect(expirationDate).toBeTruthy();
});

When('I consume 2GB of the TRIAL 6GB package during the first 30 days', async function () {
  await trialPackagePage.simulateDataConsumption(2048);
});

Then('the package registers 2GB consumption with 4GB remaining available', async function () {
  const consumptionInfo = await trialPackagePage.getConsumptionInfo();
  expect(consumptionInfo.consumedMB).toBe(2048);
  expect(consumptionInfo.remainingMB).toBe(4096);
});

When('I simulate time passing until day 89 of validity', async function () {
  await trialPackagePage.simulateTimePassing(89);
});

Then('the package remains active with 4GB available', async function () {
  const packageStatus = await trialPackagePage.getPackageStatus();
  expect(packageStatus.isActive).toBe(true);
  const consumptionInfo = await trialPackagePage.getConsumptionInfo();
  expect(consumptionInfo.remainingMB).toBe(4096);
});

When('I simulate time passing until exactly 90 days of validity are completed', async function () {
  await trialPackagePage.simulateTimePassing(90);
});

Then('the system automatically marks the TRIAL 6GB package as expired by time', async function () {
  const packageStatus = await trialPackagePage.getPackageStatus();
  expect(packageStatus.isActive).toBe(false);
  expect(packageStatus.expirationReason).toBe('TIME_EXPIRED');
});

When('I attempt to consume data with the expired TRIAL 6GB package', async function () {
  await trialPackagePage.attemptDataConsumption(100);
});

Then('the system does not allow consumption from the expired package and switches to the next queued package or bulk rate', async function () {
  const consumptionResult = await trialPackagePage.getLastConsumptionResult();
  expect(consumptionResult.packageUsed).not.toBe('TRIAL_6GB');
  expect(['QUEUED_PACKAGE', 'BULK_RATE']).toContain(consumptionResult.fallbackType);
});