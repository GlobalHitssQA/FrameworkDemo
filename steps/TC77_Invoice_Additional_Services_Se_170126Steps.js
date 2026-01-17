const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InvoicePage = require('../pages/InvoicePage');

let invoicePage;

Given('the user is authenticated in BSCS7 system', async function () {
  invoicePage = new InvoicePage(this.page);
  await invoicePage.navigateToLogin();
  await invoicePage.login();
});

Given('there are active lines in SOLD plan with data consumption through APNs 2, 5 and 6', async function () {
  const hasActiveLines = await invoicePage.verifyActiveSoldLinesExist();
  expect(hasActiveLines).toBeTruthy();
});

Given('the In Pool calculation shell has been executed', async function () {
  const shellExecuted = await invoicePage.verifyInPoolShellExecuted();
  expect(shellExecuted).toBeTruthy();
});

When('the user generates an invoice for General Motors customer with active SOLD plan lines', async function () {
  await invoicePage.selectGeneralMotorsCustomer();
  await invoicePage.generateInvoice();
});

Then('the system processes the billing differentiating traffic by APN', async function () {
  const isProcessed = await invoicePage.verifyBillingProcessedByApn();
  expect(isProcessed).toBeTruthy();
});

When('the user navigates to the Additional Services section of the generated invoice', async function () {
  await invoicePage.navigateToAdditionalServicesSection();
});

Then('the system displays the section with data consumption details', async function () {
  const sectionVisible = await invoicePage.isAdditionalServicesSectionVisible();
  expect(sectionVisible).toBeTruthy();
});

Then('the traffic from APN 2 gmsa is displayed with rate 0.2033 per MB without IGV', async function () {
  const apn2Displayed = await invoicePage.isApnTrafficDisplayed('gmsa', '0.2033');
  expect(apn2Displayed).toBeTruthy();
});

Then('the traffic from APN 5 onstarbu is displayed with rate 0.2033 per MB without IGV', async function () {
  const apn5Displayed = await invoicePage.isApnTrafficDisplayed('onstarbu', '0.2033');
  expect(apn5Displayed).toBeTruthy();
});

Then('the traffic from APN 6 onstarwifi is displayed with rate 0.2033 per MB without IGV', async function () {
  const apn6Displayed = await invoicePage.isApnTrafficDisplayed('onstarwifi', '0.2033');
  expect(apn6Displayed).toBeTruthy();
});

Then('the traffic from APN 1 onstarsa telemetry is not displayed in this section', async function () {
  const apn1NotDisplayed = await invoicePage.isApnTrafficNotDisplayed('onstarsa');
  expect(apn1NotDisplayed).toBeTruthy();
});

Then('the traffic from APN 4 onstar01.v6 telemetry is not displayed in this section', async function () {
  const apn4NotDisplayed = await invoicePage.isApnTrafficNotDisplayed('onstar01.v6');
  expect(apn4NotDisplayed).toBeTruthy();
});