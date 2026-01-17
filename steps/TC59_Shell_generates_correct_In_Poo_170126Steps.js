const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('the system has {int} active lines in SOLD plan with a pool of {int} MB', async function (lineCount, poolSize) {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.configureSOLDPlanLines(lineCount, poolSize);
  const activeLines = await billingPage.getActiveLineCount();
  expect(activeLines).toBe(lineCount);
});

Given('the total telemetry consumption is {int} MB which is within the assigned pool', async function (consumption) {
  await billingPage.setTelemetryConsumption(consumption);
  const currentConsumption = await billingPage.getCurrentConsumption();
  expect(currentConsumption).toBe(consumption);
});

When('I execute the Shell sh_BSCS_ProcesoFacturaGM to generate the corresponding OCCs', async function () {
  await billingPage.executeShellProcess('sh_BSCS_ProcesoFacturaGM');
});

Then('the Shell processes correctly and executes the OCC generation function', async function () {
  const processStatus = await billingPage.getShellProcessStatus();
  expect(processStatus).toBe('SUCCESS');
});

Then('I query the Document All table to verify the In Pool Service OCC creation', async function () {
  await billingPage.navigateToDocumentAllTable();
  await billingPage.queryOCCRecords();
});

Then('an OCC with concept In Pool Service is generated for an amount of S\/. {float} without IGV', async function (expectedAmount) {
  const occRecord = await billingPage.getInPoolServiceOCC();
  expect(occRecord).not.toBeNull();
  const amount = await billingPage.getOCCAmount(occRecord);
  expect(amount).toBe(expectedAmount);
});

Then('I verify that NO In Pool Bulk Service OCC is generated because there is no excess', async function () {
  const bulkOCCExists = await billingPage.checkInPoolBulkServiceOCCExists();
  expect(bulkOCCExists).toBe(false);
});

Then('the Document All table does not contain any In Pool Bulk Service OCC for this period', async function () {
  const bulkRecords = await billingPage.getInPoolBulkServiceOCCRecords();
  expect(bulkRecords.length).toBe(0);
});

Then('I validate the generated OCC contains the correct gloss and is ready for HP Extreme consumption', async function () {
  const occRecord = await billingPage.getInPoolServiceOCC();
  const glossValid = await billingPage.validateOCCGloss(occRecord);
  expect(glossValid).toBe(true);
  const readyForHPExtreme = await billingPage.isOCCReadyForHPExtreme(occRecord);
  expect(readyForHPExtreme).toBe(true);
});

Then('the OCC has all required fields complete including CUSTOMER_ID concept amount cycle date and pre-billing status', async function () {
  const occRecord = await billingPage.getInPoolServiceOCC();
  const hasCustomerId = await billingPage.validateOCCField(occRecord, 'CUSTOMER_ID');
  const hasConcept = await billingPage.validateOCCField(occRecord, 'CONCEPT');
  const hasAmount = await billingPage.validateOCCField(occRecord, 'AMOUNT');
  const hasCycleDate = await billingPage.validateOCCField(occRecord, 'CYCLE_DATE');
  const hasPreBillingStatus = await billingPage.validateOCCField(occRecord, 'PRE_BILLING_STATUS');
  expect(hasCustomerId).toBe(true);
  expect(hasConcept).toBe(true);
  expect(hasAmount).toBe(true);
  expect(hasCycleDate).toBe(true);
  expect(hasPreBillingStatus).toBe(true);
});