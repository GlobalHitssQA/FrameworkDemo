const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TrialPackagePage = require('../pages/TrialPackagePage');

let trialPackagePage;

Given('a user with an active GM line on SOLD plan', async function () {
  trialPackagePage = new TrialPackagePage(this.page);
  await trialPackagePage.navigateToPackageManagement();
  await trialPackagePage.verifyUserHasActiveGMLine();
});

Given('a TRIAL 6GB package is configured with notifications at 80% and 100%', async function () {
  await trialPackagePage.verifyNotificationsConfigured();
});

When('the user activates a TRIAL 6GB package on the line', async function () {
  await trialPackagePage.activateTrialPackage();
});

Then('the TRIAL 6GB package should be activated with 6GB available', async function () {
  const availableData = await trialPackagePage.getAvailableDataGB();
  expect(availableData).toBe(6);
  const status = await trialPackagePage.getPackageStatus();
  expect(status).toBe('active');
});

When('the user consumes {int}GB of the TRIAL 6GB package', async function (gbAmount) {
  await trialPackagePage.simulateDataConsumption(gbAmount);
});

Then('the package should register {int}GB consumption with {int}GB remaining', async function (consumed, remaining) {
  const consumedData = await trialPackagePage.getConsumedDataGB();
  expect(consumedData).toBe(consumed);
  const availableData = await trialPackagePage.getAvailableDataGB();
  expect(availableData).toBe(remaining);
});

Then('the system should generate an automatic notification at 80% consumption', async function () {
  const notification = await trialPackagePage.getNotificationAt80Percent();
  expect(notification).toBeTruthy();
});

When('the user consumes the remaining 1GB to exhaust the package', async function () {
  await trialPackagePage.simulateDataConsumption(1);
});

Then('the TRIAL 6GB package should register total consumption of 6GB', async function () {
  const consumedData = await trialPackagePage.getConsumedDataGB();
  expect(consumedData).toBe(6);
});

Then('the system should automatically mark the TRIAL 6GB package as exhausted and expired', async function () {
  const status = await trialPackagePage.getPackageStatus();
  expect(status).toBe('expired');
  const isExhausted = await trialPackagePage.isPackageExhausted();
  expect(isExhausted).toBe(true);
});

Then('the system should generate an automatic notification for 100% consumption', async function () {
  const notification = await trialPackagePage.getNotificationAt100Percent();
  expect(notification).toBeTruthy();
});