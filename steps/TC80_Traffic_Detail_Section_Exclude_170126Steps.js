const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InvoiceTrafficDetailPage = require('../pages/InvoiceTrafficDetailPage');

let invoiceTrafficDetailPage;

Given('the user is authenticated in BSCS7', async function () {
  invoiceTrafficDetailPage = new InvoiceTrafficDetailPage(this.page);
  await invoiceTrafficDetailPage.navigateToLogin();
  await invoiceTrafficDetailPage.login();
});

Given('there are active lines in SOLD plan with consumption from different APNs', async function () {
  await invoiceTrafficDetailPage.verifyActiveSOLDLinesExist();
});

Given('the In Pool calculation shell has been executed', async function () {
  await invoiceTrafficDetailPage.verifyInPoolShellExecuted();
});

When('the user generates an invoice for General Motors client with SOLD plan lines', async function () {
  await invoiceTrafficDetailPage.navigateToInvoiceGeneration();
  await invoiceTrafficDetailPage.selectGeneralMotorsClient();
  await invoiceTrafficDetailPage.generateInvoice();
});

When('the user navigates to the Traffic Detail section of the generated invoice', async function () {
  await invoiceTrafficDetailPage.openGeneratedInvoice();
  await invoiceTrafficDetailPage.navigateToTrafficDetailSection();
});

Then('the system should display only traffic from APN2 gmsa for SOLD lines', async function () {
  const isVisible = await invoiceTrafficDetailPage.isAPNTrafficVisible('APN2', 'gmsa');
  expect(isVisible).toBeTruthy();
});

Then('the system should display only traffic from APN5 onstarbu for SOLD lines', async function () {
  const isVisible = await invoiceTrafficDetailPage.isAPNTrafficVisible('APN5', 'onstarbu');
  expect(isVisible).toBeTruthy();
});

Then('the system should display only traffic from APN6 onstarwifi for SOLD lines', async function () {
  const isVisible = await invoiceTrafficDetailPage.isAPNTrafficVisible('APN6', 'onstarwifi');
  expect(isVisible).toBeTruthy();
});

Then('the system should not display telemetry traffic from APN1 onstarsa for SOLD lines', async function () {
  const isHidden = await invoiceTrafficDetailPage.isAPNTrafficHiddenInMainSection('APN1', 'onstarsa');
  expect(isHidden).toBeTruthy();
});

Then('the system should not display telemetry traffic from APN4 onstar01.v6 for SOLD lines', async function () {
  const isHidden = await invoiceTrafficDetailPage.isAPNTrafficHiddenInMainSection('APN4', 'onstar01.v6');
  expect(isHidden).toBeTruthy();
});

Then('the Traffic Detail SOLD section should exist with telemetry traffic summary', async function () {
  const sectionExists = await invoiceTrafficDetailPage.isTrafficDetailSOLDSectionVisible();
  expect(sectionExists).toBeTruthy();
  const hasTelemetryData = await invoiceTrafficDetailPage.verifyTelemetryTrafficInSOLDSection();
  expect(hasTelemetryData).toBeTruthy();
});