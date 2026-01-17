const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7Page = require('../pages/BSCS7Page');

let bscs7Page;

Given('the user has permissions to create lines in BSCS7', async function () {
  bscs7Page = new BSCS7Page(this.page);
  await bscs7Page.navigateToBSCS7();
  await bscs7Page.verifyUserHasLineCreationPermissions();
});

Given('the MANUFACTURE plan is configured with VoLTE enabled', async function () {
  await bscs7Page.verifyManufacturePlanVoLTEConfiguration();
});

Given('INSTANT LINK connectivity with RED is available', async function () {
  await bscs7Page.verifyInstantLinkConnectivity();
});

Given('productive APNs are configured', async function () {
  await bscs7Page.verifyProductiveAPNsConfiguration();
});

When('the user creates a new GM line selecting MANUFACTURE plan in BSCS7', async function () {
  await bscs7Page.clickNewLineButton();
  await bscs7Page.selectManufacturePlan();
  await bscs7Page.confirmLineCreation();
});

Then('the system creates the line with RATEPLAN MANUFACTURE and configures 10 min VOICE, 10 SMS, 100 MB inclusions correctly', async function () {
  const ratePlan = await bscs7Page.getLinePlanName();
  expect(ratePlan).toBe('MANUFACTURE');
  const inclusions = await bscs7Page.getLineInclusions();
  expect(inclusions.voice).toBe('10 min');
  expect(inclusions.sms).toBe('10 SMS');
  expect(inclusions.data).toBe('100 MB');
});

Then('the VoLTE service is enabled for the new line in BSCS7', async function () {
  const voLTEStatus = await bscs7Page.getVoLTEServiceStatus();
  expect(voLTEStatus).toBe('Enabled');
});

Then('INSTANT LINK sends SERVICE_VOLTE parameter in the initial provision to RED', async function () {
  const provisionLog = await bscs7Page.getInstantLinkProvisionLog();
  expect(provisionLog).toContain('SERVICE_VOLTE');
  expect(provisionLog).toContain('MANUFACTURE');
});

Then('the network elements HLR HSS IMS reflect VoLTE service enabled for the new line', async function () {
  const hlrStatus = await bscs7Page.getNetworkElementStatus('HLR');
  const hssStatus = await bscs7Page.getNetworkElementStatus('HSS');
  const imsStatus = await bscs7Page.getNetworkElementStatus('IMS');
  expect(hlrStatus.voLTE).toBe('Enabled');
  expect(hssStatus.voLTE).toBe('Enabled');
  expect(imsStatus.voLTE).toBe('Enabled');
});

Then('all productive APNs APN1 APN2 APN3 APN4 APN5 APN6 APN7 are provisioned with active VoLTE', async function () {
  const apnList = ['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7'];
  for (const apn of apnList) {
    const apnStatus = await bscs7Page.getAPNStatus(apn);
    expect(apnStatus.active).toBe(true);
    expect(apnStatus.voLTE).toBe('Active');
  }
});