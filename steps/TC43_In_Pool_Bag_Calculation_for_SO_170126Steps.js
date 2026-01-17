const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingCalculationPage = require('../pages/BillingCalculationPage');

let billingPage;

Given('the BSCS7 system is operational with required shells developed', async function () {
  billingPage = new BillingCalculationPage(this.page);
  await billingPage.navigateToSystem();
  await billingPage.verifySystemOperational();
});

Given('the parametric table TIM.BSCST_FECT_RNG_PARAM is configured with In Pool rates', async function () {
  await billingPage.navigateToParametricTable();
  await billingPage.verifyInPoolRatesConfigured();
});

When('I configure 500 active lines in SOLD plan Rate Plan 3 in BSCS7 system', async function () {
  await billingPage.navigateToLineConfiguration();
  await billingPage.configureActiveLines(500, 'SOLD', 3);
});

Then('the 500 lines should be registered in SOLD plan in the database', async function () {
  const registeredLines = await billingPage.getRegisteredLinesCount('SOLD');
  expect(registeredLines).toBe(500);
});

When('I execute the In Pool calculation shell sh_BSCS_ProcesoFacturaGM before pre-billing', async function () {
  await billingPage.navigateToShellExecution();
  await billingPage.executeInPoolCalculationShell();
});

Then('the shell should identify 500 active lines in SOLD plan for the billing cycle', async function () {
  const identifiedLines = await billingPage.getIdentifiedLinesFromShell();
  expect(identifiedLines).toBe(500);
});

Then('the calculated In Pool bag should be 5000 MB for 500 lines at 10 MB per line', async function () {
  const calculatedBag = await billingPage.getCalculatedInPoolBag();
  expect(calculatedBag).toBe(5000);
});

When('I query the generated OCCs for In Pool Service concept', async function () {
  await billingPage.navigateToOCCQuery();
  await billingPage.queryOCCsByServiceConcept('In Pool Service');
});

Then('an OCC should be generated with In Pool Service concept for S\/. 650.00 without IGV', async function () {
  const occValue = await billingPage.getOCCValueWithoutIGV();
  expect(occValue).toBe(650.00);
});

Then('the applied rate should be S\/. 1.30 per 10MB package totaling S\/. 650.00 without IGV', async function () {
  const appliedRate = await billingPage.getAppliedRatePerPackage();
  const totalAmount = await billingPage.getTotalAmountWithoutIGV();
  expect(appliedRate).toBe(1.30);
  expect(totalAmount).toBe(650.00);
});