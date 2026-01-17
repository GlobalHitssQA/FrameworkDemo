const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let serviceResponse;

Given('the user is authenticated in Acticenter with advisor credentials', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToLogin();
  await acticenterPage.enterUsername(process.env.ADVISOR_USERNAME);
  await acticenterPage.enterPassword(process.env.ADVISOR_PASSWORD);
  await acticenterPage.clickLoginButton();
  const isLoggedIn = await acticenterPage.isUserLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

When('the user selects a Legal Entity contract from Brokerage House or Bank', async function () {
  await acticenterPage.clickSearchIcon();
  await acticenterPage.enterContractSearch(process.env.LEGAL_ENTITY_CONTRACT_ID);
  serviceResponse = await acticenterPage.interceptAGAS21470ServiceCall();
  await acticenterPage.selectLegalEntityContract();
});

Then('the system should invoke AGAS21470 service automatically', async function () {
  const wasServiceInvoked = await acticenterPage.wasAGAS21470ServiceInvoked();
  expect(wasServiceInvoked).toBeTruthy();
});

Then('the AGAS21470 service should return HTTP 200 with contract data', async function () {
  expect(serviceResponse.status).toBe(200);
  expect(serviceResponse.data).toBeDefined();
  expect(serviceResponse.data.contractInfo).toBeDefined();
});

Then('the contract data should be displayed correctly in the Value and Composition component', async function () {
  const isValueComponentVisible = await acticenterPage.isContractValueComponentVisible();
  expect(isValueComponentVisible).toBeTruthy();
  
  const totalValue = await acticenterPage.getContractTotalValue();
  expect(totalValue).toBeTruthy();
  
  await acticenterPage.clickContractValueComponent();
  const isBreakdownPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isBreakdownPopupVisible).toBeTruthy();
  
  const breakdownItems = await acticenterPage.getBreakdownItems();
  expect(breakdownItems.length).toBeGreaterThan(0);
});

Then('the system logs should confirm successful service invocation and response', async function () {
  const logEntries = await acticenterPage.getServiceLogEntries('AGAS21470');
  
  const hasRequestLog = logEntries.some(log => log.type === 'request');
  const hasResponseLog = logEntries.some(log => log.type === 'response' && log.status === 200);
  const hasProcessingTime = logEntries.some(log => log.processingTime !== undefined);
  
  expect(hasRequestLog).toBeTruthy();
  expect(hasResponseLog).toBeTruthy();
  expect(hasProcessingTime).toBeTruthy();
});