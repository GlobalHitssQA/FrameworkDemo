const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProvisioningPage = require('../pages/ProvisioningPage');

let provisioningPage;

Given('the user has access to INSTANT LINK and BSCS7 with query permissions', async function () {
  provisioningPage = new ProvisioningPage(this.page);
  await provisioningPage.navigateToInstantLink();
  await provisioningPage.verifyUserHasQueryPermissions();
});

Given('the APN3 esim.amx is configured as a separate APN from APN2', async function () {
  await provisioningPage.navigateToAPNConfiguration();
  await provisioningPage.verifyAPN3IsSeparateFromAPN2();
});

Given('the tariffs are configured with zero cost for APN3', async function () {
  await provisioningPage.navigateToTariffConfiguration();
  await provisioningPage.verifyAPN3HasZeroCost();
});

When('the user provisions a line in Rate Plan TESTING', async function () {
  await provisioningPage.navigateToLineProvisioning();
  await provisioningPage.selectRatePlan('TESTING');
  await provisioningPage.provisionLine();
});

Then('the system should show that APN3 esim.amx is not assigned to Rate Plan TESTING', async function () {
  const isAPN3Assigned = await provisioningPage.isAPN3Assigned();
  expect(isAPN3Assigned).toBe(false);
});

When('the user provisions a line in Rate Plan MANUFACTURE', async function () {
  await provisioningPage.navigateToLineProvisioning();
  await provisioningPage.selectRatePlan('MANUFACTURE');
  await provisioningPage.provisionLine();
});

Then('the system should show APN3 esim.amx assigned with zero cost configuration', async function () {
  const isAPN3Assigned = await provisioningPage.isAPN3Assigned();
  const apnCost = await provisioningPage.getAPN3Cost();
  expect(isAPN3Assigned).toBe(true);
  expect(apnCost).toBe('0');
});

When('the user provisions a line in Rate Plan UNSOLD NOT IN SHOWROOM', async function () {
  await provisioningPage.navigateToLineProvisioning();
  await provisioningPage.selectRatePlan('UNSOLD NOT IN SHOWROOM');
  await provisioningPage.provisionLine();
});

Then('the system should show APN3 esim.amx assigned correctly without cost', async function () {
  const isAPN3Assigned = await provisioningPage.isAPN3Assigned();
  const apnCost = await provisioningPage.getAPN3Cost();
  expect(isAPN3Assigned).toBe(true);
  expect(apnCost).toBe('0');
});

When('the user provisions a line in Rate Plan UNSOLD SHOWROOM', async function () {
  await provisioningPage.navigateToLineProvisioning();
  await provisioningPage.selectRatePlan('UNSOLD SHOWROOM');
  await provisioningPage.provisionLine();
});

When('the user provisions a line in Rate Plan SOLD', async function () {
  await provisioningPage.navigateToLineProvisioning();
  await provisioningPage.selectRatePlan('SOLD');
  await provisioningPage.provisionLine();
});

Then('the system should show APN3 esim.amx assigned correctly for profile download', async function () {
  const isAPN3Assigned = await provisioningPage.isAPN3Assigned();
  const apnCost = await provisioningPage.getAPN3Cost();
  const apnName = await provisioningPage.getAPN3Name();
  expect(isAPN3Assigned).toBe(true);
  expect(apnCost).toBe('0');
  expect(apnName).toContain('esim.amx');
});

When('the user provisions a line in Rate Plan DORMANT', async function () {
  await provisioningPage.navigateToLineProvisioning();
  await provisioningPage.selectRatePlan('DORMANT');
  await provisioningPage.provisionLine();
});

When('the user verifies traffic records in BSCS7 UDR_LT_01 table for APN3', async function () {
  await provisioningPage.navigateToBSCS7();
  await provisioningPage.queryUDRTable('UDR_LT_01', 'esim.amx');
});

Then('the system should show traffic records with zero cost value', async function () {
  const trafficRecords = await provisioningPage.getTrafficRecordsCost();
  expect(trafficRecords).toBe('0');
});