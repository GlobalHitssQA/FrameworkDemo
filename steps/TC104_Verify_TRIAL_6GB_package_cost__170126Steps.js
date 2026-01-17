const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('the user is logged into the BSCS7 billing system', async function () {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.login();
});

Given('the TRIAL 6GB package exists in the system', async function () {
  const packageExists = await billingPage.verifyPackageExists('TRIAL 6GB');
  expect(packageExists).toBeTruthy();
});

When('the user queries the TRIAL 6GB package cost in the parametric table', async function () {
  await billingPage.navigateToParametricTable();
  await billingPage.searchPackage('TRIAL 6GB');
});

Then('the system should display the cost as {string} without IGV', async function (expectedCost) {
  const displayedCost = await billingPage.getPackageCostWithoutIGV();
  expect(displayedCost).toBe(expectedCost);
});

When('the user simulates the activation of TRIAL 6GB package for a SOLD plan line', async function () {
  await billingPage.navigateToPackageActivation();
  await billingPage.selectPlan('SOLD');
  await billingPage.selectPackage('TRIAL 6GB');
  await billingPage.simulateActivation();
});

Then('the system should generate an activation record with cost {string} without IGV', async function (expectedCost) {
  const activationCost = await billingPage.getActivationRecordCost();
  expect(activationCost).toBe(expectedCost);
});

When('the user verifies the pre-billing process for the TRIAL 6GB package activation', async function () {
  await billingPage.navigateToPreBilling();
  await billingPage.searchPreBillingRecord('TRIAL 6GB');
});

Then('the system should calculate the charge as {string} without IGV', async function (expectedCharge) {
  const calculatedCharge = await billingPage.getPreBillingCharge();
  expect(calculatedCharge).toBe(expectedCharge);
});

When('the user queries the monthly invoice for the TRIAL 6GB package concept', async function () {
  await billingPage.navigateToInvoiceConsultation();
  await billingPage.searchInvoiceConcept('TRIAL 6GB');
});

Then('the invoice should display the TRIAL 6GB package charge as {string} without IGV', async function (expectedCharge) {
  const invoiceCharge = await billingPage.getInvoicePackageCharge();
  expect(invoiceCharge).toBe(expectedCharge);
});