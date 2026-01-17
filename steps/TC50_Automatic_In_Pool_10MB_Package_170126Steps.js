const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7PlanManagementPage = require('../pages/BSCS7PlanManagementPage');

let bscs7Page;

Given('a line is active in MANUFACTURE plan in BSCS7 system', async function () {
  bscs7Page = new BSCS7PlanManagementPage(this.page);
  await bscs7Page.navigateToPlanManagement();
  await bscs7Page.searchLineByPlan('MANUFACTURE');
  const planStatus = await bscs7Page.getLinePlanStatus();
  expect(planStatus).toBe('MANUFACTURE');
});

Given('the line has no In Pool package assigned', async function () {
  const hasInPoolPackage = await bscs7Page.checkInPoolPackageAssignment();
  expect(hasInPoolPackage).toBe(false);
});

When('the user executes the plan change from MANUFACTURE to SOLD through the standard process', async function () {
  await bscs7Page.openPlanChangeDialog();
  await bscs7Page.selectTargetPlan('SOLD');
  await bscs7Page.confirmPlanChange();
});

Then('the system processes the plan change to SOLD on the same day', async function () {
  const changeStatus = await bscs7Page.getPlanChangeStatus();
  expect(changeStatus).toBe('PROCESSED');
  const currentPlan = await bscs7Page.getLinePlanStatus();
  expect(currentPlan).toBe('SOLD');
});

Then('the In Pool 10MB package is automatically assigned to the line', async function () {
  await bscs7Page.refreshLineDetails();
  const hasInPoolPackage = await bscs7Page.checkInPoolPackageAssignment();
  expect(hasInPoolPackage).toBe(true);
  const packageName = await bscs7Page.getAssignedInPoolPackageName();
  expect(packageName).toContain('In Pool 10MB');
});

Then('the assigned package has 10MB capacity with zero cost in UDR_LT_01', async function () {
  await bscs7Page.openPackageDetails();
  const capacity = await bscs7Page.getPackageCapacity();
  expect(capacity).toBe('10 MB');
  const cost = await bscs7Page.getPackageCostUDR();
  expect(cost).toBe('0');
});

Then('the package is configured for telemetry APNs APN1 and APN4', async function () {
  const configuredAPNs = await bscs7Page.getPackageConfiguredAPNs();
  expect(configuredAPNs).toContain('APN1');
  expect(configuredAPNs).toContain('APN4');
});

Then('the line can consume telemetry data using the shared In Pool bucket', async function () {
  await bscs7Page.navigateToTrafficSimulation();
  await bscs7Page.simulateTelemetryTraffic('APN1');
  const trafficRegistered = await bscs7Page.verifyTrafficInSharedBucket();
  expect(trafficRegistered).toBe(true);
  await bscs7Page.simulateTelemetryTraffic('APN4');
  const trafficRegisteredAPN4 = await bscs7Page.verifyTrafficInSharedBucket();
  expect(trafficRegisteredAPN4).toBe(true);
});