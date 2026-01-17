const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7Page = require('../pages/BSCS7Page');

let bscs7Page;

Given('a GM line is provisioned in TESTING plan with VoLTE enabled in BSCS7', async function () {
  bscs7Page = new BSCS7Page(this.page);
  await bscs7Page.navigateToLineProvisioning();
  await bscs7Page.provisionLineWithPlan('TESTING');
  await bscs7Page.enableVoLTEService();
  const isVoLTEEnabled = await bscs7Page.isVoLTEServiceEnabled();
  expect(isVoLTEEnabled).toBe(true);
});

Given('the SERVICE_VOLTE parameter is sent correctly to HLR\/HSS\/IMS via INSTANT LINK', async function () {
  const parameterSent = await bscs7Page.verifyInstantLinkParameter('SERVICE_VOLTE');
  expect(parameterSent).toBe(true);
});

When('the plan is changed from TESTING to MANUFACTURE', async function () {
  await bscs7Page.changePlanTo('MANUFACTURE');
});

When('the plan is changed to UNSOLD - NOT IN SHOWROOM', async function () {
  await bscs7Page.changePlanTo('UNSOLD - NOT IN SHOWROOM');
});

When('the plan is changed to UNSOLD - SHOWROOM', async function () {
  await bscs7Page.changePlanTo('UNSOLD - SHOWROOM');
});

When('the plan is changed to SOLD', async function () {
  await bscs7Page.changePlanTo('SOLD');
});

When('the plan is changed to DORMANT', async function () {
  await bscs7Page.changePlanTo('DORMANT');
});

When('the plan is changed to PURGED', async function () {
  await bscs7Page.changePlanTo('PURGED');
});

Then('the VoLTE service should remain enabled', async function () {
  const isVoLTEEnabled = await bscs7Page.isVoLTEServiceEnabled();
  expect(isVoLTEEnabled).toBe(true);
});

Then('the VoLTE service should be disabled', async function () {
  const isVoLTEEnabled = await bscs7Page.isVoLTEServiceEnabled();
  expect(isVoLTEEnabled).toBe(false);
});

Then('the SIM should be inactive without services', async function () {
  const simStatus = await bscs7Page.getSIMStatus();
  expect(simStatus).toBe('INACTIVE');
  const hasActiveServices = await bscs7Page.hasActiveServices();
  expect(hasActiveServices).toBe(false);
});