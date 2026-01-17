const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProvisioningPage = require('../pages/ProvisioningPage');
const BSCS7Page = require('../pages/BSCS7Page');
const NetworkMonitorPage = require('../pages/NetworkMonitorPage');

let provisioningPage;
let bscs7Page;
let networkMonitorPage;

Given('a user is authenticated in the provisioning system', async function () {
  provisioningPage = new ProvisioningPage(this.page);
  await provisioningPage.navigateToLogin();
  await provisioningPage.login();
});

Given('the network components HLR HSS IMS PCRF are configured', async function () {
  networkMonitorPage = new NetworkMonitorPage(this.page);
  await networkMonitorPage.verifyNetworkComponentsConfigured();
});

Given('Instant Link is operational', async function () {
  await networkMonitorPage.verifyInstantLinkOperational();
});

Given('BSCS7 is available', async function () {
  bscs7Page = new BSCS7Page(this.page);
  await bscs7Page.verifySystemAvailable();
});

When('the user provisions a line with a plan that allows APN2 traffic', async function () {
  await provisioningPage.navigateToLineProvisioning();
  await provisioningPage.startNewLineProvisioning();
});

When('the user selects one of the eligible plans TESTING MANUFACTURE UNSOLD_NOT_IN_SHOWROOM UNSOLD_SHOWROOM SOLD or DORMANT', async function () {
  await provisioningPage.selectPlanWithAPN2Support('TESTING');
});

Then('the line should be provisioned correctly with the selected plan', async function () {
  const isProvisioned = await provisioningPage.verifyLineProvisioned();
  expect(isProvisioned).toBeTruthy();
});

Then('the APN2 gmsa should be configured for the line', async function () {
  const isAPN2Configured = await provisioningPage.verifyAPN2Configured();
  expect(isAPN2Configured).toBeTruthy();
});

When('the user verifies the APN2 assignment in BSCS7', async function () {
  await bscs7Page.navigateToLineDetails();
  await bscs7Page.searchLineByMSISDN();
});

Then('the system should display APN2 gmsa associated with the line', async function () {
  const apnName = await bscs7Page.getAssignedAPNName();
  expect(apnName).toContain('gmsa');
});

Then('the APN2 status should be active', async function () {
  const status = await bscs7Page.getAPNStatus();
  expect(status).toBe('active');
});

When('a data session is initiated through APN2 gmsa for FOTA navigation', async function () {
  await networkMonitorPage.initiateDataSessionAPN2();
});

Then('the system should establish the data session correctly through APN2', async function () {
  const sessionEstablished = await networkMonitorPage.verifyDataSessionEstablished();
  expect(sessionEstablished).toBeTruthy();
});

When('FOTA navigation traffic flows through APN2', async function () {
  await networkMonitorPage.initiateFOTATraffic();
});

Then('the traffic should be registered in the UDR_LT_01 table', async function () {
  const trafficRegistered = await networkMonitorPage.verifyTrafficInUDRTable('UDR_LT_01');
  expect(trafficRegistered).toBeTruthy();
});

When('end-to-end connectivity is verified from device to FOTA servers', async function () {
  await networkMonitorPage.verifyEndToEndConnectivity();
});

Then('the connectivity should be successful', async function () {
  const connectivitySuccess = await networkMonitorPage.getConnectivityStatus();
  expect(connectivitySuccess).toBe('successful');
});

Then('FOTA updates should be downloadable', async function () {
  const fotaDownloadable = await networkMonitorPage.verifyFOTADownloadCapability();
  expect(fotaDownloadable).toBeTruthy();
});