const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolBillingPage = require('../pages/InPoolBillingPage');

let inPoolBillingPage;
let calculatedAllocation;
let excessAmount = 100;
let numberOfLines;

Given('the SOLD lines are active with In Pool package configured', async function () {
  inPoolBillingPage = new InPoolBillingPage(this.page);
  await inPoolBillingPage.navigateToInPoolModule();
  await inPoolBillingPage.verifySoldLinesAreActive();
  await inPoolBillingPage.verifyInPoolPackageConfigured();
});

Given('the parametric table TIM.BSCST_FECT_RNG_PARAM has correct tariffs', async function () {
  await inPoolBillingPage.navigateToParametricTable();
  await inPoolBillingPage.verifyTariffConfiguration();
});

When('I calculate the total In Pool allocation for the SOLD line group', async function () {
  calculatedAllocation = await inPoolBillingPage.calculateTotalInPoolAllocation();
  numberOfLines = await inPoolBillingPage.getNumberOfActiveLines();
});

When('I configure a consumption scenario that exceeds the allocation by 100 MB', async function () {
  const targetConsumption = calculatedAllocation + excessAmount;
  await inPoolBillingPage.configureConsumptionScenario(targetConsumption);
});

When('I generate telemetry traffic totaling the complete In Pool allocation plus 100 MB additional', async function () {
  const totalTraffic = calculatedAllocation + excessAmount;
  await inPoolBillingPage.generateTelemetryTraffic(totalTraffic);
});

Then('the total telemetry consumption recorded equals the assigned allocation plus 100 MB excess', async function () {
  const recordedConsumption = await inPoolBillingPage.getRecordedTelemetryConsumption();
  const expectedConsumption = calculatedAllocation + excessAmount;
  expect(recordedConsumption).toBe(expectedConsumption);
});

When('I execute the In Pool calculation Shell to process the traffic', async function () {
  await inPoolBillingPage.navigateToCalculationShell();
  await inPoolBillingPage.executeInPoolCalculationShell();
});

Then('the Shell correctly identifies 100 MB excess over the assigned allocation', async function () {
  const identifiedExcess = await inPoolBillingPage.getIdentifiedExcessAmount();
  expect(identifiedExcess).toBe(excessAmount);
});

Then('the Shell applies the bulk tariff to the excess', async function () {
  const appliedTariff = await inPoolBillingPage.getAppliedBulkTariff();
  expect(appliedTariff).toBe(0.0372);
});

When('I verify the OCC In Pool Service generation', async function () {
  await inPoolBillingPage.navigateToOccInPoolService();
});

Then('the OCC In Pool Service is generated with amount equal to number of lines multiplied by 1.30 PEN without IGV', async function () {
  const occAmount = await inPoolBillingPage.getOccInPoolServiceAmount();
  const expectedAmount = numberOfLines * 1.30;
  expect(occAmount).toBeCloseTo(expectedAmount, 2);
});

When('I verify the OCC In Pool Bulk Service generation for the 100 MB excess', async function () {
  await inPoolBillingPage.navigateToOccInPoolBulkService();
});

Then('the OCC In Pool Bulk Service is generated with amount equal to 100 multiplied by 0.0372 PEN equals 3.72 PEN without IGV', async function () {
  const occBulkAmount = await inPoolBillingPage.getOccInPoolBulkServiceAmount();
  const expectedBulkAmount = excessAmount * 0.0372;
  expect(occBulkAmount).toBeCloseTo(expectedBulkAmount, 2);
});