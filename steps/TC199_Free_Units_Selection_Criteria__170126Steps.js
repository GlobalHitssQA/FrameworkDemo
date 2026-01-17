const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FupSelectCriteriaPage = require('../pages/FupSelectCriteriaPage');

let fupSelectCriteriaPage;

Given('the user is logged into BSCS7 database console', async function () {
  fupSelectCriteriaPage = new FupSelectCriteriaPage(this.page);
  await fupSelectCriteriaPage.navigateToBSCS7Console();
  await fupSelectCriteriaPage.login();
});

When('the user queries the SYSADM.FUP_SELECT_CRITERIA table filtering by Life Cycle GM packages', async function () {
  await fupSelectCriteriaPage.executeLifeCycleGMQuery();
});

Then('the table displays columns FU_PACK_ID, FUP_VERSION, FUP_SELECT_CRIT_ID, RATE_TYPE_CODE, SERVICE_PACKAGE_CODE and TARIFF_ZONE_CODE', async function () {
  const columns = await fupSelectCriteriaPage.getDisplayedColumns();
  expect(columns).toContain('FU_PACK_ID');
  expect(columns).toContain('FUP_VERSION');
  expect(columns).toContain('FUP_SELECT_CRIT_ID');
  expect(columns).toContain('RATE_TYPE_CODE');
  expect(columns).toContain('SERVICE_PACKAGE_CODE');
  expect(columns).toContain('TARIFF_ZONE_CODE');
});

Then('criteria records exist for plans MANUFACTURE, UNSOLD NOT IN SHOWROOM and UNSOLD SHOWROOM with their TMCODE references', async function () {
  const manufactureRecords = await fupSelectCriteriaPage.getCriteriaRecordsForPlan('MANUFACTURE');
  const unsoldNotShowroomRecords = await fupSelectCriteriaPage.getCriteriaRecordsForPlan('UNSOLD NOT IN SHOWROOM');
  const unsoldShowroomRecords = await fupSelectCriteriaPage.getCriteriaRecordsForPlan('UNSOLD SHOWROOM');
  expect(manufactureRecords.length).toBeGreaterThan(0);
  expect(unsoldNotShowroomRecords.length).toBeGreaterThan(0);
  expect(unsoldShowroomRecords.length).toBeGreaterThan(0);
});

Then('service type filters are configured to differentiate VOICE, SMS and DATA applications', async function () {
  const serviceFilters = await fupSelectCriteriaPage.getServiceTypeFilters();
  expect(serviceFilters).toContain('VOICE');
  expect(serviceFilters).toContain('SMS');
  expect(serviceFilters).toContain('DATA');
});

Then('TARIFF_ZONE_CODE values restrict Free Units application to local zone excluding roaming', async function () {
  const tariffZones = await fupSelectCriteriaPage.getTariffZoneCodes();
  const hasLocalZone = await fupSelectCriteriaPage.hasLocalZoneRestriction(tariffZones);
  expect(hasLocalZone).toBeTruthy();
});

Then('no criteria records exist for TESTING, SOLD, DORMANT or PURGED plans', async function () {
  const testingRecords = await fupSelectCriteriaPage.getCriteriaRecordsForPlan('TESTING');
  const soldRecords = await fupSelectCriteriaPage.getCriteriaRecordsForPlan('SOLD');
  const dormantRecords = await fupSelectCriteriaPage.getCriteriaRecordsForPlan('DORMANT');
  const purgedRecords = await fupSelectCriteriaPage.getCriteriaRecordsForPlan('PURGED');
  expect(testingRecords.length).toBe(0);
  expect(soldRecords.length).toBe(0);
  expect(dormantRecords.length).toBe(0);
  expect(purgedRecords.length).toBe(0);
});

Then('all criteria records have coherent FUP_VERSION values and active status', async function () {
  const allRecordsValid = await fupSelectCriteriaPage.validateVersionAndStatusCoherence();
  expect(allRecordsValid).toBeTruthy();
});