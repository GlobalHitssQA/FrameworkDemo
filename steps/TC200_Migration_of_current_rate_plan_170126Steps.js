const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const MigrationPage = require('../pages/MigrationPage');

let migrationPage;

Given('the homologation table exists with plan mappings from current to new plans', async function () {
  migrationPage = new MigrationPage(this.page);
  await migrationPage.navigateToHomologationTable();
  const tableExists = await migrationPage.isHomologationTableVisible();
  expect(tableExists).toBeTruthy();
});

Given('all current plans RP0, RP1, RP2 and RP3 are active in production', async function () {
  const plansActive = await migrationPage.verifyCurrentPlansActive(['RP0', 'RP1', 'RP2', 'RP3']);
  expect(plansActive).toBeTruthy();
});

When('I verify the mapping of RP0 to TESTING plan', async function () {
  await migrationPage.selectPlanMapping('RP0', 'TESTING');
});

Then('the RP0 lines should be compatible with TESTING configuration', async function () {
  const isCompatible = await migrationPage.verifyPlanCompatibility('RP0', 'TESTING');
  expect(isCompatible).toBeTruthy();
});

Then('the bulk traffic billing behavior should be preserved without included units', async function () {
  const billingPreserved = await migrationPage.verifyBulkBillingPreserved('TESTING');
  expect(billingPreserved).toBeTruthy();
});

When('I verify the mapping of RP1 to MANUFACTURE plan', async function () {
  await migrationPage.selectPlanMapping('RP1', 'MANUFACTURE');
});

Then('the RP1 lines should migrate preserving 10min voice, 10 SMS and 100MB data included', async function () {
  const includedUnits = await migrationPage.getIncludedUnits('MANUFACTURE');
  expect(includedUnits.voice).toBe('10min');
  expect(includedUnits.sms).toBe('10');
  expect(includedUnits.data).toBe('100MB');
});

Then('the expected billing should remain unchanged', async function () {
  const billingUnchanged = await migrationPage.verifyBillingUnchanged('RP1', 'MANUFACTURE');
  expect(billingUnchanged).toBeTruthy();
});

When('I verify the mapping of RP2 to UNSOLD SHOWROOM plan', async function () {
  await migrationPage.selectPlanMapping('RP2', 'UNSOLD SHOWROOM');
});

Then('the RP2 lines should migrate preserving 100min voice, 100 SMS and 2GB data included', async function () {
  const includedUnits = await migrationPage.getIncludedUnits('UNSOLD SHOWROOM');
  expect(includedUnits.voice).toBe('100min');
  expect(includedUnits.sms).toBe('100');
  expect(includedUnits.data).toBe('2GB');
});

Then('no benefits should be lost during migration', async function () {
  const benefitsPreserved = await migrationPage.verifyBenefitsPreserved('RP2', 'UNSOLD SHOWROOM');
  expect(benefitsPreserved).toBeTruthy();
});

When('I verify the mapping of RP3 to SOLD plan', async function () {
  await migrationPage.selectPlanMapping('RP3', 'SOLD');
});

Then('the RP3 lines should implement In Pool 10MB for telemetry on APN1 and APN4', async function () {
  const inPoolConfig = await migrationPage.getInPoolConfiguration('SOLD');
  expect(inPoolConfig.size).toBe('10MB');
  expect(inPoolConfig.apns).toContain('APN1');
  expect(inPoolConfig.apns).toContain('APN4');
});

Then('the billing model should change from individual bulk to shared In Pool', async function () {
  const billingModel = await migrationPage.getBillingModel('SOLD');
  expect(billingModel).toBe('In Pool');
});

When('the migration process completes', async function () {
  await migrationPage.executeMigration();
  await migrationPage.waitForMigrationComplete();
});

Then('the old plans RP0, RP1, RP2 and RP3 should be marked as inactive', async function () {
  const plans = ['RP0', 'RP1', 'RP2', 'RP3'];
  for (const plan of plans) {
    const status = await migrationPage.getPlanStatus(plan);
    expect(status).toBe('inactive');
  }
});

Then('the old plans should remain available for historical queries', async function () {
  const historicalAccess = await migrationPage.verifyHistoricalAccessAvailable(['RP0', 'RP1', 'RP2', 'RP3']);
  expect(historicalAccess).toBeTruthy();
});

Then('the RATEPLAN table should reflect new Life Cycle plans', async function () {
  const ratePlanUpdated = await migrationPage.verifyTableUpdated('RATEPLAN');
  expect(ratePlanUpdated).toBeTruthy();
});

Then('the CSPP_PLANES table should be updated correctly', async function () {
  const csppUpdated = await migrationPage.verifyTableUpdated('CSPP_PLANES');
  expect(csppUpdated).toBeTruthy();
});

Then('the PCP_PLANES table should contain correct references', async function () {
  const pcpUpdated = await migrationPage.verifyTableUpdated('PCP_PLANES');
  expect(pcpUpdated).toBeTruthy();
});

Then('old plan references should be marked as historical', async function () {
  const historicalMarked = await migrationPage.verifyHistoricalReferences(['RP0', 'RP1', 'RP2', 'RP3']);
  expect(historicalMarked).toBeTruthy();
});