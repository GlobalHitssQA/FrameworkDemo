const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RoamingBillingPage = require('../pages/RoamingBillingPage');

let roamingBillingPage;

Given('GM lines are active and provisioned in each Life Cycle plan', async function() {
  roamingBillingPage = new RoamingBillingPage(this.page);
  await roamingBillingPage.navigateToLineManagement();
  const plans = ['TESTING', 'MANUFACTURE', 'UNSOLD_NOT_IN_SHOWROOM', 'UNSOLD_SHOWROOM', 'SOLD', 'DORMANT'];
  for (const plan of plans) {
    await roamingBillingPage.configureLineInPlan(plan);
    const isActive = await roamingBillingPage.verifyLineIsActive(plan);
    expect(isActive).toBeTruthy();
  }
});

Given('roaming data rate configuration is active at {float} PEN per MB without tax', async function(rate) {
  await roamingBillingPage.navigateToRateConfiguration();
  const configuredRate = await roamingBillingPage.getRoamingDataRate();
  expect(configuredRate).toBe(rate);
});

When('data consumption is generated from each line in international roaming mode', async function() {
  await roamingBillingPage.navigateToConsumptionSimulator();
  const plans = ['TESTING', 'MANUFACTURE', 'UNSOLD_NOT_IN_SHOWROOM', 'UNSOLD_SHOWROOM', 'SOLD', 'DORMANT'];
  for (const plan of plans) {
    await roamingBillingPage.generateRoamingDataConsumption(plan);
  }
});

Then('the system registers roaming data traffic in UDR_LT_01 table for each line', async function() {
  await roamingBillingPage.navigateToUDRRecords();
  const plans = ['TESTING', 'MANUFACTURE', 'UNSOLD_NOT_IN_SHOWROOM', 'UNSOLD_SHOWROOM', 'SOLD', 'DORMANT'];
  for (const plan of plans) {
    const isRegistered = await roamingBillingPage.verifyUDRRecordExists(plan);
    expect(isRegistered).toBeTruthy();
  }
});

Then('the billing process applies bulk rate charges for roaming data traffic', async function() {
  await roamingBillingPage.navigateToBillingProcess();
  await roamingBillingPage.executeBillingProcess();
  const billingCompleted = await roamingBillingPage.verifyBillingProcessCompleted();
  expect(billingCompleted).toBeTruthy();
  const chargesApplied = await roamingBillingPage.verifyBulkRateChargesApplied();
  expect(chargesApplied).toBeTruthy();
});

Then('the consolidated GM invoice displays roaming data traffic details in the corresponding section', async function() {
  await roamingBillingPage.navigateToConsolidatedInvoice();
  const roamingSectionVisible = await roamingBillingPage.isRoamingTrafficSectionVisible();
  expect(roamingSectionVisible).toBeTruthy();
});

Then('the invoice shows correct amounts calculated at bulk rate', async function() {
  const invoiceAmounts = await roamingBillingPage.getRoamingTrafficAmounts();
  const expectedRate = 0.2033;
  for (const amount of invoiceAmounts) {
    const isCorrect = await roamingBillingPage.verifyAmountCalculatedAtRate(amount, expectedRate);
    expect(isCorrect).toBeTruthy();
  }
});