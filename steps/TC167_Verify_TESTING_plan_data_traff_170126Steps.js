const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TestingPlanPage = require('../pages/TestingPlanPage');

let testingPlanPage;

Given('a line is provisioned in TESTING plan with preproductive APN1 Onstarsa', async function () {
  testingPlanPage = new TestingPlanPage(this.page);
  await testingPlanPage.navigateToProvisioningSection();
  await testingPlanPage.provisionLineInTestingPlan('APN1', 'Onstarsa');
  const isProvisioned = await testingPlanPage.verifyLineProvisionedSuccessfully();
  expect(isProvisioned).toBeTruthy();
});

When('the user verifies the TESTING plan APN configuration', async function () {
  await testingPlanPage.navigateToAPNConfiguration();
  await testingPlanPage.selectTestingPlan();
});

Then('the system should show only preproductive APNs configured', async function () {
  const preproductiveAPNs = await testingPlanPage.getConfiguredPreproductiveAPNs();
  const expectedAPNs = ['APN1', 'APN2', 'APN4', 'APN5', 'APN6'];
  expect(preproductiveAPNs).toEqual(expect.arrayContaining(expectedAPNs));
});

Then('the system should not show productive APNs APN3 and APN7', async function () {
  const hasProductiveAPN3 = await testingPlanPage.isProductiveAPNVisible('APN3');
  const hasProductiveAPN7 = await testingPlanPage.isProductiveAPNVisible('APN7');
  expect(hasProductiveAPN3).toBeFalsy();
  expect(hasProductiveAPN7).toBeFalsy();
});

When('the user generates telemetry data traffic through preproductive APN1', async function () {
  await testingPlanPage.navigateToTrafficSimulation();
  await testingPlanPage.generateTelemetryTraffic('APN1');
});

Then('the traffic should flow correctly through preproductive APN1', async function () {
  const trafficStatus = await testingPlanPage.getTrafficFlowStatus();
  expect(trafficStatus).toBe('success');
});

When('the user checks the UDR_LT_01 table for traffic records', async function () {
  await testingPlanPage.navigateToUDRTable();
  await testingPlanPage.searchTrafficRecords('UDR_LT_01');
});

Then('the consumption should be registered with bulk rate of 0.2033 soles per MB without IGV', async function () {
  const bulkRate = await testingPlanPage.getBulkRateFromTable();
  expect(bulkRate).toBe('0.2033');
  const rateType = await testingPlanPage.getRateType();
  expect(rateType).toBe('granel');
});

Then('the system should block traffic through productive APNs for TESTING plan', async function () {
  await testingPlanPage.navigateToTrafficValidation();
  const isAPN3Blocked = await testingPlanPage.verifyAPNBlocked('APN3');
  const isAPN7Blocked = await testingPlanPage.verifyAPNBlocked('APN7');
  expect(isAPN3Blocked).toBeTruthy();
  expect(isAPN7Blocked).toBeTruthy();
});