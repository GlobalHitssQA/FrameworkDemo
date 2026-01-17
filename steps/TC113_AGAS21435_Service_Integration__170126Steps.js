const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let serviceResponse;

Given('the user is authenticated in Acticenter with valid credentials', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToLogin();
  await acticenterPage.enterUsername(process.env.ACTICENTER_USERNAME);
  await acticenterPage.enterPassword(process.env.ACTICENTER_PASSWORD);
  await acticenterPage.clickLoginButton();
  const isMainScreenVisible = await acticenterPage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects an Individual Person contract from Brokerage House or Bank', async function () {
  await acticenterPage.clickSearchIcon();
  await acticenterPage.enterContractSearch(process.env.INDIVIDUAL_CONTRACT_ID);
  serviceResponse = await acticenterPage.interceptAGAS21435Service();
  await acticenterPage.selectIndividualPersonContract();
});

Then('the system should invoke the AGAS21435 service to retrieve contract data', async function () {
  const wasServiceInvoked = await acticenterPage.verifyServiceWasInvoked('AGAS21435');
  expect(wasServiceInvoked).toBeTruthy();
});

Then('the AGAS21435 service should respond with HTTP status code {int}', async function (expectedStatusCode) {
  const statusCode = await acticenterPage.getServiceResponseStatusCode();
  expect(statusCode).toBe(expectedStatusCode);
});

Then('the contract data should be displayed correctly in the Value and Composition component', async function () {
  const isComponentVisible = await acticenterPage.isValueCompositionComponentVisible();
  expect(isComponentVisible).toBeTruthy();
  
  const totalValue = await acticenterPage.getContractTotalValue();
  expect(totalValue).not.toBeNull();
  
  const areItemsDisplayed = await acticenterPage.areIndividualPersonItemsDisplayed();
  expect(areItemsDisplayed).toBeTruthy();
});

Then('the system logs should record the AGAS21435 request and response correctly', async function () {
  const logsRecorded = await acticenterPage.verifySystemLogsForService('AGAS21435');
  expect(logsRecorded.requestLogged).toBeTruthy();
  expect(logsRecorded.responseLogged).toBeTruthy();
  expect(logsRecorded.noErrors).toBeTruthy();
  expect(logsRecorded.responseTimeAcceptable).toBeTruthy();
});