const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const B2B2CBalancePage = require('../pages/B2B2CBalancePage');

let b2b2cBalancePage;
let apiResponse;
let initialBalance;
let updatedBalance;

Given('a line is active on SOLD plan with B2B2C 60GB package configured in BSCS7', async function () {
  b2b2cBalancePage = new B2B2CBalancePage(this.page);
  await b2b2cBalancePage.navigateToGMPlatform();
  await b2b2cBalancePage.verifyLineActiveOnSOLDPlan();
  await b2b2cBalancePage.verifyB2B2CPackageConfiguredInBSCS7();
});

Given('the GetInternetBalance API is available through HUB APIGEE', async function () {
  const isAvailable = await b2b2cBalancePage.verifyAPIAvailability();
  expect(isAvailable).toBeTruthy();
});

When('I activate a B2B2C package of 60GB with 12 months validity on the SOLD plan line', async function () {
  await b2b2cBalancePage.activateB2B2CPackage('60GB', '12 months');
});

Then('the B2B2C 60GB package is activated successfully with 60GB available balance', async function () {
  const activationStatus = await b2b2cBalancePage.getPackageActivationStatus();
  expect(activationStatus).toBe('activated');
  initialBalance = await b2b2cBalancePage.getInitialBalance();
  expect(initialBalance).toBe(61440);
});

When('I execute the GetInternetBalance API from GM platform to query the B2B2C package balance', async function () {
  apiResponse = await b2b2cBalancePage.executeGetInternetBalanceAPI();
});

Then('the API responds successfully with the available balance', async function () {
  const responseStatus = await b2b2cBalancePage.getAPIResponseStatus(apiResponse);
  expect(responseStatus).toBe(200);
});

Then('the returned balance corresponds to 60GB or 61440MB', async function () {
  const balanceMB = await b2b2cBalancePage.getBalanceFromResponse(apiResponse);
  expect(balanceMB).toBe(61440);
});

When('I consume 15GB from the line through configured APNs', async function () {
  await b2b2cBalancePage.simulateDataConsumption(15360);
});

Then('the consumption is registered correctly in the system', async function () {
  const consumptionRegistered = await b2b2cBalancePage.verifyConsumptionRegistered();
  expect(consumptionRegistered).toBeTruthy();
});

When('I execute the GetInternetBalance API again to query the updated balance', async function () {
  apiResponse = await b2b2cBalancePage.executeGetInternetBalanceAPI();
  updatedBalance = await b2b2cBalancePage.getBalanceFromResponse(apiResponse);
});

Then('the API returns the updated balance of 45GB or 46080MB available', async function () {
  expect(updatedBalance).toBe(46080);
});

Then('the package validity shown corresponds to 12 months or 360 days from activation', async function () {
  const validityDays = await b2b2cBalancePage.getPackageValidityDays(apiResponse);
  expect(validityDays).toBeGreaterThanOrEqual(358);
  expect(validityDays).toBeLessThanOrEqual(365);
});