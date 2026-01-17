const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter as a Private Banking banker', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginAsPrivateBankingBanker();
  const isMainScreenVisible = await contractValuePage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects an Individual Person contract from Private Banking in the contract selector', async function () {
  await contractValuePage.openContractSelector();
  await contractValuePage.selectIndividualPersonContract();
});

Then('the system loads the selected contract and displays the operation flow', async function () {
  const isOperationFlowVisible = await contractValuePage.isOperationFlowDisplayed();
  expect(isOperationFlowVisible).toBeTruthy();
});

Then('the total contract value component is visible on the screen', async function () {
  const isComponentVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the total contract value is displayed in Mexican pesos', async function () {
  const currencyFormat = await contractValuePage.getContractValueCurrency();
  expect(currencyFormat).toContain('MXN');
});

Then('the displayed value corresponds to the total contract value at the review date', async function () {
  const valueText = await contractValuePage.getTotalContractValue();
  const isValidValue = await contractValuePage.isValidMonetaryValue(valueText);
  expect(isValidValue).toBeTruthy();
});