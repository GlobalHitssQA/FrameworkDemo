const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ShellExecutionPage = require('../pages/ShellExecutionPage');

let shellPage;

Given('the BSCS7 system is available and configured', async function () {
  shellPage = new ShellExecutionPage(this.page);
  await shellPage.navigateToSystemConsole();
  const isAvailable = await shellPage.verifyBSCS7SystemAvailable();
  expect(isAvailable).toBeTruthy();
});

Given('the Shell sh_BSCS_calculaFacturaGM is deployed', async function () {
  const isDeployed = await shellPage.verifyShellDeployed('sh_BSCS_calculaFacturaGM');
  expect(isDeployed).toBeTruthy();
});

Given('the UDR_LT_01 table exists with test traffic data structure', async function () {
  const tableExists = await shellPage.verifyTableExists('UDR_LT_01');
  expect(tableExists).toBeTruthy();
});

Given('the temporary work table is created and empty', async function () {
  await shellPage.createTemporaryWorkTable();
  const isEmpty = await shellPage.verifyTemporaryTableEmpty();
  expect(isEmpty).toBeTruthy();
});

Given('the In Pool package is configured with zero cost in BSCS7', async function () {
  const isConfigured = await shellPage.verifyInPoolPackageZeroCost();
  expect(isConfigured).toBeTruthy();
});

When('I insert test traffic records in UDR_LT_01 for SOLD plan lines with APN1 and APN4 traffic', async function () {
  await shellPage.insertTestTrafficRecords('SOLD', ['APN1', 'APN4']);
  const recordsInserted = await shellPage.getInsertedRecordsCount();
  expect(recordsInserted).toBeGreaterThan(0);
});

When('I execute the Shell sh_BSCS_calculaFacturaGM to process SOLD plan line traffic', async function () {
  await shellPage.executeShell('sh_BSCS_calculaFacturaGM');
});

Then('the Shell should start correctly and read traffic records from UDR_LT_01', async function () {
  const shellStatus = await shellPage.getShellExecutionStatus();
  expect(shellStatus).toBe('running');
  const recordsRead = await shellPage.verifyRecordsReadFromUDR();
  expect(recordsRead).toBeTruthy();
});

Then('the temporary table should contain all telemetry traffic records from SOLD lines', async function () {
  const tempTableRecords = await shellPage.getTemporaryTableRecordCount();
  expect(tempTableRecords).toBeGreaterThan(0);
  const allSOLDRecords = await shellPage.verifyAllSOLDRecordsInTempTable();
  expect(allSOLDRecords).toBeTruthy();
});

Then('the temporary table should include all lines that were in SOLD Rate Plan during the cycle', async function () {
  const allCycleLines = await shellPage.verifyAllCycleLinesIncluded();
  expect(allCycleLines).toBeTruthy();
});

Then('the original records in UDR_LT_01 should maintain zero cost', async function () {
  const zeroCostMaintained = await shellPage.verifyUDRRecordsZeroCost();
  expect(zeroCostMaintained).toBeTruthy();
});

Then('the temporary table should not contain traffic records from APN2 APN5 or APN6', async function () {
  const excludedAPNs = ['APN2', 'APN5', 'APN6'];
  const hasExcludedAPNs = await shellPage.verifyNoExcludedAPNsInTempTable(excludedAPNs);
  expect(hasExcludedAPNs).toBeFalsy();
});