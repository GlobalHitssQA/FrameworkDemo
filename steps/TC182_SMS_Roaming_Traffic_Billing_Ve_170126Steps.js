const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LifeCycleBillingPage = require('../pages/LifeCycleBillingPage');

let lifeCycleBillingPage;

Given('lines are configured in each Life Cycle plan TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD and DORMANT', async function() {
  lifeCycleBillingPage = new LifeCycleBillingPage(this.page);
  await lifeCycleBillingPage.navigateToLineConfiguration();
  await lifeCycleBillingPage.configureLineInPlan('TESTING');
  await lifeCycleBillingPage.configureLineInPlan('MANUFACTURE');
  await lifeCycleBillingPage.configureLineInPlan('UNSOLD NOT IN SHOWROOM');
  await lifeCycleBillingPage.configureLineInPlan('UNSOLD SHOWROOM');
  await lifeCycleBillingPage.configureLineInPlan('SOLD');
  await lifeCycleBillingPage.configureLineInPlan('DORMANT');
});

Given('all lines are active and correctly provisioned', async function() {
  const allLinesActive = await lifeCycleBillingPage.verifyAllLinesAreActive();
  expect(allLinesActive).toBeTruthy();
});

When('SMS messages are sent from each line in international roaming mode', async function() {
  await lifeCycleBillingPage.navigateToSMSRoamingSection();
  await lifeCycleBillingPage.sendSMSInRoamingForAllLines();
});

Then('the system registers SMS roaming traffic in UDR_LT_01 table for each line', async function() {
  await lifeCycleBillingPage.navigateToUDRTable();
  const trafficRegistered = await lifeCycleBillingPage.verifySMSRoamingTrafficInUDR();
  expect(trafficRegistered).toBeTruthy();
});

When('the billing process is executed', async function() {
  await lifeCycleBillingPage.navigateToBillingSection();
  await lifeCycleBillingPage.executeBillingProcess();
});

Then('SMS roaming traffic is charged at bulk rate of {float} per message without IGV', async function(expectedRate) {
  const appliedRate = await lifeCycleBillingPage.getSMSRoamingBulkRate();
  expect(parseFloat(appliedRate)).toBe(expectedRate);
});

Then('the consolidated GM invoice includes SMS roaming traffic in Traffic Detail section', async function() {
  await lifeCycleBillingPage.navigateToConsolidatedInvoice();
  const trafficDetailVisible = await lifeCycleBillingPage.isTrafficDetailSectionVisible();
  expect(trafficDetailVisible).toBeTruthy();
  const smsRoamingIncluded = await lifeCycleBillingPage.isSMSRoamingTrafficInTrafficDetail();
  expect(smsRoamingIncluded).toBeTruthy();
});

Then('the invoice shows correct amount calculated at bulk rate', async function() {
  const amountCorrect = await lifeCycleBillingPage.verifyInvoiceAmountAtBulkRate();
  expect(amountCorrect).toBeTruthy();
});