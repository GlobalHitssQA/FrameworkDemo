const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingCyclePage = require('../pages/BillingCyclePage');

let billingCyclePage;

Given('GM lines are active with different Life Cycle plans configured for day 29 billing cycle', async function () {
  billingCyclePage = new BillingCyclePage(this.page);
  await billingCyclePage.navigateToBillingConfiguration();
  await billingCyclePage.verifyGMLinesActiveWithDay29Cycle();
});

When('voice SMS and data consumption is generated on the lines during the billing period', async function () {
  await billingCyclePage.generateConsumptionForLines();
});

When('the system registers all consumption in UDR_LT_01 table with correct date and time', async function () {
  const isRegistered = await billingCyclePage.verifyConsumptionRegisteredInUDR();
  expect(isRegistered).toBeTruthy();
});

When('the In Pool calculation Shell is executed before prebilling on day 29', async function () {
  await billingCyclePage.executeInPoolCalculationShell();
});

When('the Shell processes In Pool traffic and generates corresponding OCCs', async function () {
  const occsGenerated = await billingCyclePage.verifyInPoolOCCsGenerated();
  expect(occsGenerated).toBeTruthy();
});

When('the prebilling and billing process is executed on day 29', async function () {
  await billingCyclePage.executePrebillingProcess();
  await billingCyclePage.executeBillingProcess();
});

Then('the system closes the billing cycle on day 29 and processes all accumulated charges', async function () {
  const isCycleClosed = await billingCyclePage.verifyBillingCycleClosed();
  const chargesProcessed = await billingCyclePage.verifyChargesProcessed();
  expect(isCycleClosed).toBeTruthy();
  expect(chargesProcessed).toBeTruthy();
});

Then('the consolidated GM invoice is generated with period from day 29 of previous month to day 28 of current month', async function () {
  const invoiceGenerated = await billingCyclePage.verifyConsolidatedInvoiceGenerated();
  const periodCorrect = await billingCyclePage.verifyInvoicePeriodDay29ToDay28();
  expect(invoiceGenerated).toBeTruthy();
  expect(periodCorrect).toBeTruthy();
});

Then('the consolidated invoice includes all services consumption and charges for the billed period', async function () {
  const servicesIncluded = await billingCyclePage.verifyInvoiceIncludesAllServices();
  const consumptionIncluded = await billingCyclePage.verifyInvoiceIncludesAllConsumption();
  const chargesIncluded = await billingCyclePage.verifyInvoiceIncludesAllCharges();
  expect(servicesIncluded).toBeTruthy();
  expect(consumptionIncluded).toBeTruthy();
  expect(chargesIncluded).toBeTruthy();
});