const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const B2B2CPackagePage = require('../pages/B2B2CPackagePage');

let b2b2cPackagePage;

Given('a user with an active GM line on SOLD plan', async function () {
  b2b2cPackagePage = new B2B2CPackagePage(this.page);
  await b2b2cPackagePage.navigateToPackageManagement();
  await b2b2cPackagePage.verifyUserHasActiveGMLine();
});

Given('B2B2C packages are configured in the system', async function () {
  await b2b2cPackagePage.verifyB2B2CPackagesConfigured();
});

Given('consumption notifications at 80% and 100% are configured', async function () {
  await b2b2cPackagePage.verifyConsumptionNotificationsConfigured();
});

When('the user activates a B2B2C 10GB package with 1 month validity on SOLD plan', async function () {
  await b2b2cPackagePage.selectB2B2CPackage('10GB');
  await b2b2cPackagePage.setPackageValidity('1 month');
  await b2b2cPackagePage.activatePackage();
});

Then('the B2B2C 10GB package is activated with 10GB available', async function () {
  const packageStatus = await b2b2cPackagePage.getPackageStatus();
  expect(packageStatus).toBe('active');
  const availableData = await b2b2cPackagePage.getAvailableData();
  expect(availableData).toBe('10GB');
});

When('the user consumes 8GB of the B2B2C 10GB package during the first 15 days', async function () {
  await b2b2cPackagePage.simulateDataConsumption('8GB');
});

Then('the package registers 8GB consumption with 2GB remaining', async function () {
  const consumedData = await b2b2cPackagePage.getConsumedData();
  expect(consumedData).toBe('8GB');
  const remainingData = await b2b2cPackagePage.getRemainingData();
  expect(remainingData).toBe('2GB');
});

Then('a notification at 80% consumption is generated', async function () {
  const notification80 = await b2b2cPackagePage.verifyNotificationGenerated('80%');
  expect(notification80).toBeTruthy();
});

When('the user consumes the remaining 2GB to exhaust the package completely', async function () {
  await b2b2cPackagePage.simulateDataConsumption('2GB');
});

Then('the B2B2C 10GB package registers total consumption of 10GB', async function () {
  const totalConsumed = await b2b2cPackagePage.getConsumedData();
  expect(totalConsumed).toBe('10GB');
});

Then('the system automatically marks the B2B2C 10GB package as exhausted and expired before the month validity ends', async function () {
  const packageStatus = await b2b2cPackagePage.getPackageStatus();
  expect(packageStatus).toBe('exhausted');
  const expirationReason = await b2b2cPackagePage.getExpirationReason();
  expect(expirationReason).toBe('consumption_complete');
});

Then('the system generates automatic notification informing complete consumption of B2B2C package', async function () {
  const notification100 = await b2b2cPackagePage.verifyNotificationGenerated('100%');
  expect(notification100).toBeTruthy();
});

When('the user attempts to consume additional data with the exhausted B2B2C package', async function () {
  await b2b2cPackagePage.attemptAdditionalConsumption();
});

Then('the system does not allow consumption from the exhausted package', async function () {
  const consumptionBlocked = await b2b2cPackagePage.isConsumptionBlocked();
  expect(consumptionBlocked).toBeTruthy();
});

Then('the system activates the next queued package or bulk rate', async function () {
  const fallbackActivated = await b2b2cPackagePage.verifyFallbackActivated();
  expect(fallbackActivated).toBeTruthy();
});