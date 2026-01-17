const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InstantLinkPage = require('../pages/InstantLinkPage');

let instantLinkPage;

Given('the user is authenticated in Instant Link with provisioning permissions', async function () {
  instantLinkPage = new InstantLinkPage(this.page);
  await instantLinkPage.navigateToInstantLink();
  await instantLinkPage.loginWithProvisioningPermissions();
});

Given('the 7 APNs configuration is completed in BSCS7', async function () {
  const isConfigured = await instantLinkPage.verifyBSCS7Configuration();
  expect(isConfigured).toBeTruthy();
});

Given('connectivity between Instant Link and network elements is established', async function () {
  const isConnected = await instantLinkPage.verifyNetworkElementsConnectivity();
  expect(isConnected).toBeTruthy();
});

When('the user accesses Instant Link and selects a General Motors line for provisioning', async function () {
  await instantLinkPage.accessLineProvisioning();
  await instantLinkPage.selectGeneralMotorsLine();
});

Then('the system displays the selected line available for provisioning', async function () {
  const isLineDisplayed = await instantLinkPage.isLineAvailableForProvisioning();
  expect(isLineDisplayed).toBeTruthy();
});

When('the user executes provisioning on TESTING RATEPLAN with pre-productive APNs', async function () {
  await instantLinkPage.selectRatePlan('TESTING');
  await instantLinkPage.executeProvisioning();
});

Then('Instant Link sends only pre-productive APN attributes APN2 APN6 APN7 to network elements', async function () {
  const sentAPNs = await instantLinkPage.getSentAPNsFromLogs();
  expect(sentAPNs).toContain('APN2');
  expect(sentAPNs).toContain('APN6');
  expect(sentAPNs).toContain('APN7');
});

Then('no productive APNs are sent for TESTING RATEPLAN', async function () {
  const sentAPNs = await instantLinkPage.getSentAPNsFromLogs();
  expect(sentAPNs).not.toContain('APN1');
  expect(sentAPNs).not.toContain('APN3');
  expect(sentAPNs).not.toContain('APN4');
  expect(sentAPNs).not.toContain('APN5');
});

When('the user executes provisioning on a productive RATEPLAN', async function () {
  await instantLinkPage.selectRatePlan('SOLD');
  await instantLinkPage.executeProvisioning();
});

Then('Instant Link sends all 7 productive APN attributes to network elements', async function () {
  const sentAPNs = await instantLinkPage.getSentAPNsFromLogs();
  expect(sentAPNs.length).toBe(7);
  for (let i = 1; i <= 7; i++) {
    expect(sentAPNs).toContain(`APN${i}`);
  }
});

Then('each APN contains correct usage classification and billing configuration', async function () {
  const apnConfigurations = await instantLinkPage.getAPNConfigurations();
  for (const apn of apnConfigurations) {
    expect(apn.usage).toBeDefined();
    expect(apn.classification).toBeDefined();
    expect(apn.billing).toBeDefined();
  }
});

When('the user verifies the Instant Link logs for sent APN attributes', async function () {
  await instantLinkPage.navigateToLogs();
  await instantLinkPage.filterLogsByAPNAttributes();
});

Then('the logs show correct attributes for onstarsa with Telemetry usage', async function () {
  const apnLog = await instantLinkPage.getAPNLogDetails('onstarsa');
  expect(apnLog.usage).toBe('Telemetry');
});

Then('the logs show correct attributes for gmsa with Internet Navigation FOTA usage', async function () {
  const apnLog = await instantLinkPage.getAPNLogDetails('gmsa');
  expect(apnLog.usage).toBe('Internet Navigation/FOTA');
});

Then('the logs show correct attributes for esim.amx with eSIM profile download usage', async function () {
  const apnLog = await instantLinkPage.getAPNLogDetails('esim.amx');
  expect(apnLog.usage).toBe('eSIM Profile Download');
});

Then('the logs show correct attributes for onstar01.v6 with Telemetry IPv6 usage', async function () {
  const apnLog = await instantLinkPage.getAPNLogDetails('onstar01.v6');
  expect(apnLog.usage).toBe('Telemetry IPv6');
});

Then('the logs show correct attributes for onstarhu with Navigation IPv6 usage', async function () {
  const apnLog = await instantLinkPage.getAPNLogDetails('onstarhu');
  expect(apnLog.usage).toBe('Navigation IPv6');
});

Then('the logs show correct attributes for onstarwifi with WiFi Traffic usage', async function () {
  const apnLog = await instantLinkPage.getAPNLogDetails('onstarwifi');
  expect(apnLog.usage).toBe('WiFi Traffic');
});

Then('the logs show correct attributes for onstarsunman with eSIM profile download usage', async function () {
  const apnLog = await instantLinkPage.getAPNLogDetails('onstarsunman');
  expect(apnLog.usage).toBe('eSIM Profile Download');
});

When('the user queries network elements PCRF and HLR HSS for provisioned APNs', async function () {
  await instantLinkPage.navigateToNetworkElementsQuery();
  await instantLinkPage.queryPCRF();
  await instantLinkPage.queryHLRHSS();
});

Then('the APNs are correctly configured in network elements with proper attributes', async function () {
  const pcrfConfig = await instantLinkPage.getPCRFConfiguration();
  const hlrConfig = await instantLinkPage.getHLRHSSConfiguration();
  expect(pcrfConfig.apnsConfigured).toBeTruthy();
  expect(hlrConfig.apnsConfigured).toBeTruthy();
});

When('the user verifies PURGED RATEPLAN provisioning', async function () {
  await instantLinkPage.selectRatePlan('PURGED');
  await instantLinkPage.executeProvisioning();
});

Then('no APN attributes are sent to network elements for PURGED RATEPLAN', async function () {
  const sentAPNs = await instantLinkPage.getSentAPNsFromLogs();
  expect(sentAPNs.length).toBe(0);
});