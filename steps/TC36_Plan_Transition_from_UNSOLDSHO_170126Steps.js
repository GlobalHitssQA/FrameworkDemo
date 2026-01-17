const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PlanTransitionPage = require('../pages/PlanTransitionPage');

let planTransitionPage;

Given('a GM line is active with UNSOLD-SHOWROOM plan with {int} min voice and {int} SMS and {int} GB included', async function(voiceMinutes, smsCount, dataGB) {
  planTransitionPage = new PlanTransitionPage(this.page);
  await planTransitionPage.navigateToPlanManagement();
  const planDetails = await planTransitionPage.getLinePlanDetails();
  expect(planDetails.planName).toBe('UNSOLD - SHOWROOM');
  expect(planDetails.voiceMinutes).toBe(voiceMinutes);
  expect(planDetails.smsCount).toBe(smsCount);
  expect(planDetails.dataGB).toBe(dataGB);
});

Given('the line has productive APNs enabled', async function() {
  const apnStatus = await planTransitionPage.getAPNStatus();
  expect(apnStatus.productiveAPNsEnabled).toBe(true);
});

When('the user executes plan change from UNSOLD-SHOWROOM to SOLD in BSCS7', async function() {
  await planTransitionPage.selectLine();
  await planTransitionPage.openPlanChangeDialog();
  await planTransitionPage.selectTargetPlan('SOLD');
  await planTransitionPage.confirmPlanChange();
});

Then('the system processes the plan change correctly', async function() {
  const changeStatus = await planTransitionPage.getPlanChangeStatus();
  expect(changeStatus.processed).toBe(true);
});

Then('the RATEPLAN is updated to SOLD in BSCS7', async function() {
  const currentRatePlan = await planTransitionPage.getCurrentRatePlan();
  expect(currentRatePlan).toBe('SOLD');
});

Then('the plan change is executed on the same day of the request', async function() {
  const executionDate = await planTransitionPage.getPlanChangeExecutionDate();
  const today = new Date().toISOString().split('T')[0];
  expect(executionDate).toBe(today);
});

Then('the SOLD plan is activated immediately without waiting for billing cycle', async function() {
  const activationStatus = await planTransitionPage.getPlanActivationStatus();
  expect(activationStatus.immediateActivation).toBe(true);
  expect(activationStatus.waitingForBillingCycle).toBe(false);
});

Then('the included allowances are removed from the line', async function() {
  const allowances = await planTransitionPage.getLineAllowances();
  expect(allowances.voiceMinutes).toBe(0);
  expect(allowances.smsCount).toBe(0);
  expect(allowances.dataGB).toBe(0);
});

Then('the In Pool {int} MB package is activated for telemetry on APN1 and APN4', async function(mbAmount) {
  const inPoolPackage = await planTransitionPage.getInPoolPackageDetails();
  expect(inPoolPackage.activated).toBe(true);
  expect(inPoolPackage.mbAmount).toBe(mbAmount);
  expect(inPoolPackage.apns).toContain('APN1');
  expect(inPoolPackage.apns).toContain('APN4');
});

Then('the line has bulk traffic except for APN1 and APN4 using In Pool modality', async function() {
  const trafficConfig = await planTransitionPage.getTrafficConfiguration();
  expect(trafficConfig.bulkTrafficEnabled).toBe(true);
  expect(trafficConfig.inPoolAPNs).toEqual(['APN1', 'APN4']);
});

Then('VoLTE is enabled on the line', async function() {
  const volteStatus = await planTransitionPage.getVoLTEStatus();
  expect(volteStatus.enabled).toBe(true);
});

Then('INSTANT LINK provisions the SOLD RATEPLAN with SERVICE_VOLTE correctly', async function() {
  const instantLinkStatus = await planTransitionPage.getInstantLinkProvisionStatus();
  expect(instantLinkStatus.ratePlan).toBe('SOLD');
  expect(instantLinkStatus.serviceVoLTE).toBe(true);
  expect(instantLinkStatus.provisionedCorrectly).toBe(true);
});

Then('the In Pool package is automatically assigned to the line without manual intervention', async function() {
  const assignmentDetails = await planTransitionPage.getInPoolAssignmentDetails();
  expect(assignmentDetails.automaticAssignment).toBe(true);
  expect(assignmentDetails.manualIntervention).toBe(false);
});