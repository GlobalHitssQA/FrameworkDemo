const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let serviceResponse;
let responseTime;

Given('the user is authenticated in Acticenter', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToLogin();
  await acticenterPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
  const isLoggedIn = await acticenterPage.isUserLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

Given('the user navigates to the funds operation section', async function () {
  await acticenterPage.navigateToFundsOperation();
  const isOperationScreenVisible = await acticenterPage.isOperationScreenVisible();
  expect(isOperationScreenVisible).toBeTruthy();
});

When('the user selects a Persona Moral contract', async function () {
  await acticenterPage.openContractSearch();
  await acticenterPage.selectPersonaMoralContract();
  serviceResponse = await acticenterPage.captureAGAS21471Response();
  responseTime = await acticenterPage.getServiceResponseTime();
});

Then('the system should invoke AGAS21471 service automatically', async function () {
  const wasServiceCalled = await acticenterPage.wasAGAS21471ServiceCalled();
  expect(wasServiceCalled).toBeTruthy();
});

Then('the service should respond with HTTP 200 status code', async function () {
  expect(serviceResponse.status).toBe(200);
});

Then('the contract total value should be displayed in the component', async function () {
  const isValueDisplayed = await acticenterPage.isContractValueDisplayed();
  expect(isValueDisplayed).toBeTruthy();
});

Then('the displayed value should match the service response exactly', async function () {
  const displayedValue = await acticenterPage.getDisplayedContractValue();
  const serviceValue = serviceResponse.data.valorTotal;
  expect(displayedValue).toBe(serviceValue);
});

Then('the service response time should meet performance standards', async function () {
  const maxResponseTimeMs = 3000;
  expect(responseTime).toBeLessThanOrEqual(maxResponseTimeMs);
});

When('the user selects a Persona Moral Mexdolar contract', async function () {
  await acticenterPage.openContractSearch();
  await acticenterPage.selectPersonaMoralMexdolarContract();
  serviceResponse = await acticenterPage.captureAGAS21471Response();
});

Then('the service should return USD cash balance correctly', async function () {
  expect(serviceResponse.data.efectivoUSD).toBeDefined();
  expect(typeof serviceResponse.data.efectivoUSD).toBe('number');
});

Then('the USD balance should be displayed without conversion to pesos', async function () {
  const displayedUSDBalance = await acticenterPage.getDisplayedUSDBalance();
  const serviceUSDBalance = serviceResponse.data.efectivoUSD;
  expect(displayedUSDBalance).toBe(serviceUSDBalance);
  const currencyLabel = await acticenterPage.getUSDCurrencyLabel();
  expect(currencyLabel).toContain('USD');
});