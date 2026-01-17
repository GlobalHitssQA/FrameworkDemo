const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProvisioningPage = require('../pages/ProvisioningPage');

let provisioningPage;

Given('the user is authenticated in the provisioning system', async function () {
  provisioningPage = new ProvisioningPage(this.page);
  await provisioningPage.navigateToProvisioningSystem();
  await provisioningPage.verifyUserAuthenticated();
});

Given('a valid line is available for provisioning or plan change', async function () {
  await provisioningPage.verifyValidLineAvailable();
});

When('the user provisions a line in the SOLD plan RatePlan3', async function () {
  await provisioningPage.selectSOLDPlan();
  await provisioningPage.provisionLineInPlan();
});

Then('the system registers the line in the SOLD plan correctly', async function () {
  const isRegistered = await provisioningPage.verifyLineRegisteredInSOLDPlan();
  expect(isRegistered).toBeTruthy();
});

When('the user verifies the APN configuration assigned to the provisioned line', async function () {
  await provisioningPage.navigateToAPNConfiguration();
});

Then('the system shows that APN4 Onstar01.v6 is assigned to the line', async function () {
  const apn4Assigned = await provisioningPage.verifyAPN4Assignment();
  expect(apn4Assigned).toBeTruthy();
});

When('the user validates the APN4 configuration for IPv6 telemetry traffic', async function () {
  await provisioningPage.openAPN4Details();
});

Then('the APN4 allows telemetry traffic with IPv6 protocol', async function () {
  const ipv6Enabled = await provisioningPage.verifyIPv6TelemetryEnabled();
  expect(ipv6Enabled).toBeTruthy();
});

When('the user verifies that APN4 participates in the In Pool modality with APN1', async function () {
  await provisioningPage.navigateToInPoolConfiguration();
});

Then('the APN4 traffic is counted within the shared In Pool bag of 10MB', async function () {
  const inPoolConfigured = await provisioningPage.verifyAPN4InPoolParticipation();
  expect(inPoolConfigured).toBeTruthy();
});