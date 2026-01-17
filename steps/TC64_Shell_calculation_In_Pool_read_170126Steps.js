const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolCalculationPage = require('../pages/InPoolCalculationPage');

let inPoolPage;

Given('the parametric table TIM.BSCST_FECT_RNG_PARAM exists in BSCS7 database', async function() {
  inPoolPage = new InPoolCalculationPage(this.page);
  await inPoolPage.navigateToDatabase();
  const tableExists = await inPoolPage.verifyParametricTableExists();
  expect(tableExists).toBeTruthy();
});

Given('the table contains In Pool cost configuration records', async function() {
  const hasRecords = await inPoolPage.verifyTableHasInPoolRecords();
  expect(hasRecords).toBeTruthy();
});

When('I query the In Pool 10MB package cost from the parametric table', async function() {
  await inPoolPage.queryInPoolPackageCost();
});

Then('the package cost should be {float} soles without IGV', async function(expectedCost) {
  const actualCost = await inPoolPage.getPackageCostValue();
  expect(actualCost).toBe(expectedCost);
});

When('I query the bulk excess rate from the parametric table', async function() {
  await inPoolPage.queryBulkExcessRate();
});

Then('the bulk rate should be {float} soles per MB without IGV', async function(expectedRate) {
  const actualRate = await inPoolPage.getBulkRateValue();
  expect(actualRate).toBe(expectedRate);
});

When('I execute the In Pool calculation Shell with traceability log enabled', async function() {
  await inPoolPage.executeCalculationShellWithLog();
});

Then('the Shell should log the correct reading of values from TIM.BSCST_FECT_RNG_PARAM', async function() {
  const logContainsReading = await inPoolPage.verifyShellLogContainsParameterReading();
  expect(logContainsReading).toBeTruthy();
});

Then('the OCCs generated in Document All should use the costs read from the parametric table', async function() {
  await inPoolPage.navigateToDocumentAll();
  const occsUseCorrectCosts = await inPoolPage.verifyOCCsUseParametricCosts();
  expect(occsUseCorrectCosts).toBeTruthy();
});

Then('the OCC amounts should correspond to {float} for package and {float} per MB for bulk', async function(packageCost, bulkRate) {
  const packageAmount = await inPoolPage.getOCCPackageAmount();
  const bulkAmount = await inPoolPage.getOCCBulkRatePerMB();
  expect(packageAmount).toBe(packageCost);
  expect(bulkAmount).toBe(bulkRate);
});