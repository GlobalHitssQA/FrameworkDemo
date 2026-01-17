const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PCRFPolicyPage = require('../pages/PCRFPolicyPage');

let pcrfPolicyPage;

Given('a General Motors line is provisioned in Instant Link with SOLD RATEPLAN', async function () {
  pcrfPolicyPage = new PCRFPolicyPage(this.page);
  await pcrfPolicyPage.navigateToInstantLink();
  await pcrfPolicyPage.verifyLineProvisionedWithSOLDRateplan();
});

Given('PCRF is configured with policies for the 7 APNs of the new Life Cycle', async function () {
  await pcrfPolicyPage.navigateToPCRFConsole();
  await pcrfPolicyPage.verifyAPNPoliciesConfigured();
});

When('I execute the provisioning from Instant Link with In Pool configuration for telemetry on APN1 and APN4', async function () {
  await pcrfPolicyPage.executeProvisioningWithInPoolConfig('APN1', 'APN4');
});

Then('PCRF should receive policy configuration for APN1 and APN4 with In Pool modality', async function () {
  const apn1Policy = await pcrfPolicyPage.getPolicyModalityForAPN('APN1');
  const apn4Policy = await pcrfPolicyPage.getPolicyModalityForAPN('APN4');
  expect(apn1Policy).toBe('In Pool');
  expect(apn4Policy).toBe('In Pool');
});

Then('PCRF should receive policy configuration for APN2 APN5 and APN6 with bulk modality', async function () {
  const apn2Policy = await pcrfPolicyPage.getPolicyModalityForAPN('APN2');
  const apn5Policy = await pcrfPolicyPage.getPolicyModalityForAPN('APN5');
  const apn6Policy = await pcrfPolicyPage.getPolicyModalityForAPN('APN6');
  expect(apn2Policy).toBe('Granel');
  expect(apn5Policy).toBe('Granel');
  expect(apn6Policy).toBe('Granel');
});

When('I verify the traffic control policies in PCRF for each APN', async function () {
  await pcrfPolicyPage.navigateToPolicyVerificationSection();
  await pcrfPolicyPage.loadActivePolicies();
});

Then('PCRF should display active policies for telemetry APNs with In Pool rate', async function () {
  const telemetryPoliciesVisible = await pcrfPolicyPage.verifyTelemetryPoliciesWithInPoolRate();
  expect(telemetryPoliciesVisible).toBeTruthy();
});

Then('PCRF should display active policies for navigation and FOTA APNs with bulk rate', async function () {
  const navigationPoliciesVisible = await pcrfPolicyPage.verifyNavigationPoliciesWithBulkRate();
  expect(navigationPoliciesVisible).toBeTruthy();
});

When('I generate data traffic through APN1 for telemetry', async function () {
  await pcrfPolicyPage.navigateToTrafficSimulator();
  await pcrfPolicyPage.generateTrafficForAPN('APN1', 'telemetry');
});

Then('PCRF should register APN1 traffic applying In Pool policy deducting from the shared 10MB pool', async function () {
  const trafficRecord = await pcrfPolicyPage.getTrafficRecordForAPN('APN1');
  expect(trafficRecord.policy).toBe('In Pool');
  expect(trafficRecord.poolDeduction).toBeTruthy();
});

When('I generate data traffic through APN2 for internet navigation', async function () {
  await pcrfPolicyPage.generateTrafficForAPN('APN2', 'navigation');
});

Then('PCRF should register APN2 traffic applying bulk rate of 0.2033 soles per MB', async function () {
  const trafficRecord = await pcrfPolicyPage.getTrafficRecordForAPN('APN2');
  expect(trafficRecord.policy).toBe('Granel');
  expect(trafficRecord.ratePerMB).toBe(0.2033);
});

When('I exhaust the In Pool telemetry quota and generate additional traffic through APN1', async function () {
  await pcrfPolicyPage.exhaustInPoolQuota();
  await pcrfPolicyPage.generateTrafficForAPN('APN1', 'telemetry');
});

Then('PCRF should detect the exhausted In Pool quota and apply excess bulk rate of 0.0372 soles per MB', async function () {
  const quotaStatus = await pcrfPolicyPage.getInPoolQuotaStatus();
  const excessTrafficRecord = await pcrfPolicyPage.getExcessTrafficRecord('APN1');
  expect(quotaStatus).toBe('exhausted');
  expect(excessTrafficRecord.ratePerMB).toBe(0.0372);
});

When('I switch to TESTING RATEPLAN with pre-productive APNs', async function () {
  await pcrfPolicyPage.switchToTestingRateplan();
});

Then('PCRF should apply policies only for pre-productive APNs APN2 APN6 and APN7', async function () {
  const apn2Active = await pcrfPolicyPage.isAPNPolicyActive('APN2');
  const apn6Active = await pcrfPolicyPage.isAPNPolicyActive('APN6');
  const apn7Active = await pcrfPolicyPage.isAPNPolicyActive('APN7');
  expect(apn2Active).toBeTruthy();
  expect(apn6Active).toBeTruthy();
  expect(apn7Active).toBeTruthy();
});

Then('PCRF should block traffic through productive APNs', async function () {
  const apn1Blocked = await pcrfPolicyPage.isAPNTrafficBlocked('APN1');
  const apn4Blocked = await pcrfPolicyPage.isAPNTrafficBlocked('APN4');
  const apn5Blocked = await pcrfPolicyPage.isAPNTrafficBlocked('APN5');
  expect(apn1Blocked).toBeTruthy();
  expect(apn4Blocked).toBeTruthy();
  expect(apn5Blocked).toBeTruthy();
});