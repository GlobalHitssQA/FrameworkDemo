const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BuyProductApiPage = require('../pages/BuyProductApiPage');

let buyProductPage;
let apiResponse;
let lineNumber;
let packageCode;

Given('I have an active line in SOLD plan without B2B2C packages', async function () {
  buyProductPage = new BuyProductApiPage(this.page);
  const eligibleLine = await buyProductPage.identifyEligibleLine();
  lineNumber = eligibleLine.lineNumber;
  expect(eligibleLine.isEligible).toBe(true);
});

When('I invoke the BuyProduct API through HUB APIGEE with the line number and B2B2C 240GB package code with 12 months validity', async function () {
  packageCode = 'B2B2C_240GB_12M';
  apiResponse = await buyProductPage.invokeBuyProductApi(lineNumber, packageCode);
});

Then('the API should return a successful response with status code 200', async function () {
  const statusCode = await buyProductPage.getResponseStatusCode(apiResponse);
  const successMessage = await buyProductPage.getResponseMessage(apiResponse);
  expect(statusCode).toBe(200);
  expect(successMessage).toContain('success');
});

Then('the B2B2C 240GB package should be assigned to the line in BSCS7 with 240GB available and 360 days validity', async function () {
  const packageDetails = await buyProductPage.verifyPackageInBSCS7(lineNumber);
  expect(packageDetails.packageName).toContain('B2B2C 240GB');
  expect(packageDetails.availableData).toBe('240GB');
  expect(packageDetails.validityDays).toBeGreaterThanOrEqual(360);
  expect(packageDetails.status).toBe('active');
});

Then('the purchase should be registered in SIAC Unico with all package details', async function () {
  const siacRecord = await buyProductPage.verifySiacUnicoRecord(lineNumber, packageCode);
  expect(siacRecord.hasDate).toBe(true);
  expect(siacRecord.hasTime).toBe(true);
  expect(siacRecord.hasUser).toBe(true);
  expect(siacRecord.packageCode).toBe(packageCode);
  expect(siacRecord.lineNumber).toBe(lineNumber);
});

Then('the package cost of 296.61 soles without IGV should be registered for monthly billing with cutoff day 28', async function () {
  const billingInfo = await buyProductPage.verifyBillingRegistration(lineNumber);
  expect(billingInfo.amount).toBe(296.61);
  expect(billingInfo.includesIGV).toBe(false);
  expect(billingInfo.billingCycle).toBe('monthly');
  expect(billingInfo.cutoffDay).toBe(28);
});

Then('the package should be configured for local navigation only without roaming', async function () {
  const packageConfig = await buyProductPage.verifyPackageConfiguration(lineNumber);
  expect(packageConfig.localNavigationEnabled).toBe(true);
  expect(packageConfig.roamingEnabled).toBe(false);
});