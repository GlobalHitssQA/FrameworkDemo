const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RatePlanPage = require('../pages/RatePlanPage');

let ratePlanPage;

Given('I am logged into the BSCS7 system with query permissions', async function () {
  ratePlanPage = new RatePlanPage(this.page);
  await ratePlanPage.navigateToSystem();
  await ratePlanPage.login();
});

When('I navigate to the Rate Plan configuration section', async function () {
  await ratePlanPage.navigateToRatePlanSection();
});

When('I search for the Rate Plan TESTING', async function () {
  await ratePlanPage.searchRatePlan('TESTING');
});

Then('the Rate Plan TESTING should be displayed with its unique identifier and basic parameters', async function () {
  const isDisplayed = await ratePlanPage.isRatePlanDisplayed();
  expect(isDisplayed).toBeTruthy();
  const hasIdentifier = await ratePlanPage.hasUniqueIdentifier();
  expect(hasIdentifier).toBeTruthy();
  const hasBasicParams = await ratePlanPage.hasBasicParameters();
  expect(hasBasicParams).toBeTruthy();
});

Then('the Rate Plan TESTING should have only pre-productive APNs APN1, APN2, APN4, APN5 and APN6 assigned', async function () {
  const assignedApns = await ratePlanPage.getAssignedApns();
  const expectedApns = ['APN1', 'APN2', 'APN4', 'APN5', 'APN6'];
  expect(assignedApns.sort()).toEqual(expectedApns.sort());
  const hasProductiveApns = await ratePlanPage.hasProductiveApns();
  expect(hasProductiveApns).toBeFalsy();
});

Then('the Rate Plan TESTING should have APN3 and APN7 configured for eSIM profile download', async function () {
  const esimApns = await ratePlanPage.getEsimProfileApns();
  expect(esimApns).toContain('APN3');
  expect(esimApns).toContain('APN7');
});

Then('all voice, SMS and data traffic should be configured as bulk billing without free units', async function () {
  const hasFreeUnits = await ratePlanPage.hasFreeUnitsConfigured();
  expect(hasFreeUnits).toBeFalsy();
  const isBulkBilling = await ratePlanPage.isBulkBillingEnabled();
  expect(isBulkBilling).toBeTruthy();
});

Then('the VoLTE service should be enabled for Rate Plan TESTING', async function () {
  const isVolteEnabled = await ratePlanPage.isVolteServiceEnabled();
  expect(isVolteEnabled).toBeTruthy();
});