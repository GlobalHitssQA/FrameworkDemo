const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('I am logged into the BSCS7 billing system', async function () {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.login();
});

Given('the B2B2C 6GB 1 month package is configured in the system', async function () {
  const isConfigured = await billingPage.verifyPackageExists('B2B2C 6GB 1 mes');
  expect(isConfigured).toBeTruthy();
});

Given('the SOLD plan is active', async function () {
  const isActive = await billingPage.verifySoldPlanIsActive();
  expect(isActive).toBeTruthy();
});

When('I query the package parametric table for B2B2C 6GB 1 month package', async function () {
  await billingPage.navigateToParametricTable();
  await billingPage.searchPackage('B2B2C 6GB 1 mes');
});

Then('the system should display the package cost as {string} without IGV', async function (expectedCost) {
  const actualCost = await billingPage.getPackageCostWithoutIGV();
  expect(actualCost).toBe(expectedCost);
});

Then('the package validity should be {string} days', async function (expectedDays) {
  const actualDays = await billingPage.getPackageValidityDays();
  expect(actualDays).toBe(expectedDays);
});

When('I simulate the activation of B2B2C 6GB 1 month package for a SOLD plan line', async function () {
  await billingPage.navigateToPackageActivation();
  await billingPage.selectPackageForActivation('B2B2C 6GB 1 mes');
  await billingPage.selectPlanType('SOLD');
  await billingPage.simulateActivation();
});

Then('the system should generate an activation record with cost {string} without IGV', async function (expectedCost) {
  const activationCost = await billingPage.getActivationRecordCost();
  expect(activationCost).toBe(expectedCost);
});

When('I verify the pre-billing process for the package activation', async function () {
  await billingPage.navigateToPreBilling();
  await billingPage.searchActivationInPreBilling('B2B2C 6GB 1 mes');
});

Then('the system should calculate the charge as {string} without IGV', async function (expectedCharge) {
  const calculatedCharge = await billingPage.getPreBillingCharge();
  expect(calculatedCharge).toBe(expectedCharge);
});

When('I query the monthly invoice for the B2B2C 6GB 1 month package concept', async function () {
  await billingPage.navigateToInvoiceQuery();
  await billingPage.searchInvoiceConcept('B2B2C 6GB 1 mes');
});

Then('the invoice should display the package charge as {string} without IGV', async function (expectedCharge) {
  const invoiceCharge = await billingPage.getInvoicePackageCharge();
  expect(invoiceCharge).toBe(expectedCharge);
});