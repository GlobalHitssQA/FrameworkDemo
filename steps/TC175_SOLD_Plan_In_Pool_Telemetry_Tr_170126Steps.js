const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SoldPlanPage = require('../pages/SoldPlanPage');

let soldPlanPage;

Given('30 lines are provisioned in SOLD plan with APN4 configured for telemetry', async function () {
  soldPlanPage = new SoldPlanPage(this.page);
  await soldPlanPage.navigateToProvisioningSection();
  await soldPlanPage.provisionLinesWithAPN4(30, 'onstar01.v6');
  const provisionedCount = await soldPlanPage.getProvisionedLinesCount();
  expect(provisionedCount).toBe(30);
  const apnStatus = await soldPlanPage.verifyAPN4Active();
  expect(apnStatus).toBe(true);
  const inPoolAssigned = await soldPlanPage.verifyInPoolPackageAssigned();
  expect(inPoolAssigned).toBe(true);
});

Given('the In Pool quota is calculated as 300 MB for the group', async function () {
  const totalQuota = await soldPlanPage.getInPoolTotalQuota();
  expect(totalQuota).toBe(300);
});

When('telemetry traffic of 450 MB is generated through APN4 distributed among the 30 lines', async function () {
  await soldPlanPage.navigateToTrafficMonitoring();
  await soldPlanPage.generateTelemetryTraffic(450);
  const registeredTraffic = await soldPlanPage.getRegisteredTrafficInUDR();
  expect(registeredTraffic).toBe(450);
});

When('the In Pool calculation Shell is executed before pre-billing', async function () {
  await soldPlanPage.navigateToShellExecution();
  await soldPlanPage.executeInPoolCalculationShell();
  const excessCalculated = await soldPlanPage.getCalculatedExcess();
  expect(excessCalculated).toBe(150);
});

Then('the system should generate an OCC for In Pool Service with amount 39.00 soles', async function () {
  await soldPlanPage.navigateToOCCSection();
  const inPoolOCCAmount = await soldPlanPage.getInPoolServiceOCCAmount();
  expect(inPoolOCCAmount).toBe(39.00);
});

Then('the system should generate an OCC for In Pool Bulk Service with excess amount 5.58 soles', async function () {
  const bulkOCCAmount = await soldPlanPage.getInPoolBulkServiceOCCAmount();
  expect(bulkOCCAmount).toBe(5.58);
});

Then('both OCCs should be displayed in the Traffic Detail SOLD section of the invoice', async function () {
  await soldPlanPage.navigateToInvoiceSection();
  const trafficDetailVisible = await soldPlanPage.isTrafficDetailSOLDSectionVisible();
  expect(trafficDetailVisible).toBe(true);
  const inPoolOCCDisplayed = await soldPlanPage.isInPoolServiceOCCDisplayedInInvoice();
  expect(inPoolOCCDisplayed).toBe(true);
  const bulkOCCDisplayed = await soldPlanPage.isInPoolBulkServiceOCCDisplayedInInvoice();
  expect(bulkOCCDisplayed).toBe(true);
  const inPoolAmount = await soldPlanPage.getInvoiceInPoolServiceAmount();
  expect(inPoolAmount).toBe(39.00);
  const bulkAmount = await soldPlanPage.getInvoiceBulkServiceAmount();
  expect(bulkAmount).toBe(5.58);
});