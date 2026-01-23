const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ShellBillingPage = require('../pages/ShellBillingPage');

let shellBillingPage;

Given('the parametric table TIM.BSCST_FECT_RNG_PARAM is configured with TMCODE for SOLD and SNCODE for In Pool 10MB package with cost {float} and bulk rate {float}', async function(packageCost, bulkRate) {
  shellBillingPage = new ShellBillingPage(this.page);
  await shellBillingPage.navigateToParametricTableConfig();
  await shellBillingPage.configureParametricTable('SOLD', 'IN_POOL_10MB', packageCost, bulkRate);
  const isConfigured = await shellBillingPage.verifyParametricTableConfiguration();
  expect(isConfigured).toBeTruthy();
});

When('I execute the Shell sh_BSCS_ProcesoFacturaGM before pre-billing process', async function() {
  await shellBillingPage.navigateToShellExecution();
  await shellBillingPage.executeShellProcesoFacturaGM();
});

Then('a unique process identifier with format GM-sequential is registered in control table', async function() {
  const processId = await shellBillingPage.getProcessIdentifier();
  expect(processId).toMatch(/^GM-\d+$/);
  const isRegistered = await shellBillingPage.verifyProcessInControlTable(processId);
  expect(isRegistered).toBeTruthy();
});

Then('the Shell identifies General Motors accounts from contracts table with SOLD plan and In Pool package', async function() {
  const accounts = await shellBillingPage.getIdentifiedGMAccounts();
  expect(accounts.length).toBeGreaterThan(0);
  const allHaveSOLDPlan = await shellBillingPage.verifyAccountsHaveSOLDPlan(accounts);
  expect(allHaveSOLDPlan).toBeTruthy();
});

When('the Shell copies telemetry traffic from APN1 and APN4 from UDR_LT_01 to temporary work table', async function() {
  await shellBillingPage.executeTelemetryTrafficCopy();
  const isCopied = await shellBillingPage.verifyTrafficCopiedToTempTable();
  expect(isCopied).toBeTruthy();
});

Then('the records in UDR_LT_01 remain with zero cost to avoid double billing', async function() {
  const hasZeroCost = await shellBillingPage.verifyUDRRecordsHaveZeroCost();
  expect(hasZeroCost).toBeTruthy();
});

When('I execute the Shell sh_BSCS_calculaFacturaGM to summarize telemetry traffic', async function() {
  await shellBillingPage.executeShellCalculaFacturaGM();
});

Then('the Shell calculates total MB consumed and compares against assigned pool of active lines times 10MB', async function() {
  const calculation = await shellBillingPage.getTotalMBCalculation();
  expect(calculation.totalConsumed).toBeDefined();
  expect(calculation.assignedPool).toBeDefined();
  expect(calculation.assignedPool).toBe(calculation.activeLines * 10);
});

Then('the Shell generates OCC1 Service In Pool with amount calculated as active SOLD lines times {float}', async function(costPerLine) {
  const occ1 = await shellBillingPage.getOCC1ServiceInPool();
  expect(occ1).toBeDefined();
  expect(occ1.concept).toBe('Servicio In Pool');
  const activeLines = await shellBillingPage.getActiveSOLDLinesCount();
  expect(occ1.amount).toBe(activeLines * costPerLine);
});

Then('if consumption exceeds assigned pool the Shell generates OCC2 Bulk In Pool Service with excess MB times {float}', async function(bulkRate) {
  const calculation = await shellBillingPage.getTotalMBCalculation();
  if (calculation.totalConsumed > calculation.assignedPool) {
    const occ2 = await shellBillingPage.getOCC2BulkInPoolService();
    expect(occ2).toBeDefined();
    expect(occ2.concept).toBe('Servicio granel de In Pool');
    const excessMB = calculation.totalConsumed - calculation.assignedPool;
    expect(occ2.amount).toBeCloseTo(excessMB * bulkRate, 2);
  }
});

Then('both OCCs are registered correctly in Document All table for HP Extreme billing process', async function() {
  const occsRegistered = await shellBillingPage.verifyOCCsInDocumentAll();
  expect(occsRegistered).toBeTruthy();
  const occsAvailableForHPExtreme = await shellBillingPage.verifyOCCsAvailableForBilling();
  expect(occsAvailableForHPExtreme).toBeTruthy();
});

Then('the Shell does not execute simultaneously with IZZIPAY Shell due to shared work tables', async function() {
  const isSequentialExecution = await shellBillingPage.verifySequentialExecutionWithIZZIPAY();
  expect(isSequentialExecution).toBeTruthy();
});