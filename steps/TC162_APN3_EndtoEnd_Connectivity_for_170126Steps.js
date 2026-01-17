const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const APN3ConnectivityPage = require('../pages/APN3ConnectivityPage');

let apn3Page;

Given('a user is authenticated in the system', async function () {
  apn3Page = new APN3ConnectivityPage(this.page);
  await apn3Page.navigateToSystem();
  await apn3Page.verifyUserAuthenticated();
});

Given('the network components HLR HSS IMS PCRF are configured', async function () {
  await apn3Page.verifyNetworkComponentsConfigured();
});

Given('Instant Link is operational', async function () {
  await apn3Page.verifyInstantLinkOperational();
});

Given('BSCS7 is available', async function () {
  await apn3Page.verifyBSCS7Available();
});

Given('a device with eSIM capability is ready', async function () {
  await apn3Page.verifyESIMDeviceReady();
});

When('the user provisions a line with TESTING plan and preproductive APN3 vodafarusman', async function () {
  await apn3Page.provisionLineWithTestingPlan();
  await apn3Page.configurePreproductiveAPN3('vodafarusman');
  await apn3Page.confirmProvisioning();
});

Then('the line should be provisioned correctly with APN3 preproductive configured', async function () {
  const isProvisioned = await apn3Page.isLineProvisionedSuccessfully();
  expect(isProvisioned).toBeTruthy();
  const apnConfigured = await apn3Page.getConfiguredAPN();
  expect(apnConfigured).toContain('vodafarusman');
});

When('the user verifies APN3 assignment in BSCS7', async function () {
  await apn3Page.navigateToBSCS7();
  await apn3Page.searchLineInBSCS7();
});

Then('the system should display the corresponding APN3 associated with the line', async function () {
  const apn3Value = await apn3Page.getAPN3ValueFromBSCS7();
  expect(apn3Value).toBeTruthy();
  expect(['vodafarusman', 'esim.amx']).toContain(apn3Value);
});

When('the user initiates a data session through APN3 for eSIM profile download', async function () {
  await apn3Page.initiateDataSessionAPN3();
});

Then('the system should establish the data session correctly through APN3', async function () {
  const sessionEstablished = await apn3Page.isDataSessionEstablished();
  expect(sessionEstablished).toBeTruthy();
  const sessionStatus = await apn3Page.getDataSessionStatus();
  expect(sessionStatus).toBe('active');
});

When('the user downloads the eSIM profile through APN3', async function () {
  await apn3Page.initiateESIMProfileDownload();
  await apn3Page.waitForDownloadCompletion();
});

Then('the eSIM profile should download successfully without cost for GM', async function () {
  const downloadSuccess = await apn3Page.isESIMProfileDownloaded();
  expect(downloadSuccess).toBeTruthy();
  const downloadCost = await apn3Page.getDownloadCostForGM();
  expect(downloadCost).toBe(0);
});

When('the user verifies the eSIM profile download traffic in billing', async function () {
  await apn3Page.navigateToBillingSection();
  await apn3Page.searchESIMTrafficRecords();
});

Then('the system should register the traffic with zero cost according to configuration', async function () {
  const trafficCost = await apn3Page.getESIMTrafficCost();
  expect(trafficCost).toBe(0);
  const trafficRegistered = await apn3Page.isTrafficRegisteredCorrectly();
  expect(trafficRegistered).toBeTruthy();
});