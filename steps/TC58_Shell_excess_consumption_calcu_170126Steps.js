const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ExcessCalculationPage = require('../pages/ExcessCalculationPage');

let excessCalculationPage;

Given('the BSCS7 system is available with Shell sh_BSCS_calculaFacturaGM deployed', async function() {
  excessCalculationPage = new ExcessCalculationPage(this.page);
  await excessCalculationPage.navigateToSystem();
  await excessCalculationPage.verifySystemAvailable();
  await excessCalculationPage.verifyShellDeployed();
});

Given('the UDR_LT_01 table is configured with variable consumption data', async function() {
  await excessCalculationPage.verifyUdrTableConfigured();
});

When('I configure scenario {int} with {int} SOLD lines with {int} MB pool and {int} MB total consumption', async function(scenarioNum, lineCount, poolSize, consumption) {
  await excessCalculationPage.configureScenario(scenarioNum, lineCount, poolSize, consumption);
});

When('I configure scenario {int} with {int} SOLD lines with {int} MB pool and {int} MB exact consumption', async function(scenarioNum, lineCount, poolSize, consumption) {
  await excessCalculationPage.configureScenario(scenarioNum, lineCount, poolSize, consumption);
});

When('I execute the Shell sh_BSCS_calculaFacturaGM for scenario {int}', async function(scenarioNum) {
  await excessCalculationPage.executeShellForScenario(scenarioNum);
});

Then('the system should determine no excess exists and register excess as {int} MB', async function(expectedExcess) {
  const hasExcess = await excessCalculationPage.getExcessStatus();
  const excessAmount = await excessCalculationPage.getExcessAmount();
  expect(hasExcess).toBe(false);
  expect(excessAmount).toBe(expectedExcess);
});

Then('the system should determine no excess exists at limit and register excess as {int} MB', async function(expectedExcess) {
  const hasExcess = await excessCalculationPage.getExcessStatus();
  const excessAmount = await excessCalculationPage.getExcessAmount();
  expect(hasExcess).toBe(false);
  expect(excessAmount).toBe(expectedExcess);
});

Then('the system should determine excess exists and calculate {int} MB overage for bulk billing', async function(expectedExcess) {
  const hasExcess = await excessCalculationPage.getExcessStatus();
  const excessAmount = await excessCalculationPage.getExcessAmount();
  const billingType = await excessCalculationPage.getBillingType();
  expect(hasExcess).toBe(true);
  expect(excessAmount).toBe(expectedExcess);
  expect(billingType).toBe('granel');
});