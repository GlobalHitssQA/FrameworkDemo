const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PlanTransitionPage = require('../pages/PlanTransitionPage');

let planTransitionPage;

Given('a GM line is active with plan UNSOLD - NOT IN SHOWROOM with {int} min voice, {int} SMS, {int} MB and productive APNs enabled', async function (voiceMin, smsCount, dataMB) {
  planTransitionPage = new PlanTransitionPage(this.page);
  await planTransitionPage.navigateToBSCS7();
  await planTransitionPage.searchLine();
  const currentPlan = await planTransitionPage.getCurrentPlan();
  expect(currentPlan).toContain('UNSOLD - NOT IN SHOWROOM');
  const includedServices = await planTransitionPage.getIncludedServices();
  expect(includedServices.voiceMinutes).toBe(voiceMin);
  expect(includedServices.smsCount).toBe(smsCount);
  expect(includedServices.dataMB).toBe(dataMB);
  const apnsEnabled = await planTransitionPage.areProductiveAPNsEnabled();
  expect(apnsEnabled).toBe(true);
});

When('the user executes the plan change from UNSOLD - NOT IN SHOWROOM to UNSOLD - SHOWROOM in BSCS7', async function () {
  await planTransitionPage.openChangePlanModal();
  await planTransitionPage.selectNewPlan('UNSOLD - SHOWROOM');
  await planTransitionPage.confirmPlanChange();
});

Then('the system processes the plan change correctly and updates the RATEPLAN in BSCS7', async function () {
  const confirmationMessage = await planTransitionPage.getConfirmationMessage();
  expect(confirmationMessage).toContain('Plan change processed successfully');
  const updatedRatePlan = await planTransitionPage.getRatePlanInBSCS7();
  expect(updatedRatePlan).toBe('UNSOLD - SHOWROOM');
});

Then('the plan UNSOLD - SHOWROOM is activated immediately on the same day without waiting for billing cycle', async function () {
  const activationDate = await planTransitionPage.getPlanActivationDate();
  const today = new Date().toISOString().split('T')[0];
  expect(activationDate).toBe(today);
  const planStatus = await planTransitionPage.getPlanStatus();
  expect(planStatus).toBe('Active');
});

Then('the line has new included services of {int} min voice, {int} SMS, {int} GB with all productive APNs and VoLTE enabled', async function (voiceMin, smsCount, dataGB) {
  const includedServices = await planTransitionPage.getIncludedServices();
  expect(includedServices.voiceMinutes).toBe(voiceMin);
  expect(includedServices.smsCount).toBe(smsCount);
  expect(includedServices.dataGB).toBe(dataGB);
  const apnList = await planTransitionPage.getActiveAPNs();
  const expectedAPNs = ['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7'];
  expect(apnList).toEqual(expect.arrayContaining(expectedAPNs));
  const volteEnabled = await planTransitionPage.isVoLTEEnabled();
  expect(volteEnabled).toBe(true);
});

Then('INSTANT LINK correctly sends the RATEPLAN UNSOLD - SHOWROOM with SERVICE_VOLTE and APN attributes to the network', async function () {
  await planTransitionPage.navigateToInstantLink();
  const provisionedRatePlan = await planTransitionPage.getProvisionedRatePlan();
  expect(provisionedRatePlan).toBe('UNSOLD - SHOWROOM');
  const serviceVolteProvisioned = await planTransitionPage.isServiceVolteProvisioned();
  expect(serviceVolteProvisioned).toBe(true);
  const apnAttributesSent = await planTransitionPage.areAPNAttributesSentToNetwork();
  expect(apnAttributesSent).toBe(true);
});