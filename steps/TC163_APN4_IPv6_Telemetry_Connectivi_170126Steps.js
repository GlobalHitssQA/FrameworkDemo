const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TelemetryConnectivityPage = require('../pages/TelemetryConnectivityPage');

let telemetryPage;

Given('a line is provisioned with SOLD plan and APN4 Onstar01.v6 configured', async function() {
  telemetryPage = new TelemetryConnectivityPage(this.page);
  await telemetryPage.navigateToProvisioningSection();
  await telemetryPage.provisionLineWithSOLDPlan();
  await telemetryPage.configureAPN4Onstar01V6();
  const isProvisioned = await telemetryPage.verifyLineProvisionedWithAPN4();
  expect(isProvisioned).toBeTruthy();
});

When('I verify in BSCS7 that APN4 is assigned and active for the line', async function() {
  await telemetryPage.navigateToBSCS7Console();
  await telemetryPage.searchLineInBSCS7();
  await telemetryPage.openAPNConfiguration();
});

Then('the system displays APN4 associated with IPv6 protocol enabled', async function() {
  const apnStatus = await telemetryPage.getAPN4Status();
  expect(apnStatus).toContain('Onstar01.v6');
  const ipv6Enabled = await telemetryPage.isIPv6ProtocolEnabled();
  expect(ipv6Enabled).toBeTruthy();
});

When('I initiate a data session via APN4 for IPv6 telemetry traffic from the device', async function() {
  await telemetryPage.navigateToSessionManagement();
  await telemetryPage.initiateDataSessionAPN4();
  await telemetryPage.selectIPv6Protocol();
  await telemetryPage.startTelemetrySession();
});

Then('the system establishes the IPv6 session via APN4 correctly', async function() {
  const sessionEstablished = await telemetryPage.verifySessionEstablished();
  expect(sessionEstablished).toBeTruthy();
  const sessionProtocol = await telemetryPage.getSessionProtocol();
  expect(sessionProtocol).toBe('IPv6');
});

When('I transmit telemetry data through APN4 with IPv6 protocol', async function() {
  await telemetryPage.navigateToDataTransmission();
  await telemetryPage.selectTelemetryDataType();
  await telemetryPage.transmitTelemetryData();
});

Then('the telemetry traffic flows correctly and is recorded in UDR_LT_01 table', async function() {
  await telemetryPage.navigateToUDRRecords();
  const trafficRecorded = await telemetryPage.verifyTrafficInUDRLT01();
  expect(trafficRecorded).toBeTruthy();
});

Then('the telemetry traffic via APN4 is accounted for the In Pool quota on SOLD plan', async function() {
  await telemetryPage.navigateToQuotaManagement();
  const quotaAccounted = await telemetryPage.verifyTrafficAccountedInPool();
  expect(quotaAccounted).toBeTruthy();
});

Then('the system records the traffic and adds it to the 10 MB In Pool quota of SOLD plan', async function() {
  const inPoolUsage = await telemetryPage.getInPoolQuotaUsage();
  expect(inPoolUsage).toBeGreaterThan(0);
  const quotaLimit = await telemetryPage.getInPoolQuotaLimit();
  expect(quotaLimit).toBe('10 MB');
});