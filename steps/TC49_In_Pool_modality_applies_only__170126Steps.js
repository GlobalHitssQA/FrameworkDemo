const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('lines are configured in SOLD plan with telemetry traffic', async function () {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.selectSOLDPlan();
});

Given('APN1 has {int} MB local consumption and {int} MB Roaming consumption', async function (localMB, roamingMB) {
  await billingPage.configureAPN1Traffic(localMB, roamingMB);
});

Given('APN4 has {int} MB local consumption and {int} MB Roaming consumption', async function (localMB, roamingMB) {
  await billingPage.configureAPN4Traffic(localMB, roamingMB);
});

When('the billing calculation shell is executed', async function () {
  await billingPage.executeBillingCalculationShell();
});

Then('the system registers traffic differentiating local and Roaming consumption in UDR_LT_01 table', async function () {
  const trafficRegistered = await billingPage.verifyTrafficRegisteredInUDR();
  expect(trafficRegistered).toBeTruthy();
});

Then('the shell identifies and separates local traffic from Roaming traffic for APN1 and APN4', async function () {
  const trafficSeparated = await billingPage.verifyTrafficSeparation();
  expect(trafficSeparated).toBeTruthy();
});

Then('In Pool summarization includes only {int} MB of local traffic', async function (expectedMB) {
  const inPoolTotal = await billingPage.getInPoolSummarization();
  expect(inPoolTotal).toBe(expectedMB);
});

Then('Roaming traffic of {int} MB is excluded from In Pool calculation', async function (expectedRoamingMB) {
  const roamingExcluded = await billingPage.verifyRoamingExcludedFromInPool();
  const roamingTotal = await billingPage.getRoamingTrafficTotal();
  expect(roamingExcluded).toBeTruthy();
  expect(roamingTotal).toBe(expectedRoamingMB);
});

Then('Roaming traffic is billed at standard bulk rate of {float} per MB without IGV', async function (expectedRate) {
  const appliedRate = await billingPage.getRoamingBillingRate();
  expect(appliedRate).toBe(expectedRate);
});

Then('separate OCCs are generated for In Pool service and Roaming bulk traffic', async function () {
  const inPoolOCC = await billingPage.verifyInPoolOCCGenerated();
  const roamingOCC = await billingPage.verifyRoamingOCCGenerated();
  expect(inPoolOCC).toBeTruthy();
  expect(roamingOCC).toBeTruthy();
});