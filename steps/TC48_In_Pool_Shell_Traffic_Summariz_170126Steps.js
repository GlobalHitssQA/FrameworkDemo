const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolCalculationPage = require('../pages/InPoolCalculationPage');

let inPoolPage;

Given('the BSCS7 system is operational', async function () {
  inPoolPage = new InPoolCalculationPage(this.page);
  await inPoolPage.navigateToSystem();
  const isOperational = await inPoolPage.verifySystemOperational();
  expect(isOperational).toBeTruthy();
});

Given('10 lines are configured in SOLD plan with the following APN4 consumption:', async function (dataTable) {
  const consumptionData = dataTable.hashes();
  for (const row of consumptionData) {
    await inPoolPage.configureLineConsumption(row.line, row.consumption_mb);
  }
  const recordsRegistered = await inPoolPage.verifyConsumptionRegisteredInUDR();
  expect(recordsRegistered).toBeTruthy();
});

When('I execute the Shell sh_BSCS_calculaFacturaGM to summarize APN4 telemetry traffic', async function () {
  await inPoolPage.executeCalculationShell();
});

Then('the Shell extracts all APN4 traffic records from SOLD plan lines to the temporary work table', async function () {
  const extractionSuccessful = await inPoolPage.verifyTrafficExtraction();
  expect(extractionSuccessful).toBeTruthy();
});

Then('the Shell calculates the total APN4 traffic as {int} MB', async function (expectedTotal) {
  const totalTraffic = await inPoolPage.getTotalAPN4Traffic();
  expect(totalTraffic).toBe(expectedTotal);
});

Then('the assigned In Pool bucket is {int} MB for {int} lines', async function (expectedBucket, lineCount) {
  const assignedBucket = await inPoolPage.calculateAssignedBucket(lineCount);
  expect(assignedBucket).toBe(expectedBucket);
});

Then('the consumption of {int} MB is within the assigned bucket of {int} MB without generating bulk excess', async function (consumption, bucket) {
  const hasExcess = await inPoolPage.verifyNoExcessGenerated(consumption, bucket);
  expect(hasExcess).toBeFalsy();
});