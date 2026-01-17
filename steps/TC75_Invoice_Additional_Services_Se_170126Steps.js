const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InvoiceAdditionalServicesPage = require('../pages/InvoiceAdditionalServicesPage');

let invoicePage;

Given('the user is authenticated in BSCS7 system', async function () {
  invoicePage = new InvoiceAdditionalServicesPage(this.page);
  await invoicePage.navigateToLoginPage();
  await invoicePage.authenticateUser();
});

Given('there are active lines in SOLD plan with telemetry consumption', async function () {
  const hasActiveLines = await invoicePage.verifyActiveSoldLinesExist();
  expect(hasActiveLines).toBeTruthy();
});

Given('the invoice has been generated with all sections', async function () {
  const invoiceGenerated = await invoicePage.verifyInvoiceGenerated();
  expect(invoiceGenerated).toBeTruthy();
});

Given('the In Pool calculation shell has been executed correctly', async function () {
  const shellExecuted = await invoicePage.verifyInPoolShellExecution();
  expect(shellExecuted).toBeTruthy();
});

When('the user navigates to the Additional Services section of the General Motors invoice', async function () {
  await invoicePage.navigateToGeneralMotorsInvoice();
  await invoicePage.openAdditionalServicesSection();
});

Then('the system displays the section with data, voice and SMS traffic detail', async function () {
  const sectionVisible = await invoicePage.isAdditionalServicesSectionVisible();
  expect(sectionVisible).toBeTruthy();
  
  const hasDataTraffic = await invoicePage.isDataTrafficDetailVisible();
  const hasVoiceTraffic = await invoicePage.isVoiceTrafficDetailVisible();
  const hasSmsTraffic = await invoicePage.isSmsTrafficDetailVisible();
  
  expect(hasDataTraffic).toBeTruthy();
  expect(hasVoiceTraffic).toBeTruthy();
  expect(hasSmsTraffic).toBeTruthy();
});

Then('the data traffic shown corresponds only to TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM and DORMANT plans', async function () {
  const allowedPlans = ['TESTING', 'MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM', 'DORMANT'];
  const displayedPlans = await invoicePage.getDisplayedDataTrafficPlans();
  
  for (const plan of displayedPlans) {
    expect(allowedPlans).toContain(plan);
  }
});

Then('for SOLD plan lines only traffic from APN2, APN5 and APN6 is displayed', async function () {
  const soldLineApns = await invoicePage.getSoldPlanApnTraffic();
  const allowedApns = ['APN2', 'APN5', 'APN6'];
  
  for (const apn of soldLineApns) {
    expect(allowedApns).toContain(apn);
  }
});

Then('APN1 and APN4 telemetry traffic from SOLD lines is completely excluded', async function () {
  const hasApn1Traffic = await invoicePage.isTelemetryApnVisibleForSold('APN1');
  const hasApn4Traffic = await invoicePage.isTelemetryApnVisibleForSold('APN4');
  
  expect(hasApn1Traffic).toBeFalsy();
  expect(hasApn4Traffic).toBeFalsy();
});

Then('there is no billing duplication of In Pool traffic in this section', async function () {
  const hasDuplication = await invoicePage.checkInPoolTrafficDuplication();
  expect(hasDuplication).toBeFalsy();
});