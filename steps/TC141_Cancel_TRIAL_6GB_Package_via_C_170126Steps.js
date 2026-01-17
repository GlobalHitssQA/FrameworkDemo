const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CancelProductPage = require('../pages/CancelProductPage');

let cancelProductPage;
let apiResponse;

Given('the user is authenticated in the system', async function () {
  cancelProductPage = new CancelProductPage(this.page);
  await cancelProductPage.navigateToSystem();
  await cancelProductPage.authenticateUser();
});

Given('there is an active line with SOLD plan and TRIAL 6GB package assigned', async function () {
  const isLineActive = await cancelProductPage.verifyActiveLineWithPackage();
  expect(isLineActive).toBeTruthy();
});

Given('the CancelProduct API is available', async function () {
  const isApiAvailable = await cancelProductPage.checkCancelProductApiAvailability();
  expect(isApiAvailable).toBeTruthy();
});

When('the user invokes the CancelProduct API with TRIAL 6GB package parameters', async function () {
  apiResponse = await cancelProductPage.invokeCancelProductApi();
});

Then('the API should return a successful response code', async function () {
  const isSuccessful = await cancelProductPage.verifyApiSuccessResponse(apiResponse);
  expect(isSuccessful).toBeTruthy();
});

Then('the TRIAL 6GB package should appear as cancelled in BSCS7', async function () {
  await cancelProductPage.navigateToBSCS7();
  const packageStatus = await cancelProductPage.getPackageStatusInBSCS7();
  expect(packageStatus).toBe('cancelled');
});

Then('the package should no longer be active for the line', async function () {
  const isPackageActive = await cancelProductPage.isPackageActiveForLine();
  expect(isPackageActive).toBeFalsy();
});

Then('the cancellation transaction should be registered in SIAC Unico with date time and user', async function () {
  await cancelProductPage.navigateToSIACUnico();
  const transactionDetails = await cancelProductPage.getCancellationTransactionDetails();
  expect(transactionDetails.date).toBeTruthy();
  expect(transactionDetails.time).toBeTruthy();
  expect(transactionDetails.user).toBeTruthy();
});