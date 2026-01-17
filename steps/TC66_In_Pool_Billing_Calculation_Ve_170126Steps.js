const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolBillingPage = require('../pages/InPoolBillingPage');

let inPoolBillingPage;
let totalLines;
let totalInPoolBag;
let telemetryConsumption;

Given('I have active SOLD plan lines with In Pool 10MB package configured', async function () {
  inPoolBillingPage = new InPoolBillingPage(this.page);
  await inPoolBillingPage.navigateToSoldPlanManagement();
  await inPoolBillingPage.verifyInPoolPackageConfigured();
});

Given('I identify the total number of active lines and calculate the total In Pool bag', async function () {
  totalLines = await inPoolBillingPage.getActiveSOLDLinesCount();
  totalInPoolBag = await inPoolBillingPage.calculateTotalInPoolBag(totalLines);
  expect(totalInPoolBag).toBe(totalLines * 10);
});

When('I configure a test scenario with telemetry consumption at 70 percent of the total bag', async function () {
  telemetryConsumption = Math.floor(totalInPoolBag * 0.70);
  await inPoolBillingPage.configureTelemetryConsumption(telemetryConsumption);
  const configuredConsumption = await inPoolBillingPage.getConfiguredConsumption();
  expect(configuredConsumption).toBeLessThan(totalInPoolBag);
});

When('I execute the In Pool calculation Shell to process the traffic', async function () {
  await inPoolBillingPage.executeInPoolCalculationShell();
  await inPoolBillingPage.waitForShellProcessingComplete();
});

Then('the Shell should determine consumption does not exceed the assigned bag', async function () {
  const hasExcess = await inPoolBillingPage.checkForExcessConsumption();
  expect(hasExcess).toBe(false);
  const shellResult = await inPoolBillingPage.getShellCalculationResult();
  expect(shellResult.excessAmount).toBe(0);
});

Then('the OCC In Pool Service should be generated for the full amount based on number of lines', async function () {
  const occInPoolService = await inPoolBillingPage.getOCCInPoolServiceAmount();
  const expectedAmount = totalLines * 1.30;
  expect(occInPoolService.isGenerated).toBe(true);
  expect(occInPoolService.amount).toBe(expectedAmount);
});

Then('no OCC In Pool Granel Service should be generated in Document All table', async function () {
  const occGranelExists = await inPoolBillingPage.checkOCCInPoolGranelExists();
  expect(occGranelExists).toBe(false);
  await inPoolBillingPage.verifyDocumentAllTableNoGranel();
});