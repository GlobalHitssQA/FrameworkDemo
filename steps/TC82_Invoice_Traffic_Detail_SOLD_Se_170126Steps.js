const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InvoicePage = require('../pages/InvoicePage');

let invoicePage;

Given('the user is logged into the billing system', async function () {
  invoicePage = new InvoicePage(this.page);
  await invoicePage.navigateToBillingSystem();
  await invoicePage.login();
});

Given('the billing cycle is closed with SOLD RatePlan lines', async function () {
  const isCycleClosed = await invoicePage.verifyBillingCycleClosed();
  expect(isCycleClosed).toBeTruthy();
  const hasSoldLines = await invoicePage.verifySoldRatePlanLinesExist();
  expect(hasSoldLines).toBeTruthy();
});

When('the user generates the consolidated invoice for General Motors', async function () {
  await invoicePage.selectGeneralMotorsClient();
  await invoicePage.generateConsolidatedInvoice();
});

Then('the system processes and generates the complete invoice', async function () {
  const isInvoiceGenerated = await invoicePage.waitForInvoiceGeneration();
  expect(isInvoiceGenerated).toBeTruthy();
});

Then('the invoice displays all required sections including Consolidated, Additional Services, Traffic Detail, Traffic Detail SOLD, LDI, and Roaming', async function () {
  const sections = await invoicePage.getAllInvoiceSections();
  expect(sections).toContain('Consolidated');
  expect(sections).toContain('Additional Services');
  expect(sections).toContain('Traffic Detail');
  expect(sections).toContain('Traffic Detail SOLD');
  expect(sections).toContain('LDI');
  expect(sections).toContain('Roaming');
});

Then('the Traffic Detail SOLD section is positioned after the Traffic Detail section', async function () {
  const isCorrectlyPositioned = await invoicePage.verifySoldSectionPosition();
  expect(isCorrectlyPositioned).toBeTruthy();
});

Then('the Traffic Detail SOLD section contains the header and structure for telemetry traffic with APN fields, volume in MB, and plan', async function () {
  const hasHeader = await invoicePage.verifySoldSectionHeader();
  expect(hasHeader).toBeTruthy();
  const hasApnField = await invoicePage.verifyApnFieldExists();
  expect(hasApnField).toBeTruthy();
  const hasVolumeField = await invoicePage.verifyVolumeFieldExists();
  expect(hasVolumeField).toBeTruthy();
  const hasPlanField = await invoicePage.verifyPlanFieldExists();
  expect(hasPlanField).toBeTruthy();
});