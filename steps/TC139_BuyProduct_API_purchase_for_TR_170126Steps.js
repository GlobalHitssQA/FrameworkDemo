const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BuyProductPage = require('../pages/BuyProductPage');

let buyProductPage;
let apiResponse;
let lineNumber;

Given('an active line exists in SOLD plan without active packages', async function () {
  buyProductPage = new BuyProductPage(this.page);
  lineNumber = await buyProductPage.identifyEligibleLine();
  const isEligible = await buyProductPage.verifyLineIsEligible(lineNumber);
  expect(isEligible).toBeTruthy();
});

When('I invoke the BuyProduct API through HUB APIGEE with line number and TRIAL 6GB package code', async function () {
  apiResponse = await buyProductPage.invokeBuyProductAPI(lineNumber, 'TRIAL_6GB');
});

Then('the API should return a successful response with status code 200', async function () {
  const statusCode = await buyProductPage.getAPIResponseStatusCode(apiResponse);
  const successMessage = await buyProductPage.getAPIResponseMessage(apiResponse);
  expect(statusCode).toBe(200);
  expect(successMessage).toContain('success');
});

Then('the TRIAL 6GB package should be assigned to the line in BSCS7 with 6GB available and 90 days validity', async function () {
  await buyProductPage.navigateToBSCS7Console();
  await buyProductPage.searchLineInBSCS7(lineNumber);
  const packageDetails = await buyProductPage.getActivePackageDetails();
  expect(packageDetails.packageName).toContain('TRIAL 6GB');
  expect(packageDetails.availableData).toBe('6GB');
  expect(packageDetails.validityDays).toBe(90);
});

Then('the purchase should be registered in SIAC Unico with date time user package code and line', async function () {
  await buyProductPage.navigateToSIACUnico();
  await buyProductPage.searchPurchaseRecord(lineNumber);
  const recordVisible = await buyProductPage.isPurchaseRecordVisible();
  expect(recordVisible).toBeTruthy();
  const recordDetails = await buyProductPage.getPurchaseRecordDetails();
  expect(recordDetails.packageCode).toBe('TRIAL_6GB');
  expect(recordDetails.lineNumber).toBe(lineNumber);
  expect(recordDetails.date).toBeTruthy();
  expect(recordDetails.time).toBeTruthy();
  expect(recordDetails.user).toBeTruthy();
});

Then('the package cost of 7.58 PEN without IGV should be registered for monthly billing with cutoff day 28', async function () {
  await buyProductPage.navigateToBillingSection();
  await buyProductPage.searchBillingRecord(lineNumber);
  const billingDetails = await buyProductPage.getBillingDetails();
  expect(billingDetails.costWithoutIGV).toBe(7.58);
  expect(billingDetails.cutoffDay).toBe(28);
  expect(billingDetails.billingType).toBe('monthly');
});