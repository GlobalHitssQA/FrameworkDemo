const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LifeCycleProvisioningPage = require('../pages/LifeCycleProvisioningPage');

let lifeCyclePage;

Given('the user is authenticated in the Life Cycle system', async function () {
  lifeCyclePage = new LifeCycleProvisioningPage(this.page);
  await lifeCyclePage.navigateToSystem();
  await lifeCyclePage.login();
});

Given('a valid line is available for provisioning', async function () {
  const isLineAvailable = await lifeCyclePage.verifyLineAvailability();
  expect(isLineAvailable).toBeTruthy();
});

When('the user provisions a line in a new Life Cycle plan except PURGED', async function () {
  await lifeCyclePage.selectNonPurgedPlan();
  await lifeCyclePage.provisionLine();
});

Then('the system registers the line in the selected plan correctly', async function () {
  const registrationStatus = await lifeCyclePage.getLineRegistrationStatus();
  expect(registrationStatus).toBe('Registered');
});

When('the user queries the APNs assigned to the provisioned line', async function () {
  await lifeCyclePage.navigateToAPNConfiguration();
  await lifeCyclePage.queryAssignedAPNs();
});

Then('the system shows that APN7 onstarunman is assigned to the line', async function () {
  const apn7Assigned = await lifeCyclePage.isAPN7Assigned();
  expect(apn7Assigned).toBeTruthy();
  const apn7Name = await lifeCyclePage.getAPN7Name();
  expect(apn7Name).toBe('onstarunman');
});

Then('the APN7 is configured for eSIM profile download', async function () {
  const isConfiguredForESIM = await lifeCyclePage.isAPN7ConfiguredForESIM();
  expect(isConfiguredForESIM).toBeTruthy();
});

When('the user validates the APN7 traffic cost', async function () {
  await lifeCyclePage.navigateToBillingSection();
  await lifeCyclePage.queryAPN7TrafficCost();
});

Then('the APN7 traffic is registered with zero cost in billing', async function () {
  const trafficCost = await lifeCyclePage.getAPN7TrafficCost();
  expect(trafficCost).toBe(0);
});

Then('the APN7 is available in productive plans and not in preproductive test plans', async function () {
  const isProductiveOnly = await lifeCyclePage.verifyAPN7ProductiveAvailability();
  expect(isProductiveOnly).toBeTruthy();
  const apn7Description = await lifeCyclePage.getAPN7Description();
  expect(apn7Description).toContain('General Motors');
});