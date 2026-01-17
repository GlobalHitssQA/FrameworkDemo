const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LifeCyclePage = require('../pages/LifeCyclePage');

let lifeCyclePage;

Given('a GM line is active in the system with configuration permissions in BSCS7', async function() {
  lifeCyclePage = new LifeCyclePage(this.page);
  await lifeCyclePage.navigateToSystem();
  await lifeCyclePage.verifyUserHasConfigurationPermissions();
  await lifeCyclePage.verifyGMLineIsActive();
});

Given('connectivity with INSTANT LINK and network is available', async function() {
  await lifeCyclePage.verifyInstantLinkConnectivity();
  await lifeCyclePage.verifyNetworkAvailability();
});

Given('5G support is configured in PCRF and network elements', async function() {
  await lifeCyclePage.verify5GSupportInPCRF();
  await lifeCyclePage.verify5GNetworkElementsConfiguration();
});

When('I provision a line in TESTING plan', async function() {
  await lifeCyclePage.provisionLineInPlan('TESTING');
});

Then('the line should have 5G service enabled', async function() {
  const is5GEnabled = await lifeCyclePage.is5GServiceEnabled();
  expect(is5GEnabled).toBe(true);
});

Then('network parameters should be provisioned correctly through INSTANT LINK', async function() {
  const isProvisioned = await lifeCyclePage.verifyNetworkParametersProvisioned();
  expect(isProvisioned).toBe(true);
});

When('I change the plan from TESTING to MANUFACTURE', async function() {
  await lifeCyclePage.changePlan('TESTING', 'MANUFACTURE');
});

Then('the line in MANUFACTURE plan should maintain 5G service enabled', async function() {
  await lifeCyclePage.verifyCurrentPlan('MANUFACTURE');
  const is5GEnabled = await lifeCyclePage.is5GServiceEnabled();
  expect(is5GEnabled).toBe(true);
});

When('I change the plan to UNSOLD NOT IN SHOWROOM', async function() {
  await lifeCyclePage.changePlanTo('UNSOLD - NOT IN SHOWROOM');
});

Then('the line in UNSOLD NOT IN SHOWROOM plan should maintain 5G enabled', async function() {
  await lifeCyclePage.verifyCurrentPlan('UNSOLD - NOT IN SHOWROOM');
  const is5GEnabled = await lifeCyclePage.is5GServiceEnabled();
  expect(is5GEnabled).toBe(true);
});

When('I change the plan to UNSOLD SHOWROOM', async function() {
  await lifeCyclePage.changePlanTo('UNSOLD - SHOWROOM');
});

Then('the line in UNSOLD SHOWROOM plan should maintain 5G enabled', async function() {
  await lifeCyclePage.verifyCurrentPlan('UNSOLD - SHOWROOM');
  const is5GEnabled = await lifeCyclePage.is5GServiceEnabled();
  expect(is5GEnabled).toBe(true);
});

When('I change the plan to SOLD', async function() {
  await lifeCyclePage.changePlanTo('SOLD');
});

Then('the line in SOLD plan should maintain 5G enabled', async function() {
  await lifeCyclePage.verifyCurrentPlan('SOLD');
  const is5GEnabled = await lifeCyclePage.is5GServiceEnabled();
  expect(is5GEnabled).toBe(true);
});

When('I change the plan to DORMANT', async function() {
  await lifeCyclePage.changePlanTo('DORMANT');
});

Then('the line in DORMANT plan should maintain 5G enabled', async function() {
  await lifeCyclePage.verifyCurrentPlan('DORMANT');
  const is5GEnabled = await lifeCyclePage.is5GServiceEnabled();
  expect(is5GEnabled).toBe(true);
});

When('I change the plan to PURGED', async function() {
  await lifeCyclePage.changePlanTo('PURGED');
});

Then('the line in PURGED plan should have 5G service disabled', async function() {
  await lifeCyclePage.verifyCurrentPlan('PURGED');
  const is5GEnabled = await lifeCyclePage.is5GServiceEnabled();
  expect(is5GEnabled).toBe(false);
});

Then('the SIM should be inactive without services', async function() {
  const isSimActive = await lifeCyclePage.isSimActive();
  expect(isSimActive).toBe(false);
  const hasActiveServices = await lifeCyclePage.hasActiveServices();
  expect(hasActiveServices).toBe(false);
});