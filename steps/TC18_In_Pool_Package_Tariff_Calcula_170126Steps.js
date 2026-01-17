const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolBillingPage = require('../pages/InPoolBillingPage');

let inPoolBillingPage;

Given('I am authenticated in the billing system', async function () {
  inPoolBillingPage = new InPoolBillingPage(this.page);
  await inPoolBillingPage.navigateToSystem();
  await inPoolBillingPage.login();
});

Given('I have {int} active lines configured with SOLD plan', async function (numberOfLines) {
  await inPoolBillingPage.verifyActiveLinesWithSOLDPlan(numberOfLines);
});

When('I configure each line with 10MB In Pool package creating a shared pool of 50MB', async function () {
  await inPoolBillingPage.configureInPoolPackageForLines(5, 10);
  await inPoolBillingPage.verifySharedPoolCapacity(50);
});

When('I register 40MB total telemetry consumption across APN1 and APN4', async function () {
  await inPoolBillingPage.registerTelemetryConsumption(40, ['APN1', 'APN4']);
});

When('I execute the In Pool calculation Shell before pre-billing', async function () {
  await inPoolBillingPage.executeInPoolCalculationShell();
  await inPoolBillingPage.verifyNoExcessConsumption();
});

Then('the system should generate an OCC for In Pool Service with amount S\/. {float} without IGV', async function (expectedAmount) {
  const occAmount = await inPoolBillingPage.getOCCInPoolServiceAmount();
  expect(occAmount).toBe(expectedAmount);
});

Then('the invoice should display In Pool Services section with S\/. {float} without IGV', async function (expectedAmount) {
  await inPoolBillingPage.navigateToInvoice();
  const inPoolServicesAmount = await inPoolBillingPage.getInPoolServicesAmountFromInvoice();
  expect(inPoolServicesAmount).toBe(expectedAmount);
});

Then('the invoice should show S\/. {float} with IGV included', async function (expectedAmountWithIGV) {
  const totalWithIGV = await inPoolBillingPage.getInPoolServicesAmountWithIGV();
  expect(totalWithIGV).toBe(expectedAmountWithIGV);
});