const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InvoiceTrafficDetailPage = require('../pages/InvoiceTrafficDetailPage');

let invoiceTrafficDetailPage;

Given('the user is authenticated in BSCS7 system', async function () {
  invoiceTrafficDetailPage = new InvoiceTrafficDetailPage(this.page);
  await invoiceTrafficDetailPage.navigateToLogin();
  await invoiceTrafficDetailPage.login();
});

Given('there are active lines in different Life Cycle plans for General Motors client', async function () {
  await invoiceTrafficDetailPage.verifyActiveLinesExist();
});

When('the user generates an invoice for General Motors client with billing cutoff on day 28', async function () {
  await invoiceTrafficDetailPage.navigateToInvoiceGeneration();
  await invoiceTrafficDetailPage.selectClient('General Motors');
  await invoiceTrafficDetailPage.setBillingCutoffDay('28');
  await invoiceTrafficDetailPage.generateInvoice();
});

Then('the system processes billing including lines in TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD and DORMANT plans', async function () {
  const expectedPlans = ['TESTING', 'MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM', 'SOLD', 'DORMANT'];
  const processingConfirmed = await invoiceTrafficDetailPage.verifyBillingProcessedForPlans(expectedPlans);
  expect(processingConfirmed).toBeTruthy();
});

When('the user navigates to the Traffic Detail section in the generated invoice', async function () {
  await invoiceTrafficDetailPage.navigateToTrafficDetailSection();
});

Then('the system displays the section with consumption detail per line', async function () {
  const sectionVisible = await invoiceTrafficDetailPage.isTrafficDetailSectionVisible();
  expect(sectionVisible).toBeTruthy();
});

Then('the Plan field column exists in the section structure', async function () {
  const planColumnExists = await invoiceTrafficDetailPage.isPlanColumnPresent();
  expect(planColumnExists).toBeTruthy();
});

Then('the Plan field is displayed alongside Service Number, Destination\/APN and Total Volume fields', async function () {
  const serviceNumberVisible = await invoiceTrafficDetailPage.isServiceNumberColumnPresent();
  const destinationApnVisible = await invoiceTrafficDetailPage.isDestinationApnColumnPresent();
  const totalVolumeVisible = await invoiceTrafficDetailPage.isTotalVolumeColumnPresent();
  const planVisible = await invoiceTrafficDetailPage.isPlanColumnPresent();
  
  expect(serviceNumberVisible).toBeTruthy();
  expect(destinationApnVisible).toBeTruthy();
  expect(totalVolumeVisible).toBeTruthy();
  expect(planVisible).toBeTruthy();
});

Then('each line displays the correct RATEPLAN name according to its status at cycle close', async function () {
  const validPlans = ['TESTING', 'MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM', 'SOLD', 'DORMANT'];
  const allPlansValid = await invoiceTrafficDetailPage.verifyAllLinesHaveValidPlan(validPlans);
  expect(allPlansValid).toBeTruthy();
});