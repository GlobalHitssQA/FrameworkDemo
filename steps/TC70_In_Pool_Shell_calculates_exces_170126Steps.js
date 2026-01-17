const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolCalculationPage = require('../pages/InPoolCalculationPage');

let inPoolPage;
let manualExcessMB;
let expectedBillAmount;
let shellCalculatedExcess;
let occAmount;

Given('a scenario is configured with total consumption exceeding the In Pool bag', async function () {
  inPoolPage = new InPoolCalculationPage(this.page);
  await inPoolPage.navigateToInPoolConfiguration();
});

Given('the In Pool bag is set to {int} MB with total consumption of {int} MB', async function (bagSize, totalConsumption) {
  await inPoolPage.configureInPoolBag(bagSize);
  await inPoolPage.setTotalConsumption(totalConsumption);
  await inPoolPage.saveScenarioConfiguration();
});

When('I manually calculate the excess MB by subtracting the assigned bag from total consumption', async function () {
  const bagSize = await inPoolPage.getInPoolBagSize();
  const totalConsumption = await inPoolPage.getTotalConsumption();
  manualExcessMB = totalConsumption - bagSize;
});

Then('the manual calculation shows {int} MB of excess', async function (expectedExcess) {
  expect(manualExcessMB).toBe(expectedExcess);
});

When('I execute the In Pool calculation Shell to process traffic', async function () {
  await inPoolPage.clickExecuteShellButton();
  await inPoolPage.waitForShellExecution();
  shellCalculatedExcess = await inPoolPage.getShellCalculatedExcess();
});

Then('the Shell calculates the excess and logs the value equal to the manual calculation', async function () {
  expect(shellCalculatedExcess).toBe(manualExcessMB);
  const logValue = await inPoolPage.getShellLogExcessValue();
  expect(logValue).toBe(manualExcessMB);
});

When('I manually calculate the amount to bill by multiplying excess MB by bulk rate {float}', async function (bulkRate) {
  expectedBillAmount = parseFloat((manualExcessMB * bulkRate).toFixed(2));
});

Then('the expected amount for OCC In Pool Bulk Service is {float} soles', async function (expectedAmount) {
  expect(expectedBillAmount).toBe(expectedAmount);
});

When('I verify the OCC In Pool Bulk Service generated in Document All', async function () {
  await inPoolPage.navigateToDocumentAll();
  await inPoolPage.searchOccInPoolBulkService();
  occAmount = await inPoolPage.getOccInPoolBulkServiceAmount();
});

Then('the OCC amount corresponds exactly to excess MB multiplied by {float}', async function (bulkRate) {
  const expectedOccAmount = parseFloat((manualExcessMB * bulkRate).toFixed(2));
  expect(occAmount).toBe(expectedOccAmount);
});