const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolCalculationPage = require('../pages/InPoolCalculationPage');

let inPoolPage;

Given('the BSCS7 system is operational with configured parametric tables', async function () {
  inPoolPage = new InPoolCalculationPage(this.page);
  await inPoolPage.navigateToSystem();
  await inPoolPage.verifySystemOperational();
  await inPoolPage.verifyParametricTablesConfigured();
});

Given('100 active lines are configured in SOLD plan Rate Plan 3 for the billing cycle', async function () {
  await inPoolPage.navigateToLineConfiguration();
  await inPoolPage.verifyActiveLinesInSOLDPlan(100);
  await inPoolPage.verifyRatePlanAssignment('Rate Plan 3');
});

When('the In Pool calculation Shell sh_BSCS_ProcesoFacturaGM is executed before pre-billing', async function () {
  await inPoolPage.navigateToShellExecution();
  await inPoolPage.executeInPoolCalculationShell();
  await inPoolPage.waitForShellCompletion();
});

Then('the Shell identifies 100 active lines in SOLD plan for the billing cycle', async function () {
  const identifiedLines = await inPoolPage.getIdentifiedLinesCount();
  expect(identifiedLines).toBe(100);
  await inPoolPage.verifyLinesInSOLDPlan();
});

Then('the calculated In Pool bag is 1000 MB for 100 lines at 10 MB per line', async function () {
  const calculatedBag = await inPoolPage.getCalculatedInPoolBag();
  expect(calculatedBag).toBe(1000);
  await inPoolPage.verifyBagCalculationFormula(100, 10);
});

Then('an OCC is generated for In Pool Service concept with value 130.00 PEN without IGV', async function () {
  await inPoolPage.navigateToOCCConsultation();
  const occValue = await inPoolPage.getOCCValueForInPoolService();
  expect(occValue).toBe(130.00);
  await inPoolPage.verifyOCCConceptIsInPoolService();
});

Then('the applied rate is 1.30 PEN per 10MB package totaling 130.00 PEN for 100 lines', async function () {
  const appliedRate = await inPoolPage.getAppliedRatePerPackage();
  expect(appliedRate).toBe(1.30);
  const totalAmount = await inPoolPage.getTotalAmountForLines();
  expect(totalAmount).toBe(130.00);
  await inPoolPage.verifyRateCalculation(100, 1.30, 130.00);
});