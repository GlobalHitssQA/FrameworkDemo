const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingProcessPage = require('../pages/BillingProcessPage');

let billingPage;

Given('the system has {int} active lines in SOLD plan with a pool of {int} MB', async function(lineCount, poolMB) {
  billingPage = new BillingProcessPage(this.page);
  await billingPage.navigateToBillingSystem();
  await billingPage.verifyActiveLinesInPlan(lineCount, 'SOLD', poolMB);
});

Given('the total consumption is {int} MB exceeding the pool by {int} MB', async function(totalConsumption, excessMB) {
  await billingPage.configureConsumptionScenario(totalConsumption, excessMB);
});

When('the user executes the Shell sh_BSCS_ProcesoFacturaGM to generate OCCs', async function() {
  await billingPage.executeShellProcess('sh_BSCS_ProcesoFacturaGM');
});

Then('the Shell processes correctly and generates two separate OCCs', async function() {
  const occCount = await billingPage.getGeneratedOCCCount();
  expect(occCount).toBe(2);
});

Then('the Document All table shows OCC for In Pool Service with amount {float} without IGV', async function(amount) {
  await billingPage.navigateToDocumentAllTable();
  const inPoolAmount = await billingPage.getOCCAmountByConcept('Servicio In Pool');
  expect(inPoolAmount).toBe(amount);
});

Then('the Document All table shows OCC for In Pool Bulk Service with amount {float} without IGV', async function(amount) {
  const bulkAmount = await billingPage.getOCCAmountByConcept('Servicio In Pool Granel');
  expect(bulkAmount).toBe(amount);
});

Then('both OCCs are registered with correct CUSTOMER_ID and differentiated concepts', async function() {
  const customerId = await billingPage.verifyCustomerIdForBothOCCs();
  expect(customerId).toBeTruthy();
  const conceptsDifferentiated = await billingPage.verifyDifferentiatedConcepts();
  expect(conceptsDifferentiated).toBe(true);
});

Then('both OCCs have correct amounts calculated according to parametric rates', async function() {
  const ratesCorrect = await billingPage.verifyParametricRatesApplied(1.30, 0.0372);
  expect(ratesCorrect).toBe(true);
});

Then('both OCCs are available for pre-billing status', async function() {
  const preBillingStatus = await billingPage.verifyPreBillingStatus();
  expect(preBillingStatus).toBe(true);
});

Then('the Shell log shows OCC1 In Pool Service {float} and OCC2 In Pool Bulk Service {float}', async function(occ1Amount, occ2Amount) {
  await billingPage.navigateToShellLogs();
  const logOCC1 = await billingPage.getLogEntryForOCC('Servicio In Pool');
  const logOCC2 = await billingPage.getLogEntryForOCC('Servicio In Pool Granel');
  expect(logOCC1).toContain(occ1Amount.toString());
  expect(logOCC2).toContain(occ2Amount.toString());
});

Then('the Shell log confirms total billed amount of {float}', async function(totalAmount) {
  const logTotal = await billingPage.getTotalBilledFromLog();
  expect(logTotal).toBe(totalAmount);
});