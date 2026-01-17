const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LifeCycleProvisioningPage = require('../pages/LifeCycleProvisioningPage');

let lifeCyclePage;

Given('the user is authenticated in the Life Cycle system', async function () {
  lifeCyclePage = new LifeCycleProvisioningPage(this.page);
  await lifeCyclePage.navigateToSystem();
  await lifeCyclePage.login();
});

Given('a valid line is available for provisioning', async function () {
  const isLineAvailable = await lifeCyclePage.verifyLineAvailability();
  expect(isLineAvailable).toBeTruthy();
});

When('the user provisions a line in a productive Life Cycle plan excluding TESTING and PURGED', async function () {
  await lifeCyclePage.selectProductivePlan();
  await lifeCyclePage.provisionLine();
});

Then('the system should register the line in the selected plan correctly', async function () {
  const isRegistered = await lifeCyclePage.verifyLineRegistration();
  expect(isRegistered).toBeTruthy();
});

When('the user queries the productive APNs assigned to the line', async function () {
  await lifeCyclePage.navigateToAPNConfiguration();
  await lifeCyclePage.queryAssignedAPNs();
});

Then('the system should display that APN6 onstarwifi is assigned to the line', async function () {
  const apn6Assigned = await lifeCyclePage.isAPN6Assigned();
  expect(apn6Assigned).toBeTruthy();
});

Then('the APN6 should be configured for WiFi traffic', async function () {
  const wifiConfigured = await lifeCyclePage.isAPN6ConfiguredForWiFi();
  expect(wifiConfigured).toBeTruthy();
});

When('the user validates the billing configuration for APN6 traffic', async function () {
  await lifeCyclePage.navigateToBillingConfiguration();
  await lifeCyclePage.selectAPN6BillingDetails();
});

Then('the APN6 traffic should be billed at bulk rate of 0.2033 PEN per MB without IGV', async function () {
  const bulkRate = await lifeCyclePage.getAPN6BulkRate();
  expect(bulkRate).toBe('0.2033');
});

Then('the APN6 should allow activation of Trial and B2B2C packages', async function () {
  const trialEnabled = await lifeCyclePage.isTrialPackageEnabled();
  const b2b2cEnabled = await lifeCyclePage.isB2B2CPackageEnabled();
  expect(trialEnabled).toBeTruthy();
  expect(b2b2cEnabled).toBeTruthy();
});

When('the user verifies the In Pool participation status for APN6', async function () {
  await lifeCyclePage.navigateToInPoolConfiguration();
  await lifeCyclePage.checkAPN6InPoolStatus();
});

Then('the APN6 traffic should not be counted in the shared In Pool allowance', async function () {
  const isExcludedFromPool = await lifeCyclePage.isAPN6ExcludedFromInPool();
  expect(isExcludedFromPool).toBeTruthy();
});