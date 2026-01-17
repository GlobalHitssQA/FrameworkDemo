const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolSummaryPage = require('../pages/InPoolSummaryPage');

let inPoolSummaryPage;
let totalTelemetryConsumption;
let assignedQuota;
let numberOfLines;
let consumptionWithinQuota;

Given('the SOLD lines have telemetry consumption during the billing cycle', async function () {
  inPoolSummaryPage = new InPoolSummaryPage(this.page);
  await inPoolSummaryPage.navigateToInPoolSection();
});

Given('the In Pool calculation shell has been executed', async function () {
  const shellStatus = await inPoolSummaryPage.getCalculationShellStatus();
  expect(shellStatus).toBe('executed');
});

Given('the assigned quota is calculated based on number of lines times 10 MB', async function () {
  numberOfLines = await inPoolSummaryPage.getNumberOfSOLDLines();
  assignedQuota = numberOfLines * 10;
});

Given('the billing cycle is closed', async function () {
  const cycleStatus = await inPoolSummaryPage.getBillingCycleStatus();
  expect(cycleStatus).toBe('closed');
});

When('I review the total telemetry consumption for APN1 and APN4', async function () {
  const apn1Consumption = await inPoolSummaryPage.getAPN1Consumption();
  const apn4Consumption = await inPoolSummaryPage.getAPN4Consumption();
  totalTelemetryConsumption = apn1Consumption + apn4Consumption;
});

Then('I should obtain the total MB consumed by telemetry', async function () {
  expect(totalTelemetryConsumption).toBeGreaterThanOrEqual(0);
});

When('I compare the total consumption against the assigned quota', async function () {
  consumptionWithinQuota = Math.min(totalTelemetryConsumption, assignedQuota);
});

Then('I should determine if consumption is less than or equal to the assigned quota', async function () {
  const isWithinQuota = totalTelemetryConsumption <= assignedQuota;
  await inPoolSummaryPage.setConsumptionStatus(isWithinQuota);
});

When('I access the In Pool 10 MB summary in the Traffic Detail SOLD section', async function () {
  await inPoolSummaryPage.navigateToTrafficDetailSOLD();
  await inPoolSummaryPage.openInPool10MBSummary();
});

Then('I should see the consolidated summary displayed', async function () {
  const isSummaryVisible = await inPoolSummaryPage.isConsolidatedSummaryVisible();
  expect(isSummaryVisible).toBe(true);
});

Then('I should see the consumption within quota field with the correct value', async function () {
  const displayedConsumption = await inPoolSummaryPage.getConsumptionWithinQuotaValue();
  expect(displayedConsumption).toBe(consumptionWithinQuota);
});

Then('the amount associated should apply the In Pool rate of 1.30 soles per package', async function () {
  const expectedAmount = numberOfLines * 1.30;
  const displayedAmount = await inPoolSummaryPage.getInPoolAmount();
  expect(displayedAmount).toBeCloseTo(expectedAmount, 2);
});