const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PackageQueuePage = require('../pages/PackageQueuePage');

let packageQueuePage;

Given('a user has an active GM line on SOLD plan', async function() {
  packageQueuePage = new PackageQueuePage(this.page);
  await packageQueuePage.navigateToPackageManagement();
  await packageQueuePage.verifyUserHasActiveGMLine();
});

Given('the queue system is operational in BSCS7', async function() {
  await packageQueuePage.verifyQueueSystemOperational();
});

When('I activate a B2B2C package of 6GB on the line', async function() {
  await packageQueuePage.activatePackage('B2B2C', '6GB');
});

Then('the B2B2C 6GB package should be marked as active for consumption', async function() {
  const status = await packageQueuePage.getPackageStatus('B2B2C', '6GB');
  expect(status).toBe('active');
});

When('I activate a second B2B2C package of 10GB on the same line', async function() {
  await packageQueuePage.activatePackage('B2B2C', '10GB');
});

Then('the second package should be queued without starting consumption', async function() {
  const status = await packageQueuePage.getPackageStatus('B2B2C', '10GB');
  expect(status).toBe('queued');
  const consumption = await packageQueuePage.getPackageConsumption('B2B2C', '10GB');
  expect(consumption).toBe('0GB');
});

When('I consume 3GB of data on the line', async function() {
  await packageQueuePage.simulateDataConsumption('3GB');
});

Then('the consumption should be deducted only from the first active 6GB package', async function() {
  const consumed = await packageQueuePage.getPackageConsumedAmount('B2B2C', '6GB');
  expect(consumed).toBe('3GB');
});

Then('the first package should show 3GB remaining', async function() {
  const remaining = await packageQueuePage.getPackageRemainingAmount('B2B2C', '6GB');
  expect(remaining).toBe('3GB');
});

When('I completely exhaust the first package by consuming all 6GB', async function() {
  await packageQueuePage.simulateDataConsumption('3GB');
});

Then('the first B2B2C 6GB package should be marked as 100% depleted', async function() {
  const percentage = await packageQueuePage.getPackageConsumptionPercentage('B2B2C', '6GB');
  expect(percentage).toBe('100%');
  const status = await packageQueuePage.getPackageStatus('B2B2C', '6GB');
  expect(status).toBe('depleted');
});

Then('the second queued package should automatically become active', async function() {
  const status = await packageQueuePage.getPackageStatus('B2B2C', '10GB');
  expect(status).toBe('active');
});

Then('the B2B2C 10GB package should be ready for consumption', async function() {
  const isReady = await packageQueuePage.isPackageReadyForConsumption('B2B2C', '10GB');
  expect(isReady).toBe(true);
});

When('I consume an additional 2GB on the line', async function() {
  await packageQueuePage.simulateDataConsumption('2GB');
});

Then('the consumption should be deducted from the second now active package', async function() {
  const consumed = await packageQueuePage.getPackageConsumedAmount('B2B2C', '10GB');
  expect(consumed).toBe('2GB');
});

Then('the second package should show 8GB remaining', async function() {
  const remaining = await packageQueuePage.getPackageRemainingAmount('B2B2C', '10GB');
  expect(remaining).toBe('8GB');
});