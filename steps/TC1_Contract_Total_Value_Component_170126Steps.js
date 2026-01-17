const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FundsOperationPage = require('../pages/FundsOperationPage');

let fundsOperationPage;

Given('the user is authenticated in Acticenter as an advisor', async function () {
  fundsOperationPage = new FundsOperationPage(this.page);
  await fundsOperationPage.navigateToActicenter();
  await fundsOperationPage.login();
  await fundsOperationPage.verifyMainScreenIsDisplayed();
});

When('the user selects a contract from the client or contract search', async function () {
  await fundsOperationPage.clickSearchButton();
  await fundsOperationPage.searchAndSelectContract();
  await fundsOperationPage.verifyFundsOperationScreenIsDisplayed();
});

Then('the contract total value component should be visible on the main screen', async function () {
  const isVisible = await fundsOperationPage.isContractTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the component should display the total contract amount', async function () {
  const totalAmount = await fundsOperationPage.getContractTotalValueAmount();
  expect(totalAmount).not.toBeNull();
  expect(totalAmount.length).toBeGreaterThan(0);
});