const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BSCS7BillingPage = require('../pages/BSCS7BillingPage');

let billingPage;

Given('the user is logged into the BSCS7 billing system', async function () {
  billingPage = new BSCS7BillingPage(this.page);
  await billingPage.navigateToLogin();
  await billingPage.login();
});

Given('the B2B2C 10GB 1 month package is configured in the system', async function () {
  const isConfigured = await billingPage.verifyPackageExists('B2B2C_10GB_1M');
  expect(isConfigured).toBeTruthy();
});

When('the user queries the parametric package table for B2B2C 10GB 1 month', async function () {
  await billingPage.navigateToParametricPackageTable();
  await billingPage.searchPackage('B2B2C_10GB_1M');
});

Then('the system displays the package cost as {string} soles without IGV', async function (expectedCost) {
  const displayedCost = await billingPage.getPackageCostWithoutIGV();
  expect(displayedCost).toBe(expectedCost);
});

Then('the package validity is {string} days', async function (expectedDays) {
  const validityDays = await billingPage.getPackageValidityDays();
  expect(validityDays).toBe(expectedDays);
});

When('the user simulates activation of B2B2C 10GB 1 month package for a SOLD plan line', async function () {
  await billingPage.navigateToPackageActivation();
  await billingPage.selectPlanType('SOLD');
  await billingPage.selectPackage('B2B2C_10GB_1M');
  await billingPage.simulateActivation();
});

Then('the system generates an activation record with cost {string} soles without IGV', async function (expectedCost) {
  const activationCost = await billingPage.getActivationRecordCost();
  expect(activationCost).toBe(expectedCost);
});

When('the user verifies the pre-billing process for the package activation', async function () {
  await billingPage.navigateToPreBilling();
  await billingPage.searchPreBillingRecord('B2B2C_10GB_1M');
});

Then('the system calculates the charge as {string} soles without IGV', async function (expectedCharge) {
  const calculatedCharge = await billingPage.getPreBillingCharge();
  expect(calculatedCharge).toBe(expectedCharge);
});

When('the user queries the monthly invoice for the B2B2C 10GB 1 month package', async function () {
  await billingPage.navigateToInvoiceQuery();
  await billingPage.searchInvoiceByPackage('B2B2C_10GB_1M');
});

Then('the invoice displays the package charge as {string} soles without IGV', async function (expectedCharge) {
  const invoiceCharge = await billingPage.getInvoicePackageCharge();
  expect(invoiceCharge).toBe(expectedCharge);
});