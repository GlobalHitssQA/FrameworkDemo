const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const VoLTEProvisioningPage = require('../pages/VoLTEProvisioningPage');

let voLTEPage;

Given('the BSCS7 system is configured with SOLD plan', async function () {
  voLTEPage = new VoLTEProvisioningPage(this.page);
  await voLTEPage.navigateToBSCS7();
  const isConfigured = await voLTEPage.verifySOLDPlanConfiguration();
  expect(isConfigured).toBeTruthy();
});

Given('INSTANT LINK is operational', async function () {
  const isOperational = await voLTEPage.checkInstantLinkStatus();
  expect(isOperational).toBeTruthy();
});

Given('the network HLR HSS IMS is available', async function () {
  const isNetworkAvailable = await voLTEPage.checkNetworkAvailability();
  expect(isNetworkAvailable).toBeTruthy();
});

Given('a valid SIM card is ready for activation', async function () {
  const isSimReady = await voLTEPage.verifySIMCardReady();
  expect(isSimReady).toBeTruthy();
});

When('I activate a new line on SOLD plan Rate Plan 3 for Auto Conectado service', async function () {
  await voLTEPage.selectAutoConectadoService();
  await voLTEPage.selectSOLDPlanRatePlan3();
  await voLTEPage.activateNewLine();
});

Then('the line should be activated correctly in BSCS7 with SOLD plan assigned', async function () {
  const activationStatus = await voLTEPage.getLineActivationStatus();
  expect(activationStatus).toBe('ACTIVE');
  const assignedPlan = await voLTEPage.getAssignedPlan();
  expect(assignedPlan).toBe('SOLD');
});

When('I verify the provisioning parameters in INSTANT LINK', async function () {
  await voLTEPage.navigateToInstantLink();
  await voLTEPage.searchProvisioningParameters();
});

Then('the SERVICE_VOLTE parameter should be sent with affirmative value', async function () {
  const volteParameter = await voLTEPage.getServiceVoLTEParameter();
  expect(volteParameter).toBe('Y');
});

When('I query the line service configuration in the network', async function () {
  await voLTEPage.navigateToNetworkConfiguration();
  await voLTEPage.queryLineServices();
});

Then('the line should have VoLTE service enabled', async function () {
  const volteEnabled = await voLTEPage.isVoLTEEnabled();
  expect(volteEnabled).toBeTruthy();
});

When('I make a voice call using the activated SOLD plan line', async function () {
  await voLTEPage.initiateVoiceCall();
});

Then('the call should be established using VoLTE technology', async function () {
  const callTechnology = await voLTEPage.getCallTechnology();
  expect(callTechnology).toBe('VoLTE');
  const callStatus = await voLTEPage.getCallStatus();
  expect(callStatus).toBe('CONNECTED');
});