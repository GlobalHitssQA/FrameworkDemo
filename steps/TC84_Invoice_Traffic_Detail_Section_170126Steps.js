const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InvoiceTrafficDetailPage = require('../pages/InvoiceTrafficDetailPage');

let invoiceTrafficDetailPage;

Given('the user has access to the billing system', async function () {
  invoiceTrafficDetailPage = new InvoiceTrafficDetailPage(this.page);
  await invoiceTrafficDetailPage.navigateToBillingSystem();
});

Given('there are active lines in SOLD RatePlan with In Pool 10 MB package configured', async function () {
  const hasActiveLines = await invoiceTrafficDetailPage.verifyActiveLinesInSOLDRatePlan();
  expect(hasActiveLines).toBeTruthy();
});

Given('the In Pool calculation shell has been executed', async function () {
  const shellExecuted = await invoiceTrafficDetailPage.verifyInPoolCalculationShellExecuted();
  expect(shellExecuted).toBeTruthy();
});

Given('the billing cycle is closed', async function () {
  const cycleClosed = await invoiceTrafficDetailPage.verifyBillingCycleClosed();
  expect(cycleClosed).toBeTruthy();
});

When('the user generates a consolidated invoice for General Motors for the current cycle', async function () {
  await invoiceTrafficDetailPage.generateConsolidatedInvoice('General Motors');
});

Then('the system processes the billing including In Pool calculation', async function () {
  const processingComplete = await invoiceTrafficDetailPage.waitForInvoiceProcessing();
  expect(processingComplete).toBeTruthy();
});

When('the user navigates to the Traffic Detail SOLD section in the generated invoice', async function () {
  await invoiceTrafficDetailPage.navigateToTrafficDetailSOLDSection();
});

Then('the traffic detail section with telemetry data is displayed', async function () {
  const sectionVisible = await invoiceTrafficDetailPage.isTrafficDetailSectionVisible();
  expect(sectionVisible).toBeTruthy();
});

When('the user scrolls to the end of the Traffic Detail SOLD section', async function () {
  await invoiceTrafficDetailPage.scrollToEndOfTrafficDetailSection();
});

Then('a summary area is visible at the end of the section', async function () {
  const summaryVisible = await invoiceTrafficDetailPage.isSummaryAreaVisible();
  expect(summaryVisible).toBeTruthy();
});

Then('the summary displays the In Pool 10 MB consolidated concept', async function () {
  const conceptDisplayed = await invoiceTrafficDetailPage.isInPool10MBConceptDisplayed();
  expect(conceptDisplayed).toBeTruthy();
});

Then('the summary includes the assigned bag calculated as number of lines multiplied by 10 MB', async function () {
  const assignedBagVisible = await invoiceTrafficDetailPage.isAssignedBagDisplayed();
  expect(assignedBagVisible).toBeTruthy();
});

Then('the summary includes the consumption within the bag', async function () {
  const consumptionVisible = await invoiceTrafficDetailPage.isConsumptionWithinBagDisplayed();
  expect(consumptionVisible).toBeTruthy();
});

Then('the summary includes the bulk excess when consumption exceeds the bag', async function () {
  const excessVisible = await invoiceTrafficDetailPage.isBulkExcessDisplayed();
  expect(excessVisible).toBeTruthy();
});