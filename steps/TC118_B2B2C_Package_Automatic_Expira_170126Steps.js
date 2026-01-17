const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const B2B2CPackagePage = require('../pages/B2B2CPackagePage');

let b2b2cPackagePage;

Given('a user with an active GM line on SOLD plan', async function () {
  b2b2cPackagePage = new B2B2CPackagePage(this.page);
  await b2b2cPackagePage.navigateToPackageManagement();
  await b2b2cPackagePage.verifyUserHasActiveGMLine();
});

Given('the B2B2C packages are configured with validity periods of 1, 12, 24 and 36 months', async function () {
  await b2b2cPackagePage.verifyPackageValidityConfigurations();
});

Given('the validity control system is operational', async function () {
  await b2b2cPackagePage.verifyValidityControlSystemStatus();
});

When('I activate a B2B2C 6GB package with 1 month validity of 30 days', async function () {
  await b2b2cPackagePage.selectPackageType('B2B2C');
  await b2b2cPackagePage.selectPackageCapacity('6GB');
  await b2b2cPackagePage.selectValidityPeriod('1 month');
  await b2b2cPackagePage.clickActivatePackage();
});

Then('the B2B2C 6GB package is activated with 30 days validity', async function () {
  const packageStatus = await b2b2cPackagePage.getPackageStatus();
  expect(packageStatus).toBe('active');
  const validityDays = await b2b2cPackagePage.getPackageValidityDays();
  expect(validityDays).toBe(30);
});

When('I simulate the passage of 30 complete days without exhausting the package capacity', async function () {
  await b2b2cPackagePage.simulateTimePassing(30);
  await b2b2cPackagePage.setConsumedData('0GB');
});

Then('the system automatically marks the B2B2C 6GB package as expired by time on day 30', async function () {
  const packageStatus = await b2b2cPackagePage.getPackageStatus();
  expect(packageStatus).toBe('expired');
  const expirationReason = await b2b2cPackagePage.getExpirationReason();
  expect(expirationReason).toBe('time');
});

When('I activate a B2B2C 12GB package with 12 months validity of 360 days', async function () {
  await b2b2cPackagePage.selectPackageType('B2B2C');
  await b2b2cPackagePage.selectPackageCapacity('12GB');
  await b2b2cPackagePage.selectValidityPeriod('12 months');
  await b2b2cPackagePage.clickActivatePackage();
});

Then('the B2B2C 12GB package is activated with 360 days validity', async function () {
  const packageStatus = await b2b2cPackagePage.getPackageStatus();
  expect(packageStatus).toBe('active');
  const validityDays = await b2b2cPackagePage.getPackageValidityDays();
  expect(validityDays).toBe(360);
});

When('I simulate the passage of 360 complete days with partial consumption of 8GB', async function () {
  await b2b2cPackagePage.simulateTimePassing(360);
  await b2b2cPackagePage.setConsumedData('8GB');
});

Then('the system marks the B2B2C 12GB package as expired by time on day 360 with 4GB unconsumed', async function () {
  const packageStatus = await b2b2cPackagePage.getPackageStatus();
  expect(packageStatus).toBe('expired');
  const expirationReason = await b2b2cPackagePage.getExpirationReason();
  expect(expirationReason).toBe('time');
  const remainingData = await b2b2cPackagePage.getRemainingData();
  expect(remainingData).toBe('4GB');
});

When('I activate a B2B2C 24GB package with 24 months validity of 720 days', async function () {
  await b2b2cPackagePage.selectPackageType('B2B2C');
  await b2b2cPackagePage.selectPackageCapacity('24GB');
  await b2b2cPackagePage.selectValidityPeriod('24 months');
  await b2b2cPackagePage.clickActivatePackage();
});

Then('the B2B2C 24GB package is activated with 720 days validity', async function () {
  const packageStatus = await b2b2cPackagePage.getPackageStatus();
  expect(packageStatus).toBe('active');
  const validityDays = await b2b2cPackagePage.getPackageValidityDays();
  expect(validityDays).toBe(720);
});

When('I simulate the passage of 720 complete days', async function () {
  await b2b2cPackagePage.simulateTimePassing(720);
});

Then('the system marks the B2B2C 24GB package as expired by time on day 720', async function () {
  const packageStatus = await b2b2cPackagePage.getPackageStatus();
  expect(packageStatus).toBe('expired');
  const expirationReason = await b2b2cPackagePage.getExpirationReason();
  expect(expirationReason).toBe('time');
  const expirationDay = await b2b2cPackagePage.getExpirationDay();
  expect(expirationDay).toBe(720);
});