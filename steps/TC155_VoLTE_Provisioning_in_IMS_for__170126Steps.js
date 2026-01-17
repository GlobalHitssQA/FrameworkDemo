const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InstantLinkPage = require('../pages/InstantLinkPage');

let instantLinkPage;
let provisioningResult;
let imsLogs;
let volteParameters;
let callResult;

Given('the General Motors line is active and provisioned in the system', async function() {
  instantLinkPage = new InstantLinkPage(this.page);
  await instantLinkPage.navigateToInstantLink();
  const lineStatus = await instantLinkPage.verifyLineIsActive();
  expect(lineStatus).toBe(true);
});

Given('Instant Link has connectivity to IMS', async function() {
  const connectivityStatus = await instantLinkPage.checkIMSConnectivity();
  expect(connectivityStatus).toBe(true);
});

Given('the IMS infrastructure is operational and configured for VoLTE services', async function() {
  const imsStatus = await instantLinkPage.verifyIMSInfrastructureStatus();
  expect(imsStatus).toBe('operational');
});

When('the user executes a provisioning request from Instant Link for a RATEPLAN with VoLTE enabled', async function() {
  await instantLinkPage.selectRatePlanWithVoLTE();
  provisioningResult = await instantLinkPage.executeProvisioningRequest();
});

Then('Instant Link sends the provisioning request with VoLTE parameters to IMS', async function() {
  const requestSent = await instantLinkPage.verifyProvisioningRequestSent();
  expect(requestSent).toBe(true);
  expect(provisioningResult.volteParametersIncluded).toBe(true);
});

Then('IMS logs the VoLTE provisioning request with timestamp and line data', async function() {
  imsLogs = await instantLinkPage.getIMSProvisioningLogs();
  expect(imsLogs.timestamp).toBeDefined();
  expect(imsLogs.lineData).toBeDefined();
  expect(imsLogs.requestType).toBe('VoLTE_PROVISION');
});

When('the user queries the VoLTE parameters in IMS configuration tables for the General Motors line', async function() {
  volteParameters = await instantLinkPage.queryVoLTEParametersInIMS();
});

Then('the VoLTE parameters are correctly configured in IMS with enabled service profile', async function() {
  expect(volteParameters.serviceProfileEnabled).toBe(true);
  expect(volteParameters.configurationStatus).toBe('configured');
});

Then('the configuration includes codecs priorities QoS and call policies', async function() {
  expect(volteParameters.codecs).toBeDefined();
  expect(volteParameters.qosPriorities).toBeDefined();
  expect(volteParameters.callPolicies).toBeDefined();
});

When('the user makes a test VoLTE call from the provisioned line to another destination', async function() {
  callResult = await instantLinkPage.initiateVoLTETestCall();
});

Then('the call is established successfully via IMS using VoLTE technology', async function() {
  expect(callResult.established).toBe(true);
  expect(callResult.technology).toBe('VoLTE');
  expect(callResult.viaIMS).toBe(true);
});

Then('the call has HD voice quality and is correctly logged in IMS', async function() {
  expect(callResult.voiceQuality).toBe('HD');
  const callLogs = await instantLinkPage.getIMSCallLogs();
  expect(callLogs.callRecorded).toBe(true);
});

When('the user executes a provisioning request to PURGED RATEPLAN without VoLTE services', async function() {
  await instantLinkPage.selectPurgedRatePlan();
  provisioningResult = await instantLinkPage.executeProvisioningRequest();
});

Then('the VoLTE parameters are disabled in IMS', async function() {
  volteParameters = await instantLinkPage.queryVoLTEParametersInIMS();
  expect(volteParameters.serviceProfileEnabled).toBe(false);
});

Then('the line cannot establish calls using VoLTE technology', async function() {
  const volteCallAttempt = await instantLinkPage.attemptVoLTECall();
  expect(volteCallAttempt.canEstablish).toBe(false);
  expect(volteCallAttempt.reason).toBe('VoLTE_DISABLED');
});