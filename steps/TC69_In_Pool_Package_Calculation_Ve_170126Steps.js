const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolCalculationPage = require('../pages/InPoolCalculationPage');

let inPoolPage;
let soldLinesCount;
let expectedInPoolQuota;
let shellCalculatedQuota;
let packageCount;
let expectedOccAmount;

Given('I have access to the billing system with SOLD rate plan data', async function () {
  inPoolPage = new InPoolCalculationPage(this.page);
  await inPoolPage.navigateToBillingSystem();
  await inPoolPage.verifyBillingSystemAccess();
});

Given('the In Pool calculation Shell is operational', async function () {
  const isOperational = await inPoolPage.verifyShellOperational();
  expect(isOperational).toBeTruthy();
});

Given('the parametric table has package cost configured at 1.30 soles', async function () {
  const packageCost = await inPoolPage.getParametricTablePackageCost();
  expect(packageCost).toBe(1.30);
});

When('I query the total count of lines in SOLD rate plan during the billing cycle', async function () {
  soldLinesCount = await inPoolPage.querySoldLinesCount();
  expect(soldLinesCount).toBeGreaterThan(0);
});

When('I manually calculate the expected In Pool quota by multiplying SOLD lines by 10 MB', async function () {
  expectedInPoolQuota = await inPoolPage.calculateExpectedInPoolQuota(soldLinesCount, 10);
  expect(expectedInPoolQuota).toBe(soldLinesCount * 10);
});

When('I execute the In Pool calculation Shell', async function () {
  await inPoolPage.executeInPoolCalculationShell();
});

When('I verify the Shell log shows the calculated In Pool quota', async function () {
  shellCalculatedQuota = await inPoolPage.getShellLogCalculatedQuota();
  expect(shellCalculatedQuota).toBe(expectedInPoolQuota);
});

When('I calculate the number of 10MB packages by dividing total quota by 10', async function () {
  packageCount = await inPoolPage.calculatePackageCount(shellCalculatedQuota, 10);
  expect(packageCount).toBe(Math.floor(shellCalculatedQuota / 10));
});

Then('the OCC In Pool Service amount should equal the package count multiplied by 1.30 soles', async function () {
  expectedOccAmount = packageCount * 1.30;
  const actualOccAmount = await inPoolPage.getOccInPoolServiceAmount();
  expect(actualOccAmount).toBe(expectedOccAmount);
});