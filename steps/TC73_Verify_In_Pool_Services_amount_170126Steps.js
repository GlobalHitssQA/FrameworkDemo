const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolServicesPage = require('../pages/InPoolServicesPage');

let inPoolServicesPage;
let activeLinesCount;
let calculatedAmount;
let displayedAmount;

Given('the user is authenticated in BSCS7 system', async function () {
  inPoolServicesPage = new InPoolServicesPage(this.page);
  await inPoolServicesPage.navigateToBSCS7();
  await inPoolServicesPage.login();
});

Given('there are active lines in SOLD plan', async function () {
  const hasActiveLines = await inPoolServicesPage.verifyActiveLinesExistInSOLD();
  expect(hasActiveLines).toBeTruthy();
});

Given('the parametric table TIM.BSCST_FECT_RNG_PARAM is configured with rate {float} per 10MB package', async function (rate) {
  const configuredRate = await inPoolServicesPage.getConfiguredRateFromParametricTable();
  expect(configuredRate).toBe(rate);
});

When('the user identifies the count of active lines in SOLD plan at billing cycle closing day 28', async function () {
  activeLinesCount = await inPoolServicesPage.getActiveLinesCountInSOLDPlan();
  expect(activeLinesCount).toBeGreaterThan(0);
});

When('the In Pool calculation shell is executed', async function () {
  await inPoolServicesPage.executeInPoolCalculationShell();
});

Then('the system calculates the total assigned pool as lines count multiplied by 10MB', async function () {
  const totalPool = await inPoolServicesPage.getTotalAssignedPool();
  const expectedPool = activeLinesCount * 10;
  expect(totalPool).toBe(expectedPool);
});

Then('the OCC In Pool Services is generated with rate {float} per 10MB package', async function (rate) {
  const occGenerated = await inPoolServicesPage.verifyOCCInPoolServicesGenerated();
  expect(occGenerated).toBeTruthy();
  const occRate = await inPoolServicesPage.getOCCRate();
  expect(occRate).toBe(rate);
});

When('the user queries the In Pool Services item amount in the invoice summary', async function () {
  await inPoolServicesPage.navigateToInvoiceSummary();
  displayedAmount = await inPoolServicesPage.getInPoolServicesAmount();
});

Then('the system displays the amount calculated as active lines count multiplied by {float} without IGV', async function (rate) {
  calculatedAmount = activeLinesCount * rate;
  expect(displayedAmount).toBe(calculatedAmount);
});

Then('the displayed amount matches exactly the formula active lines multiplied by {float}', async function (rate) {
  const expectedAmount = activeLinesCount * rate;
  expect(displayedAmount).toBe(expectedAmount);
});