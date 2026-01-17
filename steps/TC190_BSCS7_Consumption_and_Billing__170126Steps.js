const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7BillingPage = require('../pages/BSCS7BillingPage');

let bscs7BillingPage;

Given('GM lines are active and BSCS7 system is operational', async function () {
  bscs7BillingPage = new BSCS7BillingPage(this.page);
  await bscs7BillingPage.navigateToBSCS7Console();
  await bscs7BillingPage.verifySystemOperational();
  await bscs7BillingPage.verifyGMLinesActive();
});

Given('Shell In Pool is configured and reporting systems are available', async function () {
  await bscs7BillingPage.verifyShellInPoolConfigured();
  await bscs7BillingPage.verifyReportingSystemsAvailable();
});

When('I generate controlled consumption on GM lines with {int} voice minutes and {int} SMS and {int} MB bulk data and {int} MB In Pool', async function (voiceMinutes, smsCount, bulkDataMB, inPoolMB) {
  await bscs7BillingPage.generateControlledConsumption({
    voiceMinutes: voiceMinutes,
    smsCount: smsCount,
    bulkDataMB: bulkDataMB,
    inPoolMB: inPoolMB
  });
});

Then('the consumption is recorded in BSCS7 table UDR_LT_01 with exact known values', async function () {
  const isRecorded = await bscs7BillingPage.verifyConsumptionInUDRTable();
  expect(isRecorded).toBeTruthy();
});

When('I execute the In Pool calculation Shell', async function () {
  await bscs7BillingPage.executeInPoolCalculationShell();
});

Then('the Shell processes exactly {int} MB In Pool and generates OCCs with expected amounts', async function (expectedMB) {
  const shellResult = await bscs7BillingPage.verifyShellProcessingResult(expectedMB);
  expect(shellResult.processedMB).toBe(expectedMB);
  expect(shellResult.occsGenerated).toBeTruthy();
});

When('I execute the complete billing process to generate consolidated invoice', async function () {
  await bscs7BillingPage.executeBillingProcess();
  await bscs7BillingPage.waitForInvoiceGeneration();
});

Then('the invoice is generated including all consumption for the period', async function () {
  const invoiceGenerated = await bscs7BillingPage.verifyInvoiceGenerated();
  expect(invoiceGenerated).toBeTruthy();
});

When('I extract consumption totals by traffic type from BSCS7', async function () {
  await bscs7BillingPage.extractConsumptionTotalsByTrafficType();
});

Then('the values in BSCS7 match exactly with amounts and quantities in the invoice', async function () {
  const comparisonResult = await bscs7BillingPage.compareBSCS7WithInvoice();
  expect(comparisonResult.voiceMatch).toBeTruthy();
  expect(comparisonResult.smsMatch).toBeTruthy();
  expect(comparisonResult.dataMatch).toBeTruthy();
  expect(comparisonResult.inPoolMatch).toBeTruthy();
});

When('I query reporting systems and datawarehouse for billing data', async function () {
  await bscs7BillingPage.queryReportingSystems();
  await bscs7BillingPage.queryDatawarehouse();
});

Then('reporting systems show the same consumption and billing values as BSCS7', async function () {
  const reportingMatch = await bscs7BillingPage.verifyReportingSystemsMatch();
  expect(reportingMatch).toBeTruthy();
});

Then('there is total data integrity between BSCS7 and invoice and reporting systems without discrepancies', async function () {
  const integrityResult = await bscs7BillingPage.validateDataIntegrity();
  expect(integrityResult.hasDiscrepancies).toBeFalsy();
  expect(integrityResult.bscs7InvoiceMatch).toBeTruthy();
  expect(integrityResult.bscs7ReportingMatch).toBeTruthy();
  expect(integrityResult.invoiceReportingMatch).toBeTruthy();
});