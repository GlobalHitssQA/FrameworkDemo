const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LifeCycleProvisioningPage = require('../pages/LifeCycleProvisioningPage');

let lifeCyclePage;

Given('the user is authenticated in the Life Cycle system', async function () {
  lifeCyclePage = new LifeCycleProvisioningPage(this.page);
  await lifeCyclePage.navigateToSystem();
  await lifeCyclePage.verifyUserIsAuthenticated();
});

Given('a valid line is available for provisioning', async function () {
  await lifeCyclePage.verifyLineAvailableForProvisioning();
});

When('the user provisions a line in a productive Life Cycle plan excluding TESTING and PURGED', async function () {
  await lifeCyclePage.selectProductivePlanExcludingTestingAndPurged();
  await lifeCyclePage.provisionLine();
});

Then('the system registers the line in the selected plan correctly', async function () {
  const isRegistered = await lifeCyclePage.verifyLineRegisteredInPlan();
  expect(isRegistered).toBeTruthy();
});

When('the user queries the APNs assigned to the provisioned line', async function () {
  await lifeCyclePage.queryAssignedAPNs();
});

Then('the system displays that APN5 onstarhu is assigned to the line', async function () {
  const apn5Assigned = await lifeCyclePage.verifyAPN5OnstarhuAssigned();
  expect(apn5Assigned).toBeTruthy();
});

When('the user verifies the APN5 configuration for internet navigation', async function () {
  await lifeCyclePage.openAPN5Configuration();
});

Then('the APN5 allows FOTA navigation with IPv4 and IPv6 protocol support', async function () {
  const supportsIPv4 = await lifeCyclePage.verifyAPN5SupportsIPv4();
  const supportsIPv6 = await lifeCyclePage.verifyAPN5SupportsIPv6();
  const allowsFOTA = await lifeCyclePage.verifyAPN5AllowsFOTANavigation();
  expect(supportsIPv4).toBeTruthy();
  expect(supportsIPv6).toBeTruthy();
  expect(allowsFOTA).toBeTruthy();
});

When('the user validates the APN5 traffic billing configuration', async function () {
  await lifeCyclePage.openBillingConfiguration();
});

Then('the APN5 traffic is billed at bulk rate of 0.2033 per MB without IGV and does not participate in the In Pool package', async function () {
  const bulkRate = await lifeCyclePage.getAPN5BulkRate();
  const participatesInPool = await lifeCyclePage.verifyAPN5NotInPool();
  expect(bulkRate).toBe('0.2033');
  expect(participatesInPool).toBeFalsy();
});