const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PlanChangePage = require('../pages/BSCS7PlanChangePage');

let bscs7Page;

Given('a line is active in SOLD plan with In Pool 10MB package assigned for APN1 and APN4', async function () {
  bscs7Page = new BSCS7PlanChangePage(this.page);
  await bscs7Page.navigateToPlanManagement();
  const planStatus = await bscs7Page.getCurrentPlanStatus();
  expect(planStatus).toBe('SOLD');
  const hasInPoolPackage = await bscs7Page.verifyInPoolPackageAssigned('10MB', ['APN1', 'APN4']);
  expect(hasInPoolPackage).toBe(true);
});

Given('the line has In Pool mode active for telemetry and bulk traffic for other services', async function () {
  const telemetryMode = await bscs7Page.getTelemetryMode();
  expect(telemetryMode).toBe('In Pool');
  const otherServicesMode = await bscs7Page.getOtherServicesTrafficMode();
  expect(otherServicesMode).toBe('Bulk');
});

When('the user executes the plan change from SOLD to DORMANT via BSCS7', async function () {
  await bscs7Page.selectTargetPlan('DORMANT');
  await bscs7Page.executePlanChange();
  await bscs7Page.waitForPlanChangeConfirmation();
});

Then('the system processes the plan change correctly and updates the RATEPLAN to DORMANT in BSCS7', async function () {
  const newPlanStatus = await bscs7Page.getCurrentPlanStatus();
  expect(newPlanStatus).toBe('DORMANT');
  const ratePlan = await bscs7Page.getRatePlanValue();
  expect(ratePlan).toBe('DORMANT');
});

Then('the DORMANT plan is activated immediately on the same day without waiting for billing cycle', async function () {
  const activationDate = await bscs7Page.getPlanActivationDate();
  const today = new Date().toISOString().split('T')[0];
  expect(activationDate).toBe(today);
  const planStatus = await bscs7Page.getPlanEffectiveStatus();
  expect(planStatus).toBe('Active');
});

Then('the In Pool package is removed and all traffic switches to bulk mode without included data', async function () {
  const hasInPoolPackage = await bscs7Page.hasActiveInPoolPackage();
  expect(hasInPoolPackage).toBe(false);
  const trafficMode = await bscs7Page.getAllServicesTrafficMode();
  expect(trafficMode).toBe('Bulk');
});

Then('all traffic including VOICE SMS and DATA is charged at bulk rate without included allowances', async function () {
  const voiceBillingMode = await bscs7Page.getServiceBillingMode('VOICE');
  const smsBillingMode = await bscs7Page.getServiceBillingMode('SMS');
  const dataBillingMode = await bscs7Page.getServiceBillingMode('DATA');
  expect(voiceBillingMode).toBe('Bulk - No Included');
  expect(smsBillingMode).toBe('Bulk - No Included');
  expect(dataBillingMode).toBe('Bulk - No Included');
});

Then('VoLTE remains enabled for the line', async function () {
  const volteStatus = await bscs7Page.getVoLTEStatus();
  expect(volteStatus).toBe('Enabled');
});

Then('INSTANT LINK sends the DORMANT RATEPLAN with SERVICE_VOLTE to the network', async function () {
  await bscs7Page.navigateToInstantLinkProvisioning();
  const provisionedRatePlan = await bscs7Page.getInstantLinkRatePlan();
  expect(provisionedRatePlan).toBe('DORMANT');
  const serviceVolte = await bscs7Page.getInstantLinkServiceVoLTE();
  expect(serviceVolte).toBe('Active');
});

Then('all productive APNs APN1 APN2 APN3 APN4 APN5 APN6 APN7 are active in the network', async function () {
  const expectedAPNs = ['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7'];
  for (const apn of expectedAPNs) {
    const apnStatus = await bscs7Page.getAPNStatusInNetwork(apn);
    expect(apnStatus).toBe('Active');
  }
});