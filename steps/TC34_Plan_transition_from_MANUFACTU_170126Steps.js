const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PlanManagementPage = require('../pages/BSCS7PlanManagementPage');

let bscs7Page;

Given('a line is active in MANUFACTURE plan with 10 min voice and 10 SMS and 100 MB included', async function () {
  bscs7Page = new BSCS7PlanManagementPage(this.page);
  await bscs7Page.navigateToLineManagement();
  const planStatus = await bscs7Page.verifyCurrentPlan('MANUFACTURE');
  expect(planStatus).toBe(true);
  const voiceIncluded = await bscs7Page.getIncludedVoiceMinutes();
  expect(voiceIncluded).toBe('10');
  const smsIncluded = await bscs7Page.getIncludedSMS();
  expect(smsIncluded).toBe('10');
  const dataIncluded = await bscs7Page.getIncludedDataMB();
  expect(dataIncluded).toBe('100');
  const apnsEnabled = await bscs7Page.verifyProductiveAPNsEnabled();
  expect(apnsEnabled).toBe(true);
});

Given('the user has plan change permissions in BSCS7', async function () {
  const hasPermissions = await bscs7Page.verifyUserHasPlanChangePermissions();
  expect(hasPermissions).toBe(true);
});

When('the user executes the plan change from MANUFACTURE to UNSOLD NOT IN SHOWROOM in BSCS7', async function () {
  await bscs7Page.openPlanChangeDialog();
  await bscs7Page.selectTargetPlan('UNSOLD - NOT IN SHOWROOM');
  await bscs7Page.confirmPlanChange();
});

Then('the system processes the plan change correctly', async function () {
  const processingStatus = await bscs7Page.getPlanChangeProcessingStatus();
  expect(processingStatus).toBe('SUCCESS');
});

Then('the RATEPLAN is updated in BSCS7', async function () {
  const ratePlanUpdated = await bscs7Page.verifyRatePlanUpdated('UNSOLD - NOT IN SHOWROOM');
  expect(ratePlanUpdated).toBe(true);
});

Then('the plan change is activated on the same day without waiting for billing cycle', async function () {
  const activationDate = await bscs7Page.getPlanActivationDate();
  const today = new Date().toISOString().split('T')[0];
  expect(activationDate).toBe(today);
  const currentPlan = await bscs7Page.getCurrentActivePlan();
  expect(currentPlan).toBe('UNSOLD - NOT IN SHOWROOM');
});

Then('the line maintains the same included services of 10 min voice and 10 SMS and 100 MB', async function () {
  const voiceIncluded = await bscs7Page.getIncludedVoiceMinutes();
  expect(voiceIncluded).toBe('10');
  const smsIncluded = await bscs7Page.getIncludedSMS();
  expect(smsIncluded).toBe('10');
  const dataIncluded = await bscs7Page.getIncludedDataMB();
  expect(dataIncluded).toBe('100');
});

Then('all productive APNs remain enabled including APN1 through APN7', async function () {
  const expectedAPNs = ['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7'];
  for (const apn of expectedAPNs) {
    const apnEnabled = await bscs7Page.verifyAPNEnabled(apn);
    expect(apnEnabled).toBe(true);
  }
});

Then('VoLTE remains enabled on the line', async function () {
  const volteEnabled = await bscs7Page.verifyVoLTEEnabled();
  expect(volteEnabled).toBe(true);
});

Then('INSTANT LINK sends the updated RATEPLAN with SERVICE_VOLTE and APN attributes to the network', async function () {
  const instantLinkStatus = await bscs7Page.verifyInstantLinkProvisioning();
  expect(instantLinkStatus.ratePlanSent).toBe(true);
  expect(instantLinkStatus.serviceVolte).toBe(true);
  expect(instantLinkStatus.apnAttributesSent).toBe(true);
});