const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FundsOperationPage = require('../pages/FundsOperationPage');

let fundsOperationPage;

Given('the user is authenticated in Acticenter with Patrimonial Banking role', async function () {
  fundsOperationPage = new FundsOperationPage(this.page);
  await fundsOperationPage.navigateToActicenter();
  await fundsOperationPage.loginWithPatrimonialBankingRole();
  const isMainScreenDisplayed = await fundsOperationPage.isMainScreenVisible();
  expect(isMainScreenDisplayed).toBeTruthy();
});

When('the user selects an Individual Customer contract from the contract selector', async function () {
  await fundsOperationPage.openContractSelector();
  await fundsOperationPage.selectIndividualCustomerContract();
  await fundsOperationPage.waitForContractToLoad();
});

Then('the system displays the total contract value component', async function () {
  const isComponentVisible = await fundsOperationPage.isTotalValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the total value is shown in monetary format with peso sign and two decimals', async function () {
  const totalValue = await fundsOperationPage.getTotalContractValueText();
  const monetaryFormatRegex = /^\$[\d,]+\.\d{2}$/;
  expect(totalValue).toMatch(monetaryFormatRegex);
});

Then('the total value component is visible and properly positioned on the funds operation screen', async function () {
  const isVisible = await fundsOperationPage.isTotalValueComponentVisible();
  const isInViewport = await fundsOperationPage.isTotalValueComponentInViewport();
  expect(isVisible).toBeTruthy();
  expect(isInViewport).toBeTruthy();
});