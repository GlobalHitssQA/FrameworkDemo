const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolCalculationPage = require('../pages/InPoolCalculationPage');

let inPoolPage;
let lineConsumptions = [];
let totalConsumption = 0;
let assignedBag = 0;

Given('the BSCS7 system is operational', async function () {
  inPoolPage = new InPoolCalculationPage(this.page);
  await inPoolPage.navigateToSystem();
  const isOperational = await inPoolPage.verifySystemOperational();
  expect(isOperational).toBeTruthy();
});

Given('10 lines are configured in SOLD plan with the following APN1 consumption', async function (dataTable) {
  lineConsumptions = dataTable.hashes();
  for (const row of lineConsumptions) {
    await inPoolPage.configureLineInSOLDPlan(row.line, row.consumption_mb);
  }
  const configuredLines = await inPoolPage.getConfiguredLinesCount();
  expect(configuredLines).toBe(10);
});

Given('the consumption is registered in UDR_LT_01 table for APN1 onstarsa', async function () {
  for (const row of lineConsumptions) {
    await inPoolPage.registerConsumptionInUDR(row.line, row.consumption_mb, 'onstarsa');
  }
  const registeredRecords = await inPoolPage.getUDRRecordsCount('onstarsa');
  expect(registeredRecords).toBe(10);
});

When('the Shell sh_BSCS_calculaFacturaGM is executed to summarize APN1 telemetry traffic', async function () {
  await inPoolPage.executeCalculationShell();
  const shellExecuted = await inPoolPage.verifyShellExecutionSuccess();
  expect(shellExecuted).toBeTruthy();
});

Then('the Shell extracts all APN1 traffic records from SOLD plan lines to temporary work table', async function () {
  const extractedRecords = await inPoolPage.getExtractedRecordsFromTempTable();
  expect(extractedRecords).toBe(10);
});

Then('the Shell calculates total APN1 traffic as 57 MB', async function () {
  totalConsumption = await inPoolPage.getTotalTrafficCalculation();
  expect(totalConsumption).toBe(57);
});

Then('the assigned In Pool bag for 10 SOLD plan lines is 100 MB', async function () {
  assignedBag = await inPoolPage.getAssignedInPoolBag(10);
  expect(assignedBag).toBe(100);
});

Then('the consumed traffic of 57 MB is within the assigned bag of 100 MB', async function () {
  const isWithinBag = await inPoolPage.verifyConsumptionWithinBag(totalConsumption, assignedBag);
  expect(isWithinBag).toBeTruthy();
});

Then('no excess bulk consumption is generated', async function () {
  const excessGenerated = await inPoolPage.checkExcessBulkConsumption();
  expect(excessGenerated).toBeFalsy();
});