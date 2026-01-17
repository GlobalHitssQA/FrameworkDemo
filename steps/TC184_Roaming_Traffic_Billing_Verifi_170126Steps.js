const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RoamingBillingPage = require('../pages/RoamingBillingPage');

let roamingBillingPage;

Given('GM lines are active in SOLD plan with In Pool 10MB package assigned and available', async function () {
  roamingBillingPage = new RoamingBillingPage(this.page);
  await roamingBillingPage.navigateToLineConfiguration();
  await roamingBillingPage.verifyLinesInSoldPlan();
  await roamingBillingPage.verifyInPoolPackageAssigned();
  const isAvailable = await roamingBillingPage.isInPoolPackageAvailable();
  expect(isAvailable).toBe(true);
});

When('telemetry traffic is generated from APN1 and APN4 in international roaming mode', async function () {
  await roamingBillingPage.navigateToTrafficGeneration();
  await roamingBillingPage.selectAPNType('APN1');
  await roamingBillingPage.generateRoamingTraffic();
  await roamingBillingPage.selectAPNType('APN4');
  await roamingBillingPage.generateRoamingTraffic();
});

When('the In Pool calculation Shell is executed', async function () {
  await roamingBillingPage.navigateToShellExecution();
  await roamingBillingPage.executeInPoolCalculationShell();
  await roamingBillingPage.waitForShellProcessCompletion();
});

When('the billing process is executed', async function () {
  await roamingBillingPage.navigateToBillingProcess();
  await roamingBillingPage.executeBillingProcess();
  await roamingBillingPage.waitForBillingCompletion();
});

Then('the roaming traffic should be registered in UDR_LT_01 table without applying In Pool package', async function () {
  await roamingBillingPage.navigateToUDRTable();
  const isRegistered = await roamingBillingPage.verifyRoamingTrafficInUDR();
  expect(isRegistered).toBe(true);
  const inPoolApplied = await roamingBillingPage.isInPoolAppliedToRoaming();
  expect(inPoolApplied).toBe(false);
});

Then('the Shell should exclude roaming traffic from In Pool shared package calculation', async function () {
  await roamingBillingPage.navigateToShellResults();
  const isExcluded = await roamingBillingPage.verifyRoamingExcludedFromInPool();
  expect(isExcluded).toBe(true);
});

Then('the roaming traffic should be charged at bulk rate of {float} PEN per MB without In Pool discount', async function (expectedRate) {
  await roamingBillingPage.navigateToBillingDetails();
  const appliedRate = await roamingBillingPage.getRoamingChargeRate();
  expect(parseFloat(appliedRate)).toBeCloseTo(expectedRate, 4);
  const hasDiscount = await roamingBillingPage.hasInPoolDiscountApplied();
  expect(hasDiscount).toBe(false);
});

Then('the roaming traffic should not appear in SOLD In Pool Traffic Detail section', async function () {
  await roamingBillingPage.navigateToInvoice();
  const appearsInInPool = await roamingBillingPage.isRoamingInSoldInPoolSection();
  expect(appearsInInPool).toBe(false);
});

Then('the roaming traffic should be billed in a separate section at bulk rate', async function () {
  const isInSeparateSection = await roamingBillingPage.isRoamingInBulkRateSection();
  expect(isInSeparateSection).toBe(true);
  const billingDetails = await roamingBillingPage.getRoamingBillingDetails();
  expect(billingDetails.section).toBe('Servicios In Pool Granel');
});