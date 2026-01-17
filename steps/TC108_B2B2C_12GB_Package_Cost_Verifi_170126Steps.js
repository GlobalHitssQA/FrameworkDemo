const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('the user is logged into the BSCS7 billing system', async function () {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.login();
});

Given('the B2B2C 12GB 12 months package is configured in the system', async function () {
  const isConfigured = await billingPage.verifyPackageExists('B2B2C 12GB 12 meses');
  expect(isConfigured).toBeTruthy();
});

When('the user queries the parametric packages table for B2B2C 12GB 12 months', async function () {
  await billingPage.navigateToParametricPackagesTable();
  await billingPage.searchPackage('B2B2C 12GB 12 meses');
});

Then('the system displays the package cost as {string} without IGV', async function (expectedCost) {
  const actualCost = await billingPage.getPackageCostWithoutIGV();
  expect(actualCost).toBe(expectedCost);
});

Then('the package validity is {string} days', async function (expectedDays) {
  const actualDays = await billingPage.getPackageValidityDays();
  expect(actualDays).toBe(expectedDays);
});

When('the user simulates activation of B2B2C 12GB 12 months package for a SOLD plan line', async function () {
  await billingPage.navigateToPackageActivation();
  await billingPage.selectPlanType('SOLD');
  await billingPage.selectPackage('B2B2C 12GB 12 meses');
  await billingPage.simulateActivation();
});

Then('the system generates an activation record with cost {string} without IGV', async function (expectedCost) {
  const activationCost = await billingPage.getActivationRecordCost();
  expect(activationCost).toBe(expectedCost);
});

When('the user verifies the pre-billing process for the package activation', async function () {
  await billingPage.navigateToPreBilling();
  await billingPage.searchActivationInPreBilling('B2B2C 12GB 12 meses');
});

Then('the system calculates the charge as {string} without IGV', async function (expectedCharge) {
  const calculatedCharge = await billingPage.getPreBillingCharge();
  expect(calculatedCharge).toBe(expectedCharge);
});

When('the user queries the generated monthly invoice for the B2B2C 12GB 12 months package', async function () {
  await billingPage.navigateToInvoiceQuery();
  await billingPage.searchInvoiceByPackage('B2B2C 12GB 12 meses');
});

Then('the invoice displays the package charge as {string} without IGV', async function (expectedCharge) {
  const invoiceCharge = await billingPage.getInvoicePackageCharge();
  expect(invoiceCharge).toBe(expectedCharge);
});