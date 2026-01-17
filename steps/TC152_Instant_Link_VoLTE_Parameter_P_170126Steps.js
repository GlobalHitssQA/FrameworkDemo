const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InstantLinkPage = require('../pages/InstantLinkPage');

let instantLinkPage;
let selectedLine;
let selectedRateplan;
let provisioningResult;
let logsResult;
let networkElementsStatus;

Given('the user is authenticated in Instant Link with provisioning permissions', async function() {
  instantLinkPage = new InstantLinkPage(this.page);
  await instantLinkPage.navigateToInstantLink();
  await instantLinkPage.loginWithProvisioningPermissions();
  const isLoggedIn = await instantLinkPage.isUserAuthenticated();
  expect(isLoggedIn).toBeTruthy();
});

Given('there is connectivity between Instant Link and network elements HLR HSS and IMS', async function() {
  const connectivityStatus = await instantLinkPage.verifyNetworkElementsConnectivity();
  expect(connectivityStatus.hlrHss).toBeTruthy();
  expect(connectivityStatus.ims).toBeTruthy();
});

Given('VoLTE is configured as enabled in the Life Cycle RATEPLAN matrix except for PURGED', async function() {
  const volteConfig = await instantLinkPage.getVoLTEConfigurationMatrix();
  expect(volteConfig.testing).toBe(true);
  expect(volteConfig.manufacture).toBe(true);
  expect(volteConfig.unsoldNotInShowroom).toBe(true);
  expect(volteConfig.unsoldShowroom).toBe(true);
  expect(volteConfig.sold).toBe(true);
  expect(volteConfig.dormant).toBe(true);
  expect(volteConfig.purged).toBe(false);
});

Given('there is an active General Motors line in the system', async function() {
  const gmLineExists = await instantLinkPage.verifyActiveGMLineExists();
  expect(gmLineExists).toBeTruthy();
});

When('the user accesses Instant Link and selects a General Motors line for provisioning', async function() {
  await instantLinkPage.navigateToLineProvisioning();
  selectedLine = await instantLinkPage.selectGeneralMotorsLine();
  const lineDisplayed = await instantLinkPage.isLineConfigurationDisplayed();
  expect(lineDisplayed).toBeTruthy();
});

When('the user selects a RATEPLAN with VoLTE enabled from the options TESTING MANUFACTURE UNSOLD_NOT_IN_SHOWROOM UNSOLD_SHOWROOM SOLD or DORMANT', async function() {
  selectedRateplan = 'SOLD';
  await instantLinkPage.selectRateplan(selectedRateplan);
  const rateplanSelected = await instantLinkPage.getSelectedRateplan();
  expect(rateplanSelected).toBe(selectedRateplan);
});

When('the user executes the provisioning action for the selected RATEPLAN', async function() {
  provisioningResult = await instantLinkPage.executeProvisioning();
  expect(provisioningResult.success).toBeTruthy();
});

Then('Instant Link should process the request and generate the provisioning transaction including SERVICE_VOLTE parameter', async function() {
  const transactionDetails = await instantLinkPage.getProvisioningTransactionDetails();
  expect(transactionDetails.serviceVolteIncluded).toBeTruthy();
  expect(transactionDetails.transactionId).toBeDefined();
});

Then('the SERVICE_VOLTE parameter should appear in Instant Link logs sent to network elements with enabled value', async function() {
  logsResult = await instantLinkPage.getProvisioningLogs();
  expect(logsResult.serviceVolteParameter).toBeDefined();
  expect(logsResult.serviceVolteValue).toBe('enabled');
  expect(logsResult.sentToHlrHss).toBeTruthy();
  expect(logsResult.sentToIms).toBeTruthy();
});

Then('the VoLTE service should be correctly provisioned in HLR HSS and IMS for the line', async function() {
  networkElementsStatus = await instantLinkPage.queryNetworkElementsVoLTEStatus(selectedLine);
  expect(networkElementsStatus.hlrHssVoLTEEnabled).toBeTruthy();
  expect(networkElementsStatus.imsVoLTEEnabled).toBeTruthy();
});

When('the user attempts to provision a line with PURGED RATEPLAN', async function() {
  await instantLinkPage.selectRateplan('PURGED');
  provisioningResult = await instantLinkPage.executeProvisioning();
});

Then('the SERVICE_VOLTE parameter should not be sent for PURGED RATEPLAN', async function() {
  logsResult = await instantLinkPage.getProvisioningLogs();
  expect(logsResult.serviceVolteParameter).toBeUndefined();
});

Then('the VoLTE service should remain disabled in network elements for PURGED lines', async function() {
  networkElementsStatus = await instantLinkPage.queryNetworkElementsVoLTEStatus(selectedLine);
  expect(networkElementsStatus.hlrHssVoLTEEnabled).toBeFalsy();
  expect(networkElementsStatus.imsVoLTEEnabled).toBeFalsy();
});