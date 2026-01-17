const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CancelProductPage = require('../pages/CancelProductPage');

let cancelProductPage;
let apiResponse;

Given('a user is authenticated in the system', async function () {
  cancelProductPage = new CancelProductPage(this.page);
  await cancelProductPage.navigateToSystem();
  await cancelProductPage.authenticateUser();
});

Given('an active line exists with SOLD plan and assigned B2B2C package', async function () {
  const lineStatus = await cancelProductPage.verifyActiveLineWithSOLDPlan();
  expect(lineStatus).toBeTruthy();
  const packageStatus = await cancelProductPage.verifyB2B2CPackageAssigned();
  expect(packageStatus).toBeTruthy();
});

Given('the CancelProduct API is available', async function () {
  const apiAvailable = await cancelProductPage.checkCancelProductAPIAvailability();
  expect(apiAvailable).toBeTruthy();
});

When('the user invokes the CancelProduct API with the active B2B2C package parameters', async function () {
  apiResponse = await cancelProductPage.invokeCancelProductAPI();
});

Then('the API should return a successful response code', async function () {
  const isSuccessful = await cancelProductPage.verifyAPIResponseSuccess(apiResponse);
  expect(isSuccessful).toBeTruthy();
});

Then('the B2B2C package status in BSCS7 should show as cancelled', async function () {
  await cancelProductPage.navigateToBSCS7();
  const packageStatus = await cancelProductPage.getPackageStatusInBSCS7();
  expect(packageStatus).toBe('cancelled');
});

Then('the package should no longer be active for the line', async function () {
  const isPackageActive = await cancelProductPage.isPackageActiveForLine();
  expect(isPackageActive).toBeFalsy();
});

Then('the cancellation transaction should be recorded in SIAC Unico with date time and user', async function () {
  await cancelProductPage.navigateToSIACUnico();
  const transactionRecord = await cancelProductPage.getCancellationTransactionRecord();
  expect(transactionRecord.date).toBeTruthy();
  expect(transactionRecord.time).toBeTruthy();
  expect(transactionRecord.user).toBeTruthy();
});

Then('the cancelled B2B2C package should not appear in the next billing cycle invoice', async function () {
  await cancelProductPage.navigateToBillingSection();
  const packageInInvoice = await cancelProductPage.isPackageInNextBillingCycle();
  expect(packageInInvoice).toBeFalsy();
});