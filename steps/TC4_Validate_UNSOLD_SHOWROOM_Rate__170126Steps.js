const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7RatePlanPage = require('../pages/BSCS7RatePlanPage');

let bscs7Page;

Given('the user is logged into BSCS7 system with query permissions', async function () {
  bscs7Page = new BSCS7RatePlanPage(this.page);
  await bscs7Page.navigateToSystem();
  await bscs7Page.loginWithQueryPermissions();
});

When('the user navigates to Rate Plan configuration for UNSOLD SHOWROOM', async function () {
  await bscs7Page.navigateToRatePlanConfiguration();
  await bscs7Page.searchRatePlan('UNSOLD SHOWROOM');
});

Then('the Rate Plan UNSOLD SHOWROOM should be displayed and homologated with RP2', async function () {
  const isDisplayed = await bscs7Page.isRatePlanDisplayed('UNSOLD SHOWROOM');
  expect(isDisplayed).toBeTruthy();
  const homologation = await bscs7Page.getRatePlanHomologation();
  expect(homologation).toContain('RP2');
});

Then('the Free Units tables should show 100 voice minutes, 100 SMS and 2 GB data with monthly renewal', async function () {
  const freeUnits = await bscs7Page.getFreeUnitsConfiguration();
  expect(freeUnits.voiceMinutes).toBe(100);
  expect(freeUnits.smsCount).toBe(100);
  expect(freeUnits.dataGB).toBe(2);
  expect(freeUnits.renewalType).toBe('monthly');
});

When('the user checks the Split Billing configuration table', async function () {
  await bscs7Page.navigateToSplitBillingConfiguration();
});

Then('all productive APNs APN1 through APN7 should be associated to the plan', async function () {
  const associatedAPNs = await bscs7Page.getAssociatedAPNs();
  const expectedAPNs = ['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7'];
  for (const apn of expectedAPNs) {
    expect(associatedAPNs).toContain(apn);
  }
});

Then('APN3 esim.amx and APN7 onstarsuman should have zero cost for eSIM profile download', async function () {
  const apn3Cost = await bscs7Page.getAPNCost('APN3', 'esim.amx');
  const apn7Cost = await bscs7Page.getAPNCost('APN7', 'onstarsuman');
  expect(apn3Cost).toBe(0);
  expect(apn7Cost).toBe(0);
});

When('the user verifies the overage rates in SYSADM.RATEPLAN table', async function () {
  await bscs7Page.navigateToRatePlanTable();
});

Then('the bulk rates should be configured as VOZ 0.07 per minute, SMS 0.05 per message and DATA 0.2033 per MB', async function () {
  const overageRates = await bscs7Page.getOverageRates();
  expect(overageRates.voicePerMinute).toBe(0.07);
  expect(overageRates.smsPerMessage).toBe(0.05);
  expect(overageRates.dataPerMB).toBe(0.2033);
});