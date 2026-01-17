const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const APN7ConnectivityPage = require('../pages/APN7ConnectivityPage');

let apn7Page;

Given('the user is authenticated in the system', async function () {
  apn7Page = new APN7ConnectivityPage(this.page);
  await apn7Page.navigateToSystem();
  await apn7Page.verifyUserAuthenticated();
});

Given('the network is configured with preproductive environment', async function () {
  await apn7Page.verifyPreproductiveEnvironmentConfigured();
});

Given('Instant Link is operational', async function () {
  await apn7Page.verifyInstantLinkOperational();
});

Given('BSCS7 is available', async function () {
  await apn7Page.verifyBSCS7Available();
});

Given('a device with eSIM capability is ready', async function () {
  await apn7Page.verifyESIMDeviceReady();
});

Given('the TESTING plan is active', async function () {
  await apn7Page.verifyTestingPlanActive();
});

When('the user provisions a line with TESTING plan and preproductive APN7 vodafarusman', async function () {
  await apn7Page.provisionLineWithTestingPlan();
  await apn7Page.configureAPN7Preproductive('vodafarusman');
});

Then('the line should be provisioned correctly with preproductive APN7 configured', async function () {
  const isProvisioned = await apn7Page.verifyLineProvisionedWithAPN7();
  expect(isProvisioned).toBeTruthy();
});

When('the user verifies in BSCS7 that APN7 vodafarusman is assigned as preproductive to the line', async function () {
  await apn7Page.navigateToBSCS7();
  await apn7Page.searchLineInBSCS7();
});

Then('the system should display APN7 associated with preproductive status', async function () {
  const apnStatus = await apn7Page.getAPN7StatusInBSCS7();
  expect(apnStatus).toContain('preproductivo');
});

When('the user initiates a data session via APN7 for eSIM profile download from the device', async function () {
  await apn7Page.initiateDataSessionAPN7();
});

Then('the system should establish the data session correctly via preproductive APN7', async function () {
  const sessionEstablished = await apn7Page.verifyDataSessionEstablished();
  expect(sessionEstablished).toBeTruthy();
});

When('the user downloads the eSIM profile through APN7 in preproductive environment', async function () {
  await apn7Page.downloadESIMProfile();
});

Then('the eSIM profile should be downloaded successfully in the test environment', async function () {
  const downloadSuccess = await apn7Page.verifyESIMProfileDownloaded();
  expect(downloadSuccess).toBeTruthy();
});

When('the user verifies that the download traffic via APN7 has zero cost for GM', async function () {
  await apn7Page.navigateToTrafficCostSection();
});

Then('the system should register the traffic with zero cost according to preproductive configuration', async function () {
  const trafficCost = await apn7Page.getTrafficCostForAPN7();
  expect(trafficCost).toBe('0');
});