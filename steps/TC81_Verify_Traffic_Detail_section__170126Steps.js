const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InvoicePage = require('../pages/InvoicePage');

let invoicePage;

Given('the user is logged into the billing system', async function () {
  invoicePage = new InvoicePage(this.page);
  await invoicePage.navigateToLogin();
  await invoicePage.login();
});

Given('the General Motors consolidated invoice for the current cycle is available', async function () {
  await invoicePage.verifyInvoiceAvailable();
});

When('the user accesses the consolidated invoice', async function () {
  await invoicePage.openConsolidatedInvoice();
});

Then('the invoice is displayed with all configured sections', async function () {
  const isDisplayed = await invoicePage.isInvoiceDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('the user locates the Traffic Detail section', async function () {
  await invoicePage.scrollToTrafficDetailSection();
});

Then('the Traffic Detail section is visible with the Plan field included', async function () {
  const isSectionVisible = await invoicePage.isTrafficDetailSectionVisible();
  expect(isSectionVisible).toBeTruthy();
  const isPlanFieldVisible = await invoicePage.isPlanFieldVisible();
  expect(isPlanFieldVisible).toBeTruthy();
});

When('the user filters lines by SOLD RatePlan', async function () {
  await invoicePage.filterByRatePlan('SOLD');
});

Then('only lines with SOLD plan are displayed', async function () {
  const allLinesAreSold = await invoicePage.verifyAllLinesHavePlan('SOLD');
  expect(allLinesAreSold).toBeTruthy();
});

Then('the traffic shown corresponds only to APN2 gmsa and APN5 onstarilnup and APN6 onstarwifip', async function () {
  const validApns = ['gmsa', 'onstarilnup', 'onstarwifip'];
  const trafficIsValid = await invoicePage.verifyTrafficApns(validApns);
  expect(trafficIsValid).toBeTruthy();
});

Then('no traffic from APN1 or APN4 is displayed in the section', async function () {
  const excludedApns = ['APN1', 'APN4'];
  const noExcludedTraffic = await invoicePage.verifyNoTrafficFromApns(excludedApns);
  expect(noExcludedTraffic).toBeTruthy();
});