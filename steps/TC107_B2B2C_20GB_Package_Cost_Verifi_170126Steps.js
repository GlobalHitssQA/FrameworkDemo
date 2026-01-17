const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('the user is logged into the BSCS7 billing system', async function () {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.login();
});

Given('the B2B2C 20GB 1 month package is configured in the system', async function () {
  const isConfigured = await billingPage.verifyPackageExists('B2B2C 20GB 1 mes');
  expect(isConfigured).toBeTruthy();
});

When('the user queries the package parametric table for B2B2C 20GB 1 month package', async function () {
  await billingPage.openParametricTable();
  await billingPage.searchPackage('B2B2C 20GB 1 mes');
});

Then('the system displays the package cost as {string} without IGV', async function (expectedCost) {
  const displayedCost = await billingPage.getPackageCostWithoutIGV();
  expect(displayedCost).toBe(expectedCost);
});

Then('the package validity is {string} days', async function (expectedDays) {
  const validity = await billingPage.getPackageValidity();
  expect(validity).toBe(expectedDays);
});

When('the user simulates the activation of B2B2C 20GB 1 month package for a SOLD plan line', async function () {
  await billingPage.navigateToPackageActivation();
  await billingPage.selectPlan('SOLD');
  await billingPage.selectPackage('B2B2C 20GB 1 mes');
  await billingPage.simulateActivation();
});

Then('the system generates an activation record with cost {string} without IGV', async function (expectedCost) {
  const activationCost = await billingPage.getActivationRecordCost();
  expect(activationCost).toBe(expectedCost);
});

When('the user verifies the pre-billing process for the package activation', async function () {
  await billingPage.navigateToPreBilling();
  await billingPage.searchPreBillingRecord('B2B2C 20GB 1 mes');
});

Then('the system calculates the charge as {string} without IGV', async function (expectedCharge) {
  const calculatedCharge = await billingPage.getPreBillingCharge();
  expect(calculatedCharge).toBe(expectedCharge);
});

When('the user queries the monthly invoice for the B2B2C 20GB 1 month package concept', async function () {
  await billingPage.navigateToInvoices();
  await billingPage.openMonthlyInvoice();
  await billingPage.searchInvoiceConcept('B2B2C 20GB 1 mes');
});

Then('the invoice displays the package charge as {string} without IGV', async function (expectedCharge) {
  const invoiceCharge = await billingPage.getInvoicePackageCharge();
  expect(invoiceCharge).toBe(expectedCharge);
});