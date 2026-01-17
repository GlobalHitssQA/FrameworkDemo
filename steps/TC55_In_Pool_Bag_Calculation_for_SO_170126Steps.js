const { Given, When, Then, And } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolCalculationPage = require('../pages/InPoolCalculationPage');

let inPoolPage;

Given('the test environment has {int} General Motors lines configured in SOLD rate plan at billing cycle end', async function(lineCount) {
  inPoolPage = new InPoolCalculationPage(this.page);
  await inPoolPage.navigateToTestEnvironment();
  await inPoolPage.configureSOLDLines(lineCount);
  const registeredLines = await inPoolPage.getRegisteredLinesCount();
  expect(registeredLines).toBe(lineCount);
});

When('the user executes the Shell sh_BSCS_calculaFacturaGM to calculate the In Pool bag', async function() {
  await inPoolPage.executeCalculationShell();
  const executionStatus = await inPoolPage.getShellExecutionStatus();
  expect(executionStatus).toBe('success');
});

Then('the system should display the assigned bag as {int} MB for the billing period', async function(expectedMB) {
  const calculatedBag = await inPoolPage.getCalculatedInPoolBag();
  expect(calculatedBag).toBe(expectedMB);
});

Then('when the scenario is modified to {int} lines in SOLD plan and Shell is executed again', async function(newLineCount) {
  await inPoolPage.configureSOLDLines(newLineCount);
  await inPoolPage.executeCalculationShell();
});

Then('the calculated bag should update to {int} MB confirming the formula applies correctly', async function(expectedMB) {
  const calculatedBag = await inPoolPage.getCalculatedInPoolBag();
  expect(calculatedBag).toBe(expectedMB);
});

Then('the Shell should include all lines in SOLD Rate Plan regardless of consumption', async function() {
  const includesZeroConsumption = await inPoolPage.verifyZeroConsumptionLinesIncluded();
  const includesWithConsumption = await inPoolPage.verifyConsumptionLinesIncluded();
  expect(includesZeroConsumption).toBe(true);
  expect(includesWithConsumption).toBe(true);
});