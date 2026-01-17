const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolCalculationPage = require('../pages/InPoolCalculationPage');

let inPoolPage;

Given('the BSCS7 system is operational with configured parameters', async function () {
  inPoolPage = new InPoolCalculationPage(this.page);
  await inPoolPage.navigateToSystem();
  await inPoolPage.verifySystemOperational();
});

Given('{int} active lines are configured in SOLD plan Rate Plan {int}', async function (lineCount, ratePlan) {
  await inPoolPage.navigateToLineConfiguration();
  await inPoolPage.verifyActiveLines(lineCount, ratePlan);
});

When('I execute the In Pool calculation shell sh_BSCS_ProcesoFacturaGM', async function () {
  await inPoolPage.navigateToShellExecution();
  await inPoolPage.executeInPoolCalculationShell();
  await inPoolPage.waitForShellCompletion();
});

Then('the shell identifies {int} active lines in SOLD plan for the billing cycle', async function (expectedLines) {
  const identifiedLines = await inPoolPage.getIdentifiedLinesCount();
  expect(identifiedLines).toBe(expectedLines);
});

Then('the calculated In Pool bag is {int} MB for {int} lines at {int} MB per line', async function (totalMB, lineCount, mbPerLine) {
  const calculatedBag = await inPoolPage.getCalculatedInPoolBag();
  expect(calculatedBag).toBe(totalMB);
  const expectedCalculation = lineCount * mbPerLine;
  expect(calculatedBag).toBe(expectedCalculation);
});

Then('the OCC is generated with In Pool Service concept for {float} PEN without IGV', async function (expectedAmount) {
  await inPoolPage.navigateToOCCReport();
  const occConcept = await inPoolPage.getOCCConcept();
  const occAmount = await inPoolPage.getOCCAmount();
  expect(occConcept).toContain('Servicio In Pool');
  expect(occAmount).toBe(expectedAmount);
});

Then('the applied rate is {float} PEN per 10MB package totaling {float} PEN without IGV', async function (ratePerPackage, totalAmount) {
  const appliedRate = await inPoolPage.getAppliedRate();
  const totalCalculated = await inPoolPage.getTotalAmount();
  expect(appliedRate).toBe(ratePerPackage);
  expect(totalCalculated).toBe(totalAmount);
});