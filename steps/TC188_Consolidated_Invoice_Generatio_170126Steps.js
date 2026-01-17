const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('the GM corporate account is configured with lines in all Life Cycle plans', async function () {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.verifyGMCorporateAccountExists();
});

Given('the lines are distributed across TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD and DORMANT plans', async function () {
  const plans = ['TESTING', 'MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM', 'SOLD', 'DORMANT'];
  await billingPage.verifyLinesDistributedAcrossPlans(plans);
});

When('varied consumption is generated including pool data, bulk, packages, In Pool and additional services', async function () {
  await billingPage.generateVariedConsumption();
  await billingPage.verifyConsumptionRegisteredInBSCS7();
});

When('the In Pool calculation Shell is executed for SOLD plan telemetry traffic', async function () {
  await billingPage.executeInPoolCalculationShell();
  await billingPage.verifyOCCsGenerated();
});

When('the billing process is executed with cutoff day 29', async function () {
  await billingPage.executeBillingProcess(29);
});

Then('a single consolidated invoice is generated for GM', async function () {
  const invoiceGenerated = await billingPage.verifyConsolidatedInvoiceGenerated();
  expect(invoiceGenerated).toBeTruthy();
});

Then('the invoice includes Services In Pool section with correct amounts', async function () {
  const sectionVisible = await billingPage.verifyServicesInPoolSection();
  expect(sectionVisible).toBeTruthy();
});

Then('the invoice includes Services In Pool Bulk section with correct amounts', async function () {
  const sectionVisible = await billingPage.verifyServicesInPoolBulkSection();
  expect(sectionVisible).toBeTruthy();
});

Then('the invoice includes Additional Services section', async function () {
  const sectionVisible = await billingPage.verifyAdditionalServicesSection();
  expect(sectionVisible).toBeTruthy();
});

Then('the invoice includes Traffic Detail section with LDI and Roaming', async function () {
  const sectionVisible = await billingPage.verifyTrafficDetailSection();
  expect(sectionVisible).toBeTruthy();
});

Then('the invoice total equals sum of all concepts plus 18 percent IGV', async function () {
  const totalsMatch = await billingPage.verifyInvoiceTotalWithIGV(18);
  expect(totalsMatch).toBeTruthy();
});