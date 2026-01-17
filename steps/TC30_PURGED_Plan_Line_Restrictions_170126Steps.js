const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PurgedPlanPage = require('../pages/PurgedPlanPage');

let purgedPlanPage;

Given('the user is authenticated in the system', async function () {
  purgedPlanPage = new PurgedPlanPage(this.page);
  await purgedPlanPage.navigateToSystem();
  await purgedPlanPage.verifyUserAuthenticated();
});

Given('the PURGED plan is configured in BSCS7 without services', async function () {
  await purgedPlanPage.verifyPurgedPlanConfigured();
});

Given('a line is available for provisioning in PURGED state', async function () {
  await purgedPlanPage.verifyLineAvailableForProvisioning();
});

Given('a line is provisioned in the PURGED plan', async function () {
  await purgedPlanPage.provisionLineInPurgedPlan();
});

Then('the line should be in PURGED state without enabled services', async function () {
  const state = await purgedPlanPage.getLineState();
  expect(state).toBe('PURGED');
  const servicesEnabled = await purgedPlanPage.areServicesEnabled();
  expect(servicesEnabled).toBe(false);
});

Then('the line should have no productive APNs or VoLTE', async function () {
  const hasProductiveApns = await purgedPlanPage.hasProductiveApns();
  expect(hasProductiveApns).toBe(false);
  const hasVolte = await purgedPlanPage.hasVolteEnabled();
  expect(hasVolte).toBe(false);
});

When('the user attempts to make a voice call from the PURGED plan line', async function () {
  await purgedPlanPage.attemptVoiceCall();
});

Then('the system should block the call attempt', async function () {
  const callBlocked = await purgedPlanPage.isCallBlocked();
  expect(callBlocked).toBe(true);
});

Then('no voice calls should be allowed', async function () {
  const voiceCallsAllowed = await purgedPlanPage.areVoiceCallsAllowed();
  expect(voiceCallsAllowed).toBe(false);
});

When('the user attempts to send an SMS from the PURGED plan line', async function () {
  await purgedPlanPage.attemptSendSms();
});

Then('the system should block the SMS sending', async function () {
  const smsBlocked = await purgedPlanPage.isSmsBlocked();
  expect(smsBlocked).toBe(true);
});

Then('no consumption should be registered', async function () {
  const consumptionRegistered = await purgedPlanPage.isConsumptionRegistered();
  expect(consumptionRegistered).toBe(false);
});

When('the user attempts to consume data or download eSIM profile from the PURGED plan line', async function () {
  await purgedPlanPage.attemptDataConsumption();
  await purgedPlanPage.attemptEsimProfileDownload();
});

Then('the system should block data access', async function () {
  const dataBlocked = await purgedPlanPage.isDataAccessBlocked();
  expect(dataBlocked).toBe(true);
});

Then('no navigation or eSIM profile download should be allowed', async function () {
  const navigationAllowed = await purgedPlanPage.isNavigationAllowed();
  expect(navigationAllowed).toBe(false);
  const esimDownloadAllowed = await purgedPlanPage.isEsimDownloadAllowed();
  expect(esimDownloadAllowed).toBe(false);
});

When('the user verifies the SIM status', async function () {
  await purgedPlanPage.navigateToSimStatus();
});

Then('the SIM should be shown as inactive', async function () {
  const simStatus = await purgedPlanPage.getSimStatus();
  expect(simStatus).toBe('inactive');
});

Then('no services should be available in the PURGED plan', async function () {
  const availableServices = await purgedPlanPage.getAvailableServices();
  expect(availableServices.length).toBe(0);
});