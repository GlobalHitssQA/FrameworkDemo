const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TelemetryConnectivityPage = require('../pages/TelemetryConnectivityPage');

let telemetryPage;

Given('a General Motors line is provisioned in RATEPLAN SOLD with APN1 enabled for In Pool telemetry', async function () {
  telemetryPage = new TelemetryConnectivityPage(this.page);
  await telemetryPage.navigateToProvisioningPortal();
  await telemetryPage.provisionLineWithRateplanSOLD();
  await telemetryPage.enableAPN1ForInPoolTelemetry();
  const provisioningStatus = await telemetryPage.getProvisioningStatus();
  expect(provisioningStatus).toContain('APN1 (onstarsa)');
  expect(provisioningStatus).toContain('In Pool 10MB');
});

When('the vehicle device establishes a data session using APN1 for telemetry traffic', async function () {
  await telemetryPage.navigateToDeviceSimulator();
  await telemetryPage.establishDataSessionWithAPN1();
  const sessionStatus = await telemetryPage.getDataSessionStatus();
  expect(sessionStatus).toBe('ESTABLISHED');
});

Then('the HLR HSS should show successful authentication for the APN1 data session', async function () {
  await telemetryPage.navigateToHLRHSSConsole();
  await telemetryPage.searchForLineAuthentication();
  const authResult = await telemetryPage.getAuthenticationResult();
  expect(authResult).toBe('SUCCESS');
  const apnVerified = await telemetryPage.verifyAPN1Authentication();
  expect(apnVerified).toBe(true);
});

Then('the PCRF should apply In Pool policies for APN1 telemetry traffic', async function () {
  await telemetryPage.navigateToPCRFConsole();
  await telemetryPage.searchForActivePolicies();
  const policyStatus = await telemetryPage.getInPoolPolicyStatus();
  expect(policyStatus).toBe('ACTIVE');
  const consumptionSource = await telemetryPage.getConsumptionSource();
  expect(consumptionSource).toContain('shared pool 10MB');
});

Then('the GGSN PGW should route APN1 traffic to the GM telemetry server', async function () {
  await telemetryPage.navigateToGGSNPGWConsole();
  await telemetryPage.searchForTrafficRouting();
  const routingDestination = await telemetryPage.getTrafficRoutingDestination();
  expect(routingDestination).toContain('GM telemetry server');
  const connectivityStatus = await telemetryPage.getEndToEndConnectivityStatus();
  expect(connectivityStatus).toBe('CONNECTED');
});

Then('the GM telemetry server should receive the data sent from the vehicle', async function () {
  await telemetryPage.navigateToTelemetryServerDashboard();
  await telemetryPage.searchForReceivedData();
  const dataReceived = await telemetryPage.isDataReceivedFromVehicle();
  expect(dataReceived).toBe(true);
  const dataIntegrity = await telemetryPage.validateDataIntegrity();
  expect(dataIntegrity).toBe('VALID');
});

Then('BSCS7 should register the APN1 data consumption for In Pool billing', async function () {
  await telemetryPage.navigateToBSCS7Console();
  await telemetryPage.queryUDRLT01Table();
  const consumptionRecord = await telemetryPage.getConsumptionRecord();
  expect(consumptionRecord.apn).toBe('onstarsa');
  expect(consumptionRecord.cost).toBe('0');
  expect(consumptionRecord.billingMode).toBe('In Pool');
});