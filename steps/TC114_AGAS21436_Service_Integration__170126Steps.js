const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterContractPage = require('../pages/ActicenterContractPage');

let acticenterPage;
let serviceResponse;
let responseTime;

Given('the user is authenticated in Acticenter', async function () {
  acticenterPage = new ActicenterContractPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.login();
  const isAuthenticated = await acticenterPage.isUserAuthenticated();
  expect(isAuthenticated).toBeTruthy();
});

When('the user selects a Physical Person contract', async function () {
  await acticenterPage.openContractSearch();
  await acticenterPage.searchPhysicalPersonContract();
  await acticenterPage.selectFirstContractResult();
});

Then('the system loads the contract and displays the operation screen', async function () {
  const isOperationScreenVisible = await acticenterPage.isOperationScreenVisible();
  expect(isOperationScreenVisible).toBeTruthy();
});

Then('the system automatically invokes the AGAS21436 service with contract parameters', async function () {
  const serviceCall = await acticenterPage.captureAGAS21436ServiceCall();
  expect(serviceCall).not.toBeNull();
  expect(serviceCall.endpoint).toContain('AGAS21436');
  expect(serviceCall.params.contractType).toBe('PERSONA_FISICA');
});

Then('the AGAS21436 service responds with HTTP status code {int}', async function (expectedStatusCode) {
  serviceResponse = await acticenterPage.getAGAS21436ServiceResponse();
  expect(serviceResponse.status).toBe(expectedStatusCode);
});

Then('the service returns the total contract value', async function () {
  expect(serviceResponse.data).toHaveProperty('valorTotalContrato');
  expect(typeof serviceResponse.data.valorTotalContrato).toBe('number');
});

Then('the total value displayed in the component matches the service response', async function () {
  const displayedValue = await acticenterPage.getTotalContractValueDisplayed();
  const serviceValue = serviceResponse.data.valorTotalContrato;
  const formattedServiceValue = acticenterPage.formatCurrency(serviceValue);
  expect(displayedValue).toBe(formattedServiceValue);
});

Then('the service response time is within acceptable performance limits', async function () {
  responseTime = await acticenterPage.getAGAS21436ResponseTime();
  const maxResponseTimeMs = 3000;
  expect(responseTime).toBeLessThanOrEqual(maxResponseTimeMs);
});