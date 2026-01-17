const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolTrafficPage = require('../pages/InPoolTrafficPage');

let inPoolTrafficPage;

Given('the BSCS7 system is operational', async function () {
  inPoolTrafficPage = new InPoolTrafficPage(this.page);
  await inPoolTrafficPage.navigateToSystem();
  const isOperational = await inPoolTrafficPage.verifySystemOperational();
  expect(isOperational).toBeTruthy();
});

Given('lines are configured in SOLD plan with registered traffic in UDR_LT_01', async function () {
  await inPoolTrafficPage.navigateToLineConfiguration();
  const linesConfigured = await inPoolTrafficPage.verifyLinesInSoldPlan();
  expect(linesConfigured).toBeTruthy();
});

When('I configure traffic data for multiple APNs with specific MB values', async function () {
  const trafficData = [
    { apn: 'APN1', apnName: 'onstarsa', mb: 5 },
    { apn: 'APN2', apnName: 'gmsa', mb: 10 },
    { apn: 'APN4', apnName: 'onstar01.v6', mb: 3 },
    { apn: 'APN5', apnName: 'onstarlmxp', mb: 8 },
    { apn: 'APN6', apnName: 'onstarwifi', mb: 12 }
  ];
  await inPoolTrafficPage.configureTrafficForAPNs(trafficData);
  const trafficRegistered = await inPoolTrafficPage.verifyTrafficRegisteredInUDR();
  expect(trafficRegistered).toBeTruthy();
});

When('I execute the In Pool calculation shell script', async function () {
  await inPoolTrafficPage.executeInPoolCalculationShell();
  const shellExecuted = await inPoolTrafficPage.verifyShellExecutionComplete();
  expect(shellExecuted).toBeTruthy();
});

Then('the shell should identify only APN1 and APN4 traffic for In Pool calculation', async function () {
  const identifiedAPNs = await inPoolTrafficPage.getIdentifiedInPoolAPNs();
  expect(identifiedAPNs).toContain('APN1');
  expect(identifiedAPNs).toContain('APN4');
  expect(identifiedAPNs).not.toContain('APN2');
  expect(identifiedAPNs).not.toContain('APN5');
  expect(identifiedAPNs).not.toContain('APN6');
});

Then('the total In Pool traffic should be 8 MB from APN1 and APN4 combined', async function () {
  const totalInPoolTraffic = await inPoolTrafficPage.getTotalInPoolTraffic();
  expect(totalInPoolTraffic).toBe(8);
});

Then('APN2 APN5 and APN6 traffic should not be included in In Pool calculation', async function () {
  const excludedTraffic = await inPoolTrafficPage.getExcludedTrafficTotal();
  expect(excludedTraffic).toBe(30);
  const inPoolContainsExcluded = await inPoolTrafficPage.verifyExcludedAPNsNotInPool();
  expect(inPoolContainsExcluded).toBeFalsy();
});

Then('separate OCCs should be generated for In Pool and bulk traffic', async function () {
  const occInPool = await inPoolTrafficPage.getInPoolOCC();
  const occBulk = await inPoolTrafficPage.getBulkTrafficOCC();
  expect(occInPool).toBeTruthy();
  expect(occBulk).toBeTruthy();
  const inPoolAPNs = await inPoolTrafficPage.getOCCInPoolAPNs();
  const bulkAPNs = await inPoolTrafficPage.getOCCBulkAPNs();
  expect(inPoolAPNs).toEqual(['APN1', 'APN4']);
  expect(bulkAPNs).toEqual(['APN2', 'APN5', 'APN6']);
});