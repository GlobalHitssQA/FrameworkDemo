const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FundsOperationPage = require('../pages/FundsOperationPage');

let fundsOperationPage;

Given('the user is authenticated in Acticenter as an advisor or wealth management banker', async function () {
  fundsOperationPage = new FundsOperationPage(this.page);
  await fundsOperationPage.navigateToActicenter();
  await fundsOperationPage.loginAsAdvisor();
  const isLoggedIn = await fundsOperationPage.isUserLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

When('the user starts the funds operation flow', async function () {
  await fundsOperationPage.startFundsOperationFlow();
  const isFlowScreenVisible = await fundsOperationPage.isFundsOperationScreenVisible();
  expect(isFlowScreenVisible).toBeTruthy();
});

When('the user selects a client and a contract', async function () {
  await fundsOperationPage.searchAndSelectClient();
  await fundsOperationPage.selectContract();
  const isContractLoaded = await fundsOperationPage.isContractLoaded();
  expect(isContractLoaded).toBeTruthy();
});

Then('the Contract Value and Composition component should be visible', async function () {
  const isComponentVisible = await fundsOperationPage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the component should appear after contract selection and before the buy\/sell widget', async function () {
  const isPositionCorrect = await fundsOperationPage.isContractValueComponentInCorrectPosition();
  expect(isPositionCorrect).toBeTruthy();
});

Then('the component should be vertically aligned with the rest of the flow elements', async function () {
  const isAligned = await fundsOperationPage.isContractValueComponentVerticallyAligned();
  expect(isAligned).toBeTruthy();
});