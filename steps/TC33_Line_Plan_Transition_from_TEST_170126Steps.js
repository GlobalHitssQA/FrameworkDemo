const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PlanTransitionPage = require('../pages/PlanTransitionPage');

let planTransitionPage;

Given('a GM line is active in TESTING plan with pre-productive APNs', async function () {
  planTransitionPage = new PlanTransitionPage(this.page);
  await planTransitionPage.navigateToBSCS7();
  await planTransitionPage.searchLine();
  const currentPlan = await planTransitionPage.getCurrentPlan();
  expect(currentPlan).toBe('TESTING');
  const apnStatus = await planTransitionPage.getAPNStatus();
  expect(apnStatus).toBe('PRE-PRODUCTIVE');
  const activeAPNs = await planTransitionPage.getActiveAPNs();
  expect(activeAPNs).toContain('APN1');
  expect(activeAPNs).toContain('APN2');
  expect(activeAPNs).toContain('APN4');
  expect(activeAPNs).toContain('APN5');
  expect(activeAPNs).toContain('APN6');
});

When('the user executes the plan change from TESTING to MANUFACTURE in BSCS7', async function () {
  await planTransitionPage.openPlanChangeSection();
  await planTransitionPage.selectNewPlan('MANUFACTURE');
  await planTransitionPage.confirmPlanChange();
});

Then('the system processes the plan change and updates the RATEPLAN in BSCS7', async function () {
  const confirmationMessage = await planTransitionPage.getConfirmationMessage();
  expect(confirmationMessage).toContain('Plan change processed successfully');
  const updatedRatePlan = await planTransitionPage.getCurrentRatePlan();
  expect(updatedRatePlan).toBe('MANUFACTURE');
});

Then('the MANUFACTURE plan is activated immediately on the same day', async function () {
  const activationDate = await planTransitionPage.getPlanActivationDate();
  const today = new Date().toISOString().split('T')[0];
  expect(activationDate).toBe(today);
  const planStatus = await planTransitionPage.getPlanStatus();
  expect(planStatus).toBe('ACTIVE');
});

Then('the APNs change to productive mode with correct included allowances', async function () {
  const apnStatus = await planTransitionPage.getAPNStatus();
  expect(apnStatus).toBe('PRODUCTIVE');
  const productiveAPNs = await planTransitionPage.getActiveAPNs();
  expect(productiveAPNs).toContain('APN1');
  expect(productiveAPNs).toContain('APN2');
  expect(productiveAPNs).toContain('APN3');
  expect(productiveAPNs).toContain('APN4');
  expect(productiveAPNs).toContain('APN5');
  expect(productiveAPNs).toContain('APN6');
  expect(productiveAPNs).toContain('APN7');
  const includedAllowances = await planTransitionPage.getIncludedAllowances();
  expect(includedAllowances.voice).toBe('10 min');
  expect(includedAllowances.sms).toBe('10 SMS');
  expect(includedAllowances.data).toBe('100 MB');
  const volteStatus = await planTransitionPage.getVoLTEStatus();
  expect(volteStatus).toBe('ENABLED');
});

Then('INSTANT LINK provisions the new RATEPLAN and VoLTE parameters to the network', async function () {
  await planTransitionPage.navigateToInstantLink();
  const provisionedRatePlan = await planTransitionPage.getProvisionedRatePlan();
  expect(provisionedRatePlan).toBe('MANUFACTURE');
  const serviceVoLTE = await planTransitionPage.getServiceVoLTEProvisioning();
  expect(serviceVoLTE).toBe('PROVISIONED');
  const apnAttributes = await planTransitionPage.getProvisionedAPNAttributes();
  expect(apnAttributes.mode).toBe('PRODUCTIVE');
  const networkSyncStatus = await planTransitionPage.getNetworkSyncStatus();
  expect(networkSyncStatus).toBe('SYNCHRONIZED');
});