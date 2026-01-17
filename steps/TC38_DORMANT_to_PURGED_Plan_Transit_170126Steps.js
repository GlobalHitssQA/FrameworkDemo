const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PlanTransitionPage = require('../pages/PlanTransitionPage');

let planTransitionPage;

Given('the line is in DORMANT state with all bulk traffic and VoLTE enabled', async function () {
  planTransitionPage = new PlanTransitionPage(this.page);
  await planTransitionPage.navigateToLineManagement();
  await planTransitionPage.searchLine();
  const currentPlan = await planTransitionPage.getCurrentPlanStatus();
  expect(currentPlan).toContain('DORMANT');
  const volteStatus = await planTransitionPage.getVoLTEStatus();
  expect(volteStatus).toBe('Enabled');
  const trafficType = await planTransitionPage.getTrafficType();
  expect(trafficType).toContain('Bulk');
});

When('I execute the plan change from DORMANT to PURGED through BSCS7', async function () {
  await planTransitionPage.openPlanChangeDialog();
  await planTransitionPage.selectTargetPlan('PURGED');
  await planTransitionPage.confirmPlanChange();
});

Then('the system processes the plan change correctly and updates RATEPLAN to PURGED', async function () {
  const confirmationMessage = await planTransitionPage.getConfirmationMessage();
  expect(confirmationMessage).toContain('Plan change processed successfully');
  const newPlan = await planTransitionPage.getCurrentPlanStatus();
  expect(newPlan).toContain('PURGED');
});

Then('the plan change is executed on the same day of the request', async function () {
  const activationDate = await planTransitionPage.getPlanActivationDate();
  const today = new Date().toISOString().split('T')[0];
  expect(activationDate).toBe(today);
});

Then('the SIM is inactive with no services no APNs and VoLTE disabled', async function () {
  const simStatus = await planTransitionPage.getSIMStatus();
  expect(simStatus).toBe('Inactive');
  const servicesCount = await planTransitionPage.getActiveServicesCount();
  expect(servicesCount).toBe(0);
  const apnCount = await planTransitionPage.getActiveAPNsCount();
  expect(apnCount).toBe(0);
  const volteStatus = await planTransitionPage.getVoLTEStatus();
  expect(volteStatus).toBe('Disabled');
});

Then('INSTANT LINK provisions RATEPLAN PURGED without services or APNs to the network', async function () {
  await planTransitionPage.navigateToInstantLinkProvisioning();
  const provisionedPlan = await planTransitionPage.getInstantLinkRatePlan();
  expect(provisionedPlan).toBe('PURGED');
  const hasServiceVolte = await planTransitionPage.hasInstantLinkServiceVoLTE();
  expect(hasServiceVolte).toBe(false);
  const provisionedAPNs = await planTransitionPage.getInstantLinkAPNs();
  expect(provisionedAPNs.length).toBe(0);
});