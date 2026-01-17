const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RatePlanDormantPage = require('../pages/RatePlanDormantPage');

let ratePlanPage;

Given('I am logged into the BSCS7 system with query permissions', async function () {
  ratePlanPage = new RatePlanDormantPage(this.page);
  await ratePlanPage.navigateToSystem();
  await ratePlanPage.login();
});

When('I navigate to the Rate Plan DORMANT configuration', async function () {
  await ratePlanPage.navigateToRatePlanConfiguration();
  await ratePlanPage.selectRatePlanDormant();
});

Then('the system should display Rate Plan DORMANT as a new plan without legacy homologation', async function () {
  const isNewPlan = await ratePlanPage.verifyRatePlanIsNew();
  expect(isNewPlan).toBeTruthy();
  const hasNoHomologation = await ratePlanPage.verifyNoLegacyHomologation();
  expect(hasNoHomologation).toBeTruthy();
});

Then('the Rate Plan DORMANT should have no configured included services for VOICE SMS or DATA', async function () {
  const hasNoVoiceIncluded = await ratePlanPage.verifyNoVoiceIncluded();
  const hasNoSmsIncluded = await ratePlanPage.verifyNoSmsIncluded();
  const hasNoDataIncluded = await ratePlanPage.verifyNoDataIncluded();
  expect(hasNoVoiceIncluded).toBeTruthy();
  expect(hasNoSmsIncluded).toBeTruthy();
  expect(hasNoDataIncluded).toBeTruthy();
});

Then('the system should show no records in FU_PACK and FUP_VERSION tables for Rate Plan DORMANT', async function () {
  const fuPackRecords = await ratePlanPage.getFuPackRecordsCount();
  const fupVersionRecords = await ratePlanPage.getFupVersionRecordsCount();
  expect(fuPackRecords).toBe(0);
  expect(fupVersionRecords).toBe(0);
});

When('I verify the bulk billing tariffs configuration', async function () {
  await ratePlanPage.navigateToBulkTariffsSection();
});

Then('the VOICE tariff should be configured at {float} soles per minute', async function (expectedTariff) {
  const voiceTariff = await ratePlanPage.getVoiceTariff();
  expect(voiceTariff).toBe(expectedTariff);
});

Then('the SMS tariff should be configured at {float} soles per message', async function (expectedTariff) {
  const smsTariff = await ratePlanPage.getSmsTariff();
  expect(smsTariff).toBe(expectedTariff);
});

Then('the DATA tariff should be configured at {float} soles per MB', async function (expectedTariff) {
  const dataTariff = await ratePlanPage.getDataTariff();
  expect(dataTariff).toBe(expectedTariff);
});

When('I check the APN matrix configuration', async function () {
  await ratePlanPage.navigateToApnMatrixSection();
});

Then('all productive APNs APN1 APN2 APN3 APN4 APN5 APN6 and APN7 should be assigned', async function () {
  const expectedApns = ['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7'];
  const assignedApns = await ratePlanPage.getAssignedApns();
  for (const apn of expectedApns) {
    expect(assignedApns).toContain(apn);
  }
});

When('I verify the VoLTE service configuration', async function () {
  await ratePlanPage.navigateToServicesSection();
});

Then('the SERVICE_VOLTE label should be active in the plan configuration', async function () {
  const isVolteActive = await ratePlanPage.isVolteServiceActive();
  expect(isVolteActive).toBeTruthy();
});