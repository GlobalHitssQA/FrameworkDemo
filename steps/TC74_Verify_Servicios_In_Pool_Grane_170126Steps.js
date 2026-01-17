const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolGranelPage = require('../pages/InPoolGranelPage');

let inPoolGranelPage;
let totalConsumption;
let assignedPool;
let excessMB;
let calculatedAmount;

Given('the user is authenticated in BSCS7 system', async function () {
  inPoolGranelPage = new InPoolGranelPage(this.page);
  await inPoolGranelPage.navigateToLogin();
  await inPoolGranelPage.login();
  await inPoolGranelPage.verifyUserIsAuthenticated();
});

Given('there are active SOLD plan lines with telemetry consumption exceeding the assigned pool', async function () {
  const hasActiveLines = await inPoolGranelPage.verifyActiveSOLDLinesExist();
  expect(hasActiveLines).toBeTruthy();
});

Given('the parametric table is configured with excess rate of {float} per MB', async function (rate) {
  const configuredRate = await inPoolGranelPage.getConfiguredExcessRate();
  expect(configuredRate).toBe(rate);
});

When('the In Pool calculation shell is executed to summarize total telemetry traffic for APN1 and APN4', async function () {
  await inPoolGranelPage.executeInPoolCalculationShell();
  totalConsumption = await inPoolGranelPage.getTotalTelemetryConsumption();
});

Then('the system should correctly totalize consumption in MB for all SOLD plan lines', async function () {
  const isConsumptionTotalized = await inPoolGranelPage.verifyConsumptionTotalized();
  expect(isConsumptionTotalized).toBeTruthy();
  expect(totalConsumption).toBeGreaterThan(0);
});

When('the excess is calculated as total consumption minus assigned pool', async function () {
  const lineCount = await inPoolGranelPage.getActiveSOLDLineCount();
  assignedPool = lineCount * 10;
  excessMB = await inPoolGranelPage.calculateExcess(totalConsumption, assignedPool);
});

Then('the system should determine that excess exists when total consumption exceeds the assigned pool', async function () {
  expect(totalConsumption).toBeGreaterThan(assignedPool);
  expect(excessMB).toBeGreaterThan(0);
});

When('the excess rate is applied multiplying excess MB by {float} without IGV', async function (rate) {
  calculatedAmount = await inPoolGranelPage.applyExcessRate(excessMB, rate);
});

Then('the system should generate the OCC Servicios In Pool Granel with the calculated excess amount', async function () {
  const occGenerated = await inPoolGranelPage.verifyOCCGenerated();
  expect(occGenerated).toBeTruthy();
  const occAmount = await inPoolGranelPage.getOCCAmount();
  expect(occAmount).toBeCloseTo(calculatedAmount, 2);
});

When('the user queries the Servicios In Pool Granel item amount in the invoice summary', async function () {
  await inPoolGranelPage.navigateToInvoiceSummary();
  await inPoolGranelPage.queryServiciosInPoolGranel();
});

Then('the system should display the excess amount calculated correctly', async function () {
  const displayedAmount = await inPoolGranelPage.getServiciosInPoolGranelAmount();
  expect(displayedAmount).toBeGreaterThan(0);
});

Then('the invoice amount should match the expected calculation using formula total MB minus assigned pool MB times {float}', async function (rate) {
  const invoiceAmount = await inPoolGranelPage.getServiciosInPoolGranelAmount();
  const expectedAmount = excessMB * rate;
  expect(invoiceAmount).toBeCloseTo(expectedAmount, 2);
});