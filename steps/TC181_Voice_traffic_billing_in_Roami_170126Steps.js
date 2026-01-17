const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LifeCycleBillingPage = require('../pages/LifeCycleBillingPage');

let lifeCycleBillingPage;

Given('GM lines are configured in each Life Cycle plan', async function () {
  lifeCycleBillingPage = new LifeCycleBillingPage(this.page);
  await lifeCycleBillingPage.navigateToLineConfiguration();
  await lifeCycleBillingPage.configureLineInPlan('TESTING');
  await lifeCycleBillingPage.configureLineInPlan('MANUFACTURE');
  await lifeCycleBillingPage.configureLineInPlan('UNSOLD NOT IN SHOWROOM');
  await lifeCycleBillingPage.configureLineInPlan('UNSOLD SHOWROOM');
  await lifeCycleBillingPage.configureLineInPlan('SOLD');
  await lifeCycleBillingPage.configureLineInPlan('DORMANT');
});

Given('the lines are active and correctly provisioned', async function () {
  const allLinesActive = await lifeCycleBillingPage.verifyAllLinesActiveAndProvisioned();
  expect(allLinesActive).toBeTruthy();
});

When('voice calls are made from each line in international Roaming mode', async function () {
  await lifeCycleBillingPage.navigateToTrafficSimulation();
  await lifeCycleBillingPage.simulateRoamingVoiceCalls();
});

Then('the system registers voice traffic in Roaming in the UDR_LT_01 table', async function () {
  await lifeCycleBillingPage.navigateToUDRTable();
  const trafficRegistered = await lifeCycleBillingPage.verifyTrafficRegisteredInUDR();
  expect(trafficRegistered).toBeTruthy();
});

Then('the billing process is executed', async function () {
  await lifeCycleBillingPage.navigateToBillingProcess();
  await lifeCycleBillingPage.executeBillingProcess();
  const billingCompleted = await lifeCycleBillingPage.verifyBillingProcessCompleted();
  expect(billingCompleted).toBeTruthy();
});

Then('voice traffic in Roaming is charged at bulk rate of {float} per minute without IGV', async function (expectedRate) {
  const appliedRate = await lifeCycleBillingPage.getAppliedRoamingVoiceRate();
  expect(appliedRate).toBe(expectedRate);
});

Then('the consolidated GM invoice includes voice traffic in Roaming section', async function () {
  await lifeCycleBillingPage.navigateToConsolidatedInvoice();
  const sectionVisible = await lifeCycleBillingPage.isRoamingVoiceTrafficSectionVisible();
  expect(sectionVisible).toBeTruthy();
});

Then('the invoice shows correct amount calculated at bulk rate', async function () {
  const amountCorrect = await lifeCycleBillingPage.verifyInvoiceAmountCalculatedCorrectly();
  expect(amountCorrect).toBeTruthy();
});