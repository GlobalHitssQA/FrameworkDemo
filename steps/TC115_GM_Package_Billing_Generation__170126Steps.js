const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingPage = require('../pages/BillingPage');

let billingPage;

Given('a user with an active GM line on SOLD plan', async function() {
  billingPage = new BillingPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.verifyUserHasActiveGMLine();
});

Given('the billing process is configured with cut-off on day 28', async function() {
  await billingPage.verifyBillingCutoffConfiguration(28);
});

When('I activate a TRIAL 6GB package on day 15 of the month', async function() {
  await billingPage.selectPackageType('TRIAL 6GB');
  await billingPage.setActivationDate(15);
  await billingPage.activatePackage();
});

Then('the TRIAL 6GB package is activated successfully with activation date on day 15', async function() {
  const activationStatus = await billingPage.getPackageActivationStatus();
  expect(activationStatus).toBe('Activo');
  const activationDate = await billingPage.getPackageActivationDate();
  expect(activationDate).toContain('15');
});

When('I activate a B2B2C 12GB package with 12-month validity on day 20 of the month', async function() {
  await billingPage.selectPackageType('B2B2C 12GB');
  await billingPage.setPackageValidity(12);
  await billingPage.setActivationDate(20);
  await billingPage.activatePackage();
});

Then('the B2B2C 12GB package is activated with activation date on day 20', async function() {
  const activationStatus = await billingPage.getPackageActivationStatus();
  expect(activationStatus).toBe('Activo');
  const activationDate = await billingPage.getPackageActivationDate();
  expect(activationDate).toContain('20');
});

When('I execute the billing process with cut-off date on day 28', async function() {
  await billingPage.navigateToBillingExecution();
  await billingPage.setCutoffDate(28);
  await billingPage.executeBillingProcess();
});

Then('the system generates a consolidated invoice for GM with cut-off on day 28', async function() {
  const invoiceGenerated = await billingPage.isInvoiceGenerated();
  expect(invoiceGenerated).toBeTruthy();
  const invoiceType = await billingPage.getInvoiceType();
  expect(invoiceType).toContain('GM');
});

Then('the invoice includes TRIAL 6GB package charges for S\/. 7.58 without IGV', async function() {
  const trialCharge = await billingPage.getPackageChargeAmount('TRIAL 6GB');
  expect(trialCharge).toBe('7.58');
});

Then('the invoice includes B2B2C 12GB package charges for S\/. 29.66 without IGV', async function() {
  const b2b2cCharge = await billingPage.getPackageChargeAmount('B2B2C 12GB');
  expect(b2b2cCharge).toBe('29.66');
});

Then('the invoice cut-off date corresponds to day 28 of the month', async function() {
  const cutoffDate = await billingPage.getInvoiceCutoffDate();
  expect(cutoffDate).toContain('28');
});