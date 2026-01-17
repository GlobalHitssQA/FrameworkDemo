const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DatabaseQueryPage = require('../pages/DatabaseQueryPage');

let databaseQueryPage;
let identifiedLines;
let trafficRecords;
let costVerificationResults;
let shellExecutionResults;

Given('I have access to the database query system', async function() {
  databaseQueryPage = new DatabaseQueryPage(this.page);
  await databaseQueryPage.navigateToDatabaseQuerySystem();
  const hasAccess = await databaseQueryPage.verifyDatabaseAccess();
  expect(hasAccess).toBeTruthy();
});

Given('I have active SOLD plan lines with In Pool 10MB package and telemetry APNs configured', async function() {
  const preconditionsMet = await databaseQueryPage.verifyPreconditions();
  expect(preconditionsMet).toBeTruthy();
});

When('I identify active lines in SOLD plan with In Pool 10MB package and telemetry APNs APN1 and APN4', async function() {
  identifiedLines = await databaseQueryPage.identifySOLDLinesWithInPoolAndTelemetryAPNs('APN1', 'APN4');
});

Then('I should obtain a list of SOLD plan lines with active In Pool package and enabled telemetry APNs', async function() {
  expect(identifiedLines).toBeDefined();
  expect(identifiedLines.length).toBeGreaterThan(0);
  const allLinesValid = await databaseQueryPage.validateIdentifiedLines(identifiedLines);
  expect(allLinesValid).toBeTruthy();
});

When('I generate test telemetry traffic through APN1 and APN4 for the identified SOLD lines during the billing cycle', async function() {
  await databaseQueryPage.generateTelemetryTraffic(identifiedLines, ['APN1', 'APN4']);
});

Then('the telemetry traffic should be generated correctly and captured by the measurement system', async function() {
  const trafficCaptured = await databaseQueryPage.verifyTrafficCaptured(identifiedLines);
  expect(trafficCaptured).toBeTruthy();
});

When('I query the UDR_LT_01 table filtering by test lines in SOLD plan and telemetry APNs traffic', async function() {
  trafficRecords = await databaseQueryPage.queryUDRLT01Table(identifiedLines, ['APN1', 'APN4']);
});

Then('the telemetry traffic records should appear in UDR_LT_01 table with correct identification fields', async function() {
  expect(trafficRecords).toBeDefined();
  expect(trafficRecords.length).toBeGreaterThan(0);
  const fieldsCorrect = await databaseQueryPage.verifyRecordIdentificationFields(trafficRecords);
  expect(fieldsCorrect).toBeTruthy();
});

When('I verify the cost field in In Pool traffic records in UDR_LT_01 table for SOLD lines', async function() {
  costVerificationResults = await databaseQueryPage.verifyCostFieldInRecords(trafficRecords);
});

Then('all In Pool telemetry traffic records should show cost equal to zero in UDR_LT_01 table', async function() {
  const allCostsZero = costVerificationResults.every(record => record.cost === 0);
  expect(allCostsZero).toBeTruthy();
});

When('I execute the In Pool calculation Shell', async function() {
  shellExecutionResults = await databaseQueryPage.executeInPoolCalculationShell();
});

Then('the Shell should correctly copy records with zero cost from UDR_LT_01 to temporary table without modifying UDR_LT_01', async function() {
  const recordsCopiedCorrectly = await databaseQueryPage.verifyShellCopiedRecordsToTempTable(shellExecutionResults);
  expect(recordsCopiedCorrectly).toBeTruthy();
  const originalTableUnmodified = await databaseQueryPage.verifyUDRLT01Unmodified(trafficRecords);
  expect(originalTableUnmodified).toBeTruthy();
});