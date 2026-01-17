const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolCalculationPage = require('../pages/InPoolCalculationPage');

let inPoolPage;

Given('the In Pool calculation Shell is configured and functional', async function () {
  inPoolPage = new InPoolCalculationPage(this.page);
  await inPoolPage.navigateToShellConfiguration();
  const isConfigured = await inPoolPage.verifyShellIsConfigured();
  expect(isConfigured).toBeTruthy();
});

Given('there are SOLD plan lines with telemetry traffic available', async function () {
  const hasSOLDLines = await inPoolPage.verifySOLDLinesAvailable();
  expect(hasSOLDLines).toBeTruthy();
});

Given('the Document All table is accessible', async function () {
  await inPoolPage.navigateToDocumentAllTable();
  const isAccessible = await inPoolPage.verifyDocumentAllTableAccessible();
  expect(isAccessible).toBeTruthy();
});

Given('the parametric table TIM.BSCST_FECT_RNG_PARAM has configured rates', async function () {
  await inPoolPage.navigateToParametricTable();
  const hasRates = await inPoolPage.verifyParametricTableHasRates();
  expect(hasRates).toBeTruthy();
});

When('I configure a scenario with SOLD lines consuming In Pool traffic within the assigned pool', async function () {
  await inPoolPage.configureSOLDLinesWithinPool();
});

When('I execute the In Pool calculation Shell for the billing cycle', async function () {
  await inPoolPage.executeInPoolShell();
});

Then('the Shell executes correctly and processes telemetry traffic from SOLD lines', async function () {
  const executionStatus = await inPoolPage.getShellExecutionStatus();
  expect(executionStatus).toBe('success');
  const processedTraffic = await inPoolPage.verifyTelemetryTrafficProcessed();
  expect(processedTraffic).toBeTruthy();
});

When('I query the Document All table filtering by Service In Pool concept and billing period', async function () {
  await inPoolPage.queryDocumentAllByServiceInPool();
});

Then('an OCC is registered with Service In Pool concept with amount equal to number of 10MB packages multiplied by 1.30 soles', async function () {
  const occRecord = await inPoolPage.getServiceInPoolOCCRecord();
  expect(occRecord.concept).toBe('Servicio In Pool');
  const expectedAmount = await inPoolPage.calculateExpectedInPoolAmount();
  expect(occRecord.amount).toBe(expectedAmount);
});

When('I configure an additional scenario with SOLD lines exceeding the assigned In Pool pool', async function () {
  await inPoolPage.configureSOLDLinesExceedingPool();
});

When('I execute the In Pool calculation Shell with the excess consumption scenario', async function () {
  await inPoolPage.executeInPoolShellWithExcess();
});

Then('the Shell processes correctly the excess consumption and calculates additional MB at bulk rate', async function () {
  const excessProcessed = await inPoolPage.verifyExcessConsumptionProcessed();
  expect(excessProcessed).toBeTruthy();
  const bulkCalculation = await inPoolPage.verifyBulkRateCalculation();
  expect(bulkCalculation).toBeTruthy();
});

When('I query the Document All table filtering by Service In Pool Bulk concept and processed period', async function () {
  await inPoolPage.queryDocumentAllByServiceInPoolBulk();
});

Then('an OCC is registered with Service In Pool Bulk concept with amount equal to excess MB multiplied by 0.0372 soles', async function () {
  const occBulkRecord = await inPoolPage.getServiceInPoolBulkOCCRecord();
  expect(occBulkRecord.concept).toBe('Servicio In Pool Granel');
  const expectedBulkAmount = await inPoolPage.calculateExpectedBulkAmount();
  expect(occBulkRecord.amount).toBe(expectedBulkAmount);
});