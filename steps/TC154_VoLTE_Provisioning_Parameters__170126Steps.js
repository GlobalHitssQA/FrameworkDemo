const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InstantLinkPage = require('../pages/InstantLinkPage');

let instantLinkPage;
let provisioningResult;
let callResult;

Given('a General Motors line is active in the system', async function() {
  instantLinkPage = new InstantLinkPage(this.page);
  await instantLinkPage.navigateToInstantLink();
  await instantLinkPage.verifyLineIsActive();
});

Given('Instant Link is configured with connectivity to HLR\/HSS', async function() {
  await instantLinkPage.verifyHLRHSSConnectivity();
});

Given('the VoLTE configuration matrix per RATEPLAN is defined', async function() {
  await instantLinkPage.verifyVoLTEConfigurationMatrix();
});

Given('the network infrastructure supports VoLTE services', async function() {
  await instantLinkPage.verifyNetworkInfrastructure();
});

When('I execute a provisioning from Instant Link for a RATEPLAN with VoLTE enabled', async function() {
  provisioningResult = await instantLinkPage.executeVoLTEProvisioning('SOLD');
});

Then('Instant Link sends the provisioning request with SERVICE_VOLTE parameter to HLR\/HSS', async function() {
  const requestSent = await instantLinkPage.verifyProvisioningRequestSent();
  expect(requestSent).toBeTruthy();
});

Then('HLR\/HSS registers the VoLTE provisioning request in transaction logs', async function() {
  const logRegistered = await instantLinkPage.verifyTransactionLogInHLRHSS();
  expect(logRegistered).toBeTruthy();
});

Then('the VoLTE parameters are correctly configured in HLR\/HSS with the service enabled', async function() {
  const parametersConfigured = await instantLinkPage.verifyVoLTEParametersInHLRHSS();
  expect(parametersConfigured).toBeTruthy();
});

When('I make a test call from the provisioned line using VoLTE technology', async function() {
  callResult = await instantLinkPage.makeTestVoLTECall();
});

Then('the call is established correctly using VoLTE technology', async function() {
  const callEstablished = await instantLinkPage.verifyVoLTECallEstablished();
  expect(callEstablished).toBeTruthy();
});

When('I execute a provisioning to PURGED RATEPLAN without VoLTE enabled', async function() {
  await instantLinkPage.executeProvisioningToPurgedRateplan();
});

Then('the VoLTE parameters are disabled in HLR\/HSS', async function() {
  const parametersDisabled = await instantLinkPage.verifyVoLTEParametersDisabled();
  expect(parametersDisabled).toBeTruthy();
});

Then('the line cannot make VoLTE calls', async function() {
  const volteDisabled = await instantLinkPage.verifyVoLTECallsNotAvailable();
  expect(volteDisabled).toBeTruthy();
});