const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const APN5ConnectivityPage = require('../pages/APN5ConnectivityPage');

let apn5Page;

Given('the user is authenticated in the system', async function () {
  apn5Page = new APN5ConnectivityPage(this.page);
  await apn5Page.navigateToSystem();
  await apn5Page.verifyUserAuthenticated();
});

Given('the network has dual stack support configured', async function () {
  await apn5Page.verifyDualStackNetworkSupport();
});

Given('PCRF has policies configured for APN5', async function () {
  await apn5Page.verifyPCRFPoliciesForAPN5();
});

Given('Instant Link is operational', async function () {
  await apn5Page.verifyInstantLinkOperational();
});

Given('BSCS7 is available', async function () {
  await apn5Page.verifyBSCS7Availability();
});

When('the user provisions a line with UNSOLD SHOWROOM plan with APN5 configured', async function () {
  await apn5Page.openProvisioningSection();
  await apn5Page.selectUnsoldShowroomPlan();
  await apn5Page.configureAPN5Onstarlhu();
  await apn5Page.submitProvisioning();
});

Then('the line should be provisioned correctly with APN5 for dual stack IPv4\/IPv6 navigation', async function () {
  const isProvisioned = await apn5Page.verifyLineProvisionedWithAPN5DualStack();
  expect(isProvisioned).toBeTruthy();
});

When('the user verifies APN5 assignment in BSCS7', async function () {
  await apn5Page.navigateToBSCS7();
  await apn5Page.searchLineInBSCS7();
});

Then('the system should display APN5 associated with IPv4 and IPv6 support', async function () {
  const hasIPv4Support = await apn5Page.verifyAPN5IPv4Support();
  const hasIPv6Support = await apn5Page.verifyAPN5IPv6Support();
  expect(hasIPv4Support).toBeTruthy();
  expect(hasIPv6Support).toBeTruthy();
});

When('the user initiates a data session via APN5 with IPv4 protocol', async function () {
  await apn5Page.navigateToDataSessionSection();
  await apn5Page.selectAPN5ForSession();
  await apn5Page.selectIPv4Protocol();
  await apn5Page.initiateDataSession();
});

Then('the system should establish the IPv4 session correctly via APN5', async function () {
  const sessionEstablished = await apn5Page.verifyIPv4SessionEstablished();
  expect(sessionEstablished).toBeTruthy();
});

When('the user performs FOTA navigation traffic through APN5 with IPv4', async function () {
  await apn5Page.initiateFOTATrafficIPv4();
});

Then('the traffic should flow correctly and be recorded with the corresponding bulk rate', async function () {
  const trafficRecorded = await apn5Page.verifyTrafficRecordedWithBulkRate();
  expect(trafficRecorded).toBeTruthy();
});

When('the user initiates a data session via APN5 with IPv6 protocol', async function () {
  await apn5Page.navigateToDataSessionSection();
  await apn5Page.selectAPN5ForSession();
  await apn5Page.selectIPv6Protocol();
  await apn5Page.initiateDataSession();
});

Then('the system should establish the IPv6 session correctly via APN5', async function () {
  const sessionEstablished = await apn5Page.verifyIPv6SessionEstablished();
  expect(sessionEstablished).toBeTruthy();
});

When('the user performs FOTA navigation traffic through APN5 with IPv6', async function () {
  await apn5Page.initiateFOTATrafficIPv6();
});

Then('the traffic should flow correctly and be recorded with the corresponding bulk rate for IPv6', async function () {
  const trafficRecorded = await apn5Page.verifyIPv6TrafficRecordedWithBulkRate();
  expect(trafficRecorded).toBeTruthy();
});