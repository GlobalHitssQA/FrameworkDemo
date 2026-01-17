const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RateplanPage = require('../pages/RateplanPage');

let rateplanPage;

Given('the user has access to the BSCS7 database system', async function () {
  rateplanPage = new RateplanPage(this.page);
  await rateplanPage.navigateToDatabaseSystem();
  await rateplanPage.verifyDatabaseAccess();
});

When('the user queries the SYSSADM.RATEPLAN table', async function () {
  await rateplanPage.openRateplanTable();
  await rateplanPage.executeRateplanQuery();
});

Then('the table structure and existing records are displayed', async function () {
  const isTableVisible = await rateplanPage.isRateplanTableVisible();
  expect(isTableVisible).toBeTruthy();
  const hasRecords = await rateplanPage.tableHasRecords();
  expect(hasRecords).toBeTruthy();
});

Then('the 7 new plans TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD, DORMANT and PURGED exist with unique TMCODE', async function () {
  const expectedPlans = ['TESTING', 'MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM', 'SOLD', 'DORMANT', 'PURGED'];
  for (const plan of expectedPlans) {
    const planExists = await rateplanPage.verifyPlanExists(plan);
    expect(planExists).toBeTruthy();
  }
  const hasUniqueTmcodes = await rateplanPage.verifyUniqueTmcodes();
  expect(hasUniqueTmcodes).toBeTruthy();
});

Then('each plan has correct attributes according to specification', async function () {
  const testingAttrs = await rateplanPage.getPlanAttributes('TESTING');
  expect(testingAttrs.hasPreproductiveAPNs).toBeTruthy();
  
  const manufactureAttrs = await rateplanPage.getPlanAttributes('MANUFACTURE');
  expect(manufactureAttrs.minutes).toBe('10');
  expect(manufactureAttrs.sms).toBe('10');
  expect(manufactureAttrs.data).toBe('100MB');
  
  const unsoldNotShowroomAttrs = await rateplanPage.getPlanAttributes('UNSOLD NOT IN SHOWROOM');
  expect(unsoldNotShowroomAttrs.minutes).toBe('10');
  expect(unsoldNotShowroomAttrs.sms).toBe('10');
  expect(unsoldNotShowroomAttrs.data).toBe('100MB');
  
  const unsoldShowroomAttrs = await rateplanPage.getPlanAttributes('UNSOLD SHOWROOM');
  expect(unsoldShowroomAttrs.minutes).toBe('100');
  expect(unsoldShowroomAttrs.sms).toBe('100');
  expect(unsoldShowroomAttrs.data).toBe('2GB');
  
  const soldAttrs = await rateplanPage.getPlanAttributes('SOLD');
  expect(soldAttrs.inPoolMode).toBeTruthy();
  
  const dormantAttrs = await rateplanPage.getPlanAttributes('DORMANT');
  expect(dormantAttrs.hasFreeUnits).toBeFalsy();
  
  const purgedAttrs = await rateplanPage.getPlanAttributes('PURGED');
  expect(purgedAttrs.hasServices).toBeFalsy();
});

Then('Free Units and In Pool configurations are correctly associated', async function () {
  const plansWithFreeUnits = ['MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM'];
  for (const plan of plansWithFreeUnits) {
    const hasFreeUnits = await rateplanPage.verifyFreeUnitsConfiguration(plan);
    expect(hasFreeUnits).toBeTruthy();
  }
  
  const hasInPoolConfig = await rateplanPage.verifyInPoolConfiguration('SOLD');
  expect(hasInPoolConfig).toBeTruthy();
  
  const dormantFreeUnits = await rateplanPage.verifyFreeUnitsConfiguration('DORMANT');
  expect(dormantFreeUnits).toBeFalsy();
  
  const purgedFreeUnits = await rateplanPage.verifyFreeUnitsConfiguration('PURGED');
  expect(purgedFreeUnits).toBeFalsy();
});

Then('bulk rates are configured as VOZ 0.07, SMS 0.05, DATOS 0.2033 per MB without IGV', async function () {
  const plansToVerify = ['TESTING', 'MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM', 'SOLD', 'DORMANT'];
  
  for (const plan of plansToVerify) {
    const rates = await rateplanPage.getBulkRates(plan);
    expect(rates.voz).toBe('0.07');
    expect(rates.sms).toBe('0.05');
    expect(rates.datos).toBe('0.2033');
  }
  
  const purgedHasRates = await rateplanPage.verifyPlanHasActiveServices('PURGED');
  expect(purgedHasRates).toBeFalsy();
});