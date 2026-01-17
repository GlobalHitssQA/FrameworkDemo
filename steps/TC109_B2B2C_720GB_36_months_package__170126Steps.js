const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('the user is logged into the BSCS7 billing system', async function () {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.login();
});

Given('the B2B2C 720GB 36 months package is created and configured', async function () {
  const isConfigured = await billingPage.verifyPackageExists('B2B2C 720GB 36 meses');
  expect(isConfigured).toBeTruthy();
});

Given('the SOLD plan is active', async function () {
  const isActive = await billingPage.verifySoldPlanActive();
  expect(isActive).toBeTruthy();
});

When('the user queries the parametric packages table for B2B2C 720GB 36 months', async function () {
  await billingPage.navigateToParametricPackagesTable();
  await billingPage.searchPackage('B2B2C 720GB 36 meses');
});

Then('the system displays the package cost as {string} without VAT', async function (expectedCost) {
  const displayedCost = await billingPage.getPackageCostWithoutVAT();
  expect(displayedCost).toBe(expectedCost);
});

Then('the system displays the validity as {string} days', async function (expectedDays) {
  const displayedValidity = await billingPage.getPackageValidityDays();
  expect(displayedValidity).toBe(expectedDays);
});

When('the user simulates activation of B2B2C 720GB 36 months package for a SOLD plan line', async function () {
  await billingPage.navigateToPackageActivation();
  await billingPage.selectPackageForActivation('B2B2C 720GB 36 meses');
  await billingPage.selectPlanType('SOLD');
  await billingPage.simulateActivation();
});

Then('the system generates an activation record with cost {string} without VAT', async function (expectedCost) {
  const activationCost = await billingPage.getActivationRecordCost();
  expect(activationCost).toBe(expectedCost);
});

When('the user verifies the pre-billing process for the package activation', async function () {
  await billingPage.navigateToPreBillingProcess();
  await billingPage.searchActivationInPreBilling('B2B2C 720GB 36 meses');
});

Then('the system calculates the charge as {string} without VAT', async function (expectedCharge) {
  const calculatedCharge = await billingPage.getPreBillingCharge();
  expect(calculatedCharge).toBe(expectedCharge);
});

When('the user queries the monthly invoice for B2B2C 720GB 36 months package', async function () {
  await billingPage.navigateToMonthlyInvoices();
  await billingPage.searchInvoiceByPackage('B2B2C 720GB 36 meses');
});

Then('the invoice displays the package charge as {string} without VAT', async function (expectedCharge) {
  const invoiceCharge = await billingPage.getInvoicePackageCharge();
  expect(invoiceCharge).toBe(expectedCharge);
});