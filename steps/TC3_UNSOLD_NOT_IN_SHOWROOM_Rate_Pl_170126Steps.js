const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7RatePlanPage = require('../pages/BSCS7RatePlanPage');

let ratePlanPage;

Given('I am logged into the BSCS7 system with query permissions', async function () {
  ratePlanPage = new BSCS7RatePlanPage(this.page);
  await ratePlanPage.navigateToSystem();
  await ratePlanPage.login();
});

When('I search for the Rate Plan UNSOLD NOT IN SHOWROOM', async function () {
  await ratePlanPage.searchRatePlan('UNSOLD NOT IN SHOWROOM');
});

Then('the system should display the Rate Plan as a new plan without previous homologation', async function () {
  const isNewPlan = await ratePlanPage.isNewPlanWithoutHomologation();
  expect(isNewPlan).toBeTruthy();
});

Then('the FU_PACK table should show {int} minutes VOICE included per cycle', async function (minutes) {
  const voiceMinutes = await ratePlanPage.getIncludedVoiceMinutes();
  expect(voiceMinutes).toBe(minutes);
});

Then('the FU_PACK table should show {int} SMS included per cycle', async function (smsCount) {
  const smsIncluded = await ratePlanPage.getIncludedSMS();
  expect(smsIncluded).toBe(smsCount);
});

Then('the FU_PACK table should show {int} MB included per cycle', async function (mbCount) {
  const dataIncluded = await ratePlanPage.getIncludedDataMB();
  expect(dataIncluded).toBe(mbCount);
});

Then('the APN matrix should display all productive APNs APN1 through APN7', async function () {
  const expectedAPNs = ['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7'];
  const configuredAPNs = await ratePlanPage.getConfiguredAPNs();
  for (const apn of expectedAPNs) {
    expect(configuredAPNs).toContain(apn);
  }
});

Then('the SERVICE_VOLTE label should be active in the plan configuration', async function () {
  const isVoLTEActive = await ratePlanPage.isVoLTEServiceActive();
  expect(isVoLTEActive).toBeTruthy();
});

Then('the bulk tariffs for VOICE SMS and DATA should be configured according to specification', async function () {
  const areTariffsConfigured = await ratePlanPage.areBulkTariffsConfigured();
  expect(areTariffsConfigured).toBeTruthy();
});