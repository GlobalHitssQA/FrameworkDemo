const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingInPoolPage = require('../pages/BillingInPoolPage');

let billingPage;
let activeLines;
let inPoolAllocation;
let telemetryConsumption;

Given('I have active SOLD plan lines with In Pool package during the billing cycle', async function () {
  billingPage = new BillingInPoolPage(this.page);
  await billingPage.navigateToSOLDLinesSection();
  const hasActiveLines = await billingPage.verifyActiveSOLDLinesExist();
  expect(hasActiveLines).toBeTruthy();
});

Given('the In Pool calculation Shell is configured', async function () {
  const isConfigured = await billingPage.verifyInPoolShellConfiguration();
  expect(isConfigured).toBeTruthy();
});

Given('the Document All table is available', async function () {
  await billingPage.navigateToDocumentAllTable();
  const isAvailable = await billingPage.verifyDocumentAllTableAvailable();
  expect(isAvailable).toBeTruthy();
});

When('I identify the number of active SOLD lines and calculate the total In Pool allocation', async function () {
  activeLines = await billingPage.getActiveSOLDLinesCount();
  inPoolAllocation = await billingPage.calculateInPoolAllocation(activeLines);
});

Then('I should see the exact count of active SOLD lines', async function () {
  const displayedCount = await billingPage.getDisplayedSOLDLinesCount();
  expect(displayedCount).toBe(activeLines);
});

Then('the In Pool allocation should be calculated as lines multiplied by 10 MB', async function () {
  const expectedAllocation = activeLines * 10;
  expect(inPoolAllocation).toBe(expectedAllocation);
});

When('I configure the test scenario with telemetry consumption equal to the calculated allocation', async function () {
  await billingPage.navigateToTelemetryConfiguration();
  await billingPage.setTelemetryConsumption(inPoolAllocation);
});

Then('the total telemetry traffic from APN1 and APN4 should equal the assigned allocation exactly', async function () {
  const apn1Traffic = await billingPage.getAPN1TrafficConsumption();
  const apn4Traffic = await billingPage.getAPN4TrafficConsumption();
  telemetryConsumption = apn1Traffic + apn4Traffic;
  expect(telemetryConsumption).toBe(inPoolAllocation);
});

When('I execute the In Pool calculation Shell to summarize traffic', async function () {
  await billingPage.navigateToInPoolShell();
  await billingPage.executeInPoolCalculationShell();
});

Then('the Shell should calculate total consumption correctly', async function () {
  const calculatedConsumption = await billingPage.getShellCalculatedConsumption();
  expect(calculatedConsumption).toBe(telemetryConsumption);
});

Then('it should determine consumption equals allocation with no excess', async function () {
  const excessAmount = await billingPage.getExcessConsumption();
  expect(excessAmount).toBe(0);
});

When('I verify the generated OCC records', async function () {
  await billingPage.navigateToOCCRecords();
});

Then('an OCC with concept In Pool Service should be generated', async function () {
  const occExists = await billingPage.verifyInPoolServiceOCCExists();
  expect(occExists).toBeTruthy();
});

Then('the OCC amount should equal number of lines multiplied by 1.30 soles', async function () {
  const expectedAmount = activeLines * 1.30;
  const actualAmount = await billingPage.getInPoolServiceOCCAmount();
  expect(actualAmount).toBeCloseTo(expectedAmount, 2);
});

Then('no OCC with concept In Pool Granel Service should exist in Document All table', async function () {
  await billingPage.navigateToDocumentAllTable();
  const granelOCCExists = await billingPage.verifyInPoolGranelOCCNotExists();
  expect(granelOCCExists).toBeFalsy();
});