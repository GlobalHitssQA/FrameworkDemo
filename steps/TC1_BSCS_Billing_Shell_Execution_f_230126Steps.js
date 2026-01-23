const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BillingShellPage = require('../pages/BillingShellPage');

let billingShellPage;

Given('the parametric table TIM.BSCST_FECT_RNG_PARAM is configured with TMCODE for SOLD plan and SNCODE for In Pool 10MB package', async function() {
  billingShellPage = new BillingShellPage(this.page);
  await billingShellPage.navigateToParametricTableConfig();
  await billingShellPage.verifyParametricTableLoaded();
  await billingShellPage.verifyTMCodeConfiguredForSOLD();
  await billingShellPage.verifySNCodeConfiguredForInPool();
});

Given('the package cost is configured as 1.30 soles and bulk rate as 0.0372 soles per MB', async function() {
  await billingShellPage.verifyPackageCostConfigured('1.30');
  await billingShellPage.verifyBulkRateConfigured('0.0372');
});

When('I execute the shell sh_BSCS_ProcesoFacturaGM before pre-billing process', async function() {
  await billingShellPage.navigateToShellExecution();
  await billingShellPage.selectShell('sh_BSCS_ProcesoFacturaGM');
  await billingShellPage.executeShell();
});

Then('a unique process identifier with format GM-sequential is created in the control table', async function() {
  const processId = await billingShellPage.getProcessIdentifier();
  expect(processId).toMatch(/^GM-\d+$/);
  await billingShellPage.verifyProcessIdInControlTable(processId);
});

Then('the shell identifies General Motors accounts from CUSTOMER_ID contracts table', async function() {
  await billingShellPage.verifyGMAccountsIdentified();
  const accountCount = await billingShellPage.getIdentifiedAccountsCount();
  expect(accountCount).toBeGreaterThan(0);
});

Then('the shell extracts SOLD plan lines with assigned In Pool package', async function() {
  await billingShellPage.verifySOLDLinesExtracted();
  await billingShellPage.verifyInPoolPackageAssigned();
});

When('the shell copies telemetry traffic from APN1 and APN4 from UDR_LT_01 to temporary work table', async function() {
  await billingShellPage.verifyTrafficCopyInitiated();
  await billingShellPage.waitForTrafficCopyCompletion();
});

Then('the original records in UDR_LT_01 remain with zero cost to avoid double billing', async function() {
  await billingShellPage.verifyOriginalRecordsZeroCost();
});

When('I execute the shell sh_BSCS_calculaFacturaGM', async function() {
  await billingShellPage.selectShell('sh_BSCS_calculaFacturaGM');
  await billingShellPage.executeShell();
  await billingShellPage.waitForShellCompletion();
});

Then('the shell summarizes telemetry traffic from APN1 and APN4', async function() {
  await billingShellPage.verifyTrafficSummarized();
  await billingShellPage.verifyAPN1TrafficIncluded();
  await billingShellPage.verifyAPN4TrafficIncluded();
});

Then('calculates total consumed MB for all SOLD lines during the billing cycle', async function() {
  const totalMB = await billingShellPage.getTotalConsumedMB();
  expect(totalMB).toBeGreaterThanOrEqual(0);
});

Then('compares consumption against assigned pool which is number of lines multiplied by 10MB', async function() {
  const comparisonResult = await billingShellPage.getPoolComparisonResult();
  expect(comparisonResult).toBeDefined();
});

When('the consumption calculation is complete', async function() {
  await billingShellPage.verifyCalculationComplete();
});

Then('OCC1 is generated with concept Servicio In Pool', async function() {
  await billingShellPage.verifyOCC1Generated();
  const occ1Concept = await billingShellPage.getOCC1Concept();
  expect(occ1Concept).toContain('Servicio In Pool');
});

Then('OCC1 amount is calculated as active SOLD lines multiplied by 1.30 soles', async function() {
  const linesCount = await billingShellPage.getActiveSOLDLinesCount();
  const expectedAmount = linesCount * 1.30;
  const actualAmount = await billingShellPage.getOCC1Amount();
  expect(actualAmount).toBeCloseTo(expectedAmount, 2);
});

Then('the corresponding gloss is registered for OCC1', async function() {
  const occ1Gloss = await billingShellPage.getOCC1Gloss();
  expect(occ1Gloss).toBeTruthy();
});

When('total consumption exceeds the assigned pool', async function() {
  const hasExcess = await billingShellPage.checkConsumptionExceedsPool();
  this.hasExcessConsumption = hasExcess;
});

Then('OCC2 is generated with concept Servicio granel de In Pool', async function() {
  if (this.hasExcessConsumption) {
    await billingShellPage.verifyOCC2Generated();
    const occ2Concept = await billingShellPage.getOCC2Concept();
    expect(occ2Concept).toContain('Servicio granel de In Pool');
  }
});

Then('OCC2 amount is calculated as excess MB multiplied by 0.0372 soles', async function() {
  if (this.hasExcessConsumption) {
    const excessMB = await billingShellPage.getExcessMB();
    const expectedAmount = excessMB * 0.0372;
    const actualAmount = await billingShellPage.getOCC2Amount();
    expect(actualAmount).toBeCloseTo(expectedAmount, 2);
  }
});

Then('the corresponding gloss is registered for OCC2', async function() {
  if (this.hasExcessConsumption) {
    const occ2Gloss = await billingShellPage.getOCC2Gloss();
    expect(occ2Gloss).toBeTruthy();
  }
});

When('both OCCs are generated', async function() {
  await billingShellPage.verifyOCCGenerationComplete();
});

Then('both OCCs are registered correctly in Document All table', async function() {
  await billingShellPage.navigateToDocumentAllTable();
  await billingShellPage.verifyOCC1InDocumentAll();
  if (this.hasExcessConsumption) {
    await billingShellPage.verifyOCC2InDocumentAll();
  }
});

Then('OCCs are available for HP Extreme billing process consumption', async function() {
  await billingShellPage.verifyOCCsAvailableForHPExtreme();
});

Then('the shell execution does not run simultaneously with IZZIPAY shell', async function() {
  const isIZZIPAYRunning = await billingShellPage.checkIZZIPAYShellStatus();
  expect(isIZZIPAYRunning).toBe(false);
});

Then('sequential execution is enforced to avoid work table conflicts', async function() {
  await billingShellPage.verifySequentialExecutionControl();
  const hasConflicts = await billingShellPage.checkWorkTableConflicts();
  expect(hasConflicts).toBe(false);
});