const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InvoicePage = require('../pages/InvoicePage');

let invoicePage;

Given('the user is authenticated in BSCS7 billing system', async function () {
  invoicePage = new InvoicePage(this.page);
  await invoicePage.navigateToLogin();
  await invoicePage.loginToBSCS7();
});

Given('there are active lines with data consumption in plans TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM and DORMANT', async function () {
  const hasActiveLines = await invoicePage.verifyActiveLinesExist();
  expect(hasActiveLines).toBeTruthy();
});

When('the user generates an invoice for General Motors client including these lines', async function () {
  await invoicePage.selectGeneralMotorsClient();
  await invoicePage.initiateInvoiceGeneration();
  await invoicePage.waitForInvoiceProcessing();
});

Then('the system processes the billing including consumption from all these lines', async function () {
  const isProcessed = await invoicePage.verifyBillingProcessed();
  expect(isProcessed).toBeTruthy();
});

When('the user navigates to the Additional Services section of the generated invoice', async function () {
  await invoicePage.openGeneratedInvoice();
  await invoicePage.navigateToAdditionalServicesSection();
});

Then('the system displays the section with data consumption details', async function () {
  const isSectionVisible = await invoicePage.isAdditionalServicesSectionVisible();
  expect(isSectionVisible).toBeTruthy();
});

Then('the data traffic for lines in TESTING plan is displayed correctly', async function () {
  const isDisplayed = await invoicePage.verifyPlanDataTrafficDisplayed('TESTING');
  expect(isDisplayed).toBeTruthy();
});

Then('the data traffic for lines in MANUFACTURE plan is displayed correctly', async function () {
  const isDisplayed = await invoicePage.verifyPlanDataTrafficDisplayed('MANUFACTURE');
  expect(isDisplayed).toBeTruthy();
});

Then('the data traffic for lines in UNSOLD NOT IN SHOWROOM plan is displayed correctly', async function () {
  const isDisplayed = await invoicePage.verifyPlanDataTrafficDisplayed('UNSOLD NOT IN SHOWROOM');
  expect(isDisplayed).toBeTruthy();
});

Then('the data traffic for lines in UNSOLD SHOWROOM plan is displayed correctly', async function () {
  const isDisplayed = await invoicePage.verifyPlanDataTrafficDisplayed('UNSOLD SHOWROOM');
  expect(isDisplayed).toBeTruthy();
});

Then('the data traffic for lines in DORMANT plan is displayed correctly', async function () {
  const isDisplayed = await invoicePage.verifyPlanDataTrafficDisplayed('DORMANT');
  expect(isDisplayed).toBeTruthy();
});

Then('all data consumption is billed at bulk rate of {float} PEN per MB without IGV', async function (expectedRate) {
  const actualRate = await invoicePage.getBulkRatePerMB();
  expect(actualRate).toBe(expectedRate);
});

Then('the SMS consumption is displayed without modifications according to current treatment', async function () {
  const isSMSCorrect = await invoicePage.verifySMSConsumptionDisplay();
  expect(isSMSCorrect).toBeTruthy();
});

Then('the VOICE consumption is displayed without modifications according to current treatment', async function () {
  const isVoiceCorrect = await invoicePage.verifyVoiceConsumptionDisplay();
  expect(isVoiceCorrect).toBeTruthy();
});