const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolBillingPage = require('../pages/InPoolBillingPage');

let inPoolBillingPage;

Given('I have {int} lines configured with SOLD plan and {int}MB In Pool package each', async function(lineCount, packageSize) {
  inPoolBillingPage = new InPoolBillingPage(this.page);
  await inPoolBillingPage.navigateToLineConfiguration();
  await inPoolBillingPage.configureLines(lineCount, 'SOLD', packageSize);
});

Given('the total shared pool is {int} MB', async function(totalPool) {
  const displayedPool = await inPoolBillingPage.getSharedPoolTotal();
  expect(parseInt(displayedPool)).toBe(totalPool);
});

When('the total telemetry consumption reaches {int} MB across all lines', async function(consumption) {
  await inPoolBillingPage.navigateToConsumptionRegistration();
  await inPoolBillingPage.registerTelemetryConsumption(consumption);
});

When('I execute the In Pool calculation Shell before pre-billing', async function() {
  await inPoolBillingPage.navigateToShellExecution();
  await inPoolBillingPage.executeInPoolCalculationShell();
  await inPoolBillingPage.waitForShellCompletion();
});

Then('the system should calculate {int} MB of excess consumption', async function(excessMB) {
  const calculatedExcess = await inPoolBillingPage.getCalculatedExcess();
  expect(parseInt(calculatedExcess)).toBe(excessMB);
});

Then('an OCC for In Pool Service should be generated for S\/. {float} without IGV', async function(amount) {
  await inPoolBillingPage.navigateToOCCSection();
  const inPoolServiceAmount = await inPoolBillingPage.getInPoolServiceOCCAmount();
  expect(parseFloat(inPoolServiceAmount)).toBe(amount);
});

Then('an OCC for In Pool Bulk Service should be generated for S\/. {float} without IGV', async function(amount) {
  const inPoolBulkAmount = await inPoolBillingPage.getInPoolBulkServiceOCCAmount();
  expect(parseFloat(inPoolBulkAmount)).toBe(amount);
});

Then('the invoice should display In Pool Services for S\/. {float}', async function(amount) {
  await inPoolBillingPage.navigateToInvoicePreview();
  const invoiceInPoolAmount = await inPoolBillingPage.getInvoiceInPoolServicesAmount();
  expect(parseFloat(invoiceInPoolAmount)).toBe(amount);
});

Then('the invoice should display In Pool Bulk Services for S\/. {float}', async function(amount) {
  const invoiceBulkAmount = await inPoolBillingPage.getInvoiceInPoolBulkAmount();
  expect(parseFloat(invoiceBulkAmount)).toBe(amount);
});