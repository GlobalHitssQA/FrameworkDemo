const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const GetInternetBalancePage = require('../pages/GetInternetBalancePage');

let getInternetBalancePage;
let apiResponse;

Given('the user is authenticated in the system', async function () {
  getInternetBalancePage = new GetInternetBalancePage(this.page);
  await getInternetBalancePage.authenticateUser();
});

Given('the line is active with SOLD plan and assigned packages', async function () {
  const isLineActive = await getInternetBalancePage.verifyLineActiveWithSOLDPlan();
  expect(isLineActive).toBeTruthy();
});

Given('the GetInternetBalance API is available', async function () {
  const isApiAvailable = await getInternetBalancePage.checkApiAvailability();
  expect(isApiAvailable).toBeTruthy();
});

Given('the connection to BSCS7 is active', async function () {
  const isBscsConnected = await getInternetBalancePage.verifyBSCS7Connection();
  expect(isBscsConnected).toBeTruthy();
});

When('I invoke the GetInternetBalance API with SOLD plan line parameters', async function () {
  apiResponse = await getInternetBalancePage.invokeGetInternetBalanceAPI();
});

Then('the API should return a successful response code with balance information', async function () {
  const isSuccessful = await getInternetBalancePage.verifySuccessfulResponse(apiResponse);
  expect(isSuccessful).toBeTruthy();
});

Then('the response should include TRIAL 6GB package details if active', async function () {
  const hasTrial6GB = await getInternetBalancePage.verifyTrial6GBPackagePresent(apiResponse);
  expect(hasTrial6GB).toBeTruthy();
});

Then('the response should show total capacity consumed capacity remaining capacity and expiration date for TRIAL 6GB', async function () {
  const trial6GBDetails = await getInternetBalancePage.getTrial6GBPackageDetails(apiResponse);
  expect(trial6GBDetails.totalCapacity).toBeDefined();
  expect(trial6GBDetails.consumedCapacity).toBeDefined();
  expect(trial6GBDetails.remainingCapacity).toBeDefined();
  expect(trial6GBDetails.expirationDate).toBeDefined();
});

Then('the response should include B2B2C package details if active', async function () {
  const hasB2B2C = await getInternetBalancePage.verifyB2B2CPackagePresent(apiResponse);
  expect(hasB2B2C).toBeTruthy();
});

Then('the response should show total capacity consumed capacity remaining capacity and expiration date for B2B2C packages', async function () {
  const b2b2cDetails = await getInternetBalancePage.getB2B2CPackageDetails(apiResponse);
  expect(b2b2cDetails.totalCapacity).toBeDefined();
  expect(b2b2cDetails.consumedCapacity).toBeDefined();
  expect(b2b2cDetails.remainingCapacity).toBeDefined();
  expect(b2b2cDetails.expirationDate).toBeDefined();
});

Then('the balance values should match the consumption records in BSCS7 UDR_LT_01 table', async function () {
  const balanceMatchesBSCS7 = await getInternetBalancePage.validateBalanceAgainstBSCS7(apiResponse);
  expect(balanceMatchesBSCS7).toBeTruthy();
});