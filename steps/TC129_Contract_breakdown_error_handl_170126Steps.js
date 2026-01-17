const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.waitForAuthentication();
});

Given('the backend service is configured to simulate errors', async function () {
  await contractBreakdownPage.setupErrorSimulationEnvironment();
});

When('a backend service error is simulated for contract breakdown data', async function () {
  await contractBreakdownPage.simulateBackendServiceError();
});

Then('the system detects the service error', async function () {
  const errorDetected = await contractBreakdownPage.isServiceErrorDetected();
  expect(errorDetected).toBeTruthy();
});

When('the user clicks on the total contract value component to open the breakdown popup', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('a friendly error message is displayed to the user', async function () {
  const isErrorMessageVisible = await contractBreakdownPage.isErrorMessageVisible();
  expect(isErrorMessageVisible).toBeTruthy();
});

Then('the error message is user-friendly without technical details', async function () {
  const messageContent = await contractBreakdownPage.getErrorMessageContent();
  const containsTechnicalDetails = await contractBreakdownPage.messageContainsTechnicalDetails(messageContent);
  expect(containsTechnicalDetails).toBeFalsy();
});

Then('the message is clear in Spanish and suggests an action', async function () {
  const messageContent = await contractBreakdownPage.getErrorMessageContent();
  const isMessageInSpanish = await contractBreakdownPage.isMessageInSpanish(messageContent);
  const suggestsAction = await contractBreakdownPage.messageSuggestsAction(messageContent);
  expect(isMessageInSpanish).toBeTruthy();
  expect(suggestsAction).toBeTruthy();
});

When('a timeout error is simulated for data loading', async function () {
  await contractBreakdownPage.simulateTimeoutError();
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('an appropriate timeout message is displayed', async function () {
  const timeoutMessage = await contractBreakdownPage.getErrorMessageContent();
  const isTimeoutMessage = await contractBreakdownPage.isTimeoutRelatedMessage(timeoutMessage);
  expect(isTimeoutMessage).toBeTruthy();
});

When('the user dismisses the error message', async function () {
  await contractBreakdownPage.dismissErrorMessage();
});

Then('the user can retry opening the breakdown popup', async function () {
  const canRetry = await contractBreakdownPage.canRetryBreakdownOperation();
  expect(canRetry).toBeTruthy();
  await contractBreakdownPage.clickTotalContractValueComponent();
});