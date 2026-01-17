const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolBillingPage = require('../pages/InPoolBillingPage');

let inPoolBillingPage;
let calculatedPool;
let numberOfLines;

Given('the SOLD lines with active In Pool plan are configured in the system', async function () {
  inPoolBillingPage = new InPoolBillingPage(this.page);
  await inPoolBillingPage.navigateToInPoolConfiguration();
  const isConfigured = await inPoolBillingPage.verifySOLDLinesConfigured();
  expect(isConfigured).toBeTruthy();
});

Given('the In Pool calculation Shell is properly configured', async function () {
  const isShellConfigured = await inPoolBillingPage.verifyCalculationShellConfigured();
  expect(isShellConfigured).toBeTruthy();
});

Given('the parametric table has correct rates configured', async function () {
  const ratesConfigured = await inPoolBillingPage.verifyParametricTableRates();
  expect(ratesConfigured).toBeTruthy();
});

When('I calculate the total In Pool pool for active SOLD lines', async function () {
  numberOfLines = await inPoolBillingPage.getActiveSOLDLinesCount();
  calculatedPool = await inPoolBillingPage.calculateTotalInPoolPool(numberOfLines);
  expect(calculatedPool).toBeGreaterThan(0);
});

When('I configure consumption to exceed the pool by exactly 5 MB', async function () {
  const targetConsumption = calculatedPool + 5;
  await inPoolBillingPage.configureConsumptionTarget(targetConsumption);
});

When('I generate telemetry traffic through APN1 and APN4 totaling the pool plus 5 MB excess', async function () {
  const totalTraffic = calculatedPool + 5;
  await inPoolBillingPage.generateTelemetryTrafficAPN1(Math.floor(totalTraffic / 2));
  await inPoolBillingPage.generateTelemetryTrafficAPN4(Math.ceil(totalTraffic / 2));
  const generatedTraffic = await inPoolBillingPage.getTotalGeneratedTraffic();
  expect(generatedTraffic).toBe(totalTraffic);
});

When('I execute the In Pool calculation Shell to summarize traffic', async function () {
  await inPoolBillingPage.executeCalculationShell();
  await inPoolBillingPage.waitForShellExecution();
});

Then('the Shell should correctly detect a 5 MB excess over the assigned pool', async function () {
  const excessDetected = await inPoolBillingPage.getDetectedExcess();
  expect(excessDetected).toBe(5);
});

Then('the OCC In Pool Service should be generated for the total 10MB packages', async function () {
  const occGenerated = await inPoolBillingPage.verifyOCCInPoolServiceGenerated();
  expect(occGenerated).toBeTruthy();
});

Then('the OCC In Pool Service amount should equal number of lines multiplied by 1.30 soles', async function () {
  const expectedAmount = numberOfLines * 1.30;
  const actualAmount = await inPoolBillingPage.getOCCInPoolServiceAmount();
  expect(actualAmount).toBeCloseTo(expectedAmount, 2);
});

Then('the OCC In Pool Granel Service should be generated only for the 5 MB excess', async function () {
  const granelGenerated = await inPoolBillingPage.verifyOCCInPoolGranelServiceGenerated();
  expect(granelGenerated).toBeTruthy();
  const excessBilled = await inPoolBillingPage.getGranelExcessMB();
  expect(excessBilled).toBe(5);
});

Then('the OCC In Pool Granel Service amount should equal 0.186 soles', async function () {
  const expectedGranelAmount = 5 * 0.0372;
  const actualGranelAmount = await inPoolBillingPage.getOCCInPoolGranelServiceAmount();
  expect(actualGranelAmount).toBeCloseTo(expectedGranelAmount, 3);
});