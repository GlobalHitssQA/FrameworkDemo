const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ShellCalculationPage = require('../pages/ShellCalculationPage');

let shellPage;

Given('a BSCS7 system is available with Shell sh_BSCS_calculaFacturaGM deployed', async function () {
  shellPage = new ShellCalculationPage(this.page);
  await shellPage.navigateToSystem();
  await shellPage.verifySystemAvailability();
  await shellPage.verifyShellDeployed();
});

Given('there are {int} active lines in SOLD plan with assigned pool of {int} MB', async function (lineCount, poolSize) {
  await shellPage.verifyActiveLinesInSOLDPlan(lineCount);
  await shellPage.verifyAssignedPoolSize(poolSize);
});

Given('the UDR_LT_01 table contains telemetry consumption data for APN1 and APN4', async function () {
  await shellPage.verifyUDRTableContainsData();
  await shellPage.verifyAPNDataPresent(['APN1', 'APN4']);
});

When('I configure a scenario with total telemetry consumption of {int} MB', async function (consumptionMB) {
  await shellPage.configureConsumptionScenario(consumptionMB);
});

When('I execute the Shell sh_BSCS_calculaFacturaGM to perform the comparison', async function () {
  await shellPage.executeShellCalculation();
});

When('I execute the Shell sh_BSCS_calculaFacturaGM again', async function () {
  await shellPage.executeShellCalculation();
});

When('I modify the scenario with total consumption of {int} MB', async function (consumptionMB) {
  await shellPage.modifyConsumptionScenario(consumptionMB);
});

Then('the Shell calculates the assigned pool as {int} MB and total consumption as {int} MB', async function (poolMB, consumptionMB) {
  const calculatedPool = await shellPage.getCalculatedPoolValue();
  const calculatedConsumption = await shellPage.getCalculatedConsumptionValue();
  expect(calculatedPool).toBe(poolMB);
  expect(calculatedConsumption).toBe(consumptionMB);
});

Then('the system determines there is no surplus since consumption is less than assigned pool', async function () {
  const hasSurplus = await shellPage.checkSurplusExists();
  expect(hasSurplus).toBe(false);
  const surplusValue = await shellPage.getSurplusValue();
  expect(surplusValue).toBe(0);
});

Then('the Shell identifies consumption of {int} MB exceeds assigned pool of {int} MB', async function (consumptionMB, poolMB) {
  const consumption = await shellPage.getCalculatedConsumptionValue();
  const pool = await shellPage.getCalculatedPoolValue();
  expect(consumption).toBe(consumptionMB);
  expect(pool).toBe(poolMB);
  expect(consumption).toBeGreaterThan(pool);
});

Then('the system determines there is a surplus of {int} MB', async function (surplusMB) {
  const hasSurplus = await shellPage.checkSurplusExists();
  expect(hasSurplus).toBe(true);
  const surplusValue = await shellPage.getSurplusValue();
  expect(surplusValue).toBe(surplusMB);
});

Then('the logs display assigned pool {int} MB, total consumption {int} MB, and surplus {int} MB for audit traceability', async function (poolMB, consumptionMB, surplusMB) {
  await shellPage.openAuditLogs();
  const logData = await shellPage.getAuditLogData();
  expect(logData.assignedPool).toBe(poolMB);
  expect(logData.totalConsumption).toBe(consumptionMB);
  expect(logData.surplus).toBe(surplusMB);
});