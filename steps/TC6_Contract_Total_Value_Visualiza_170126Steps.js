const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter as a Wealth Management banker', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginAsWealthManagementBanker();
  const isMainScreenVisible = await contractValuePage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a Legal Entity contract from the contract selector', async function () {
  await contractValuePage.openContractSelector();
  await contractValuePage.selectLegalEntityContract();
});

Then('the system loads the selected contract and displays the operation flow', async function () {
  const isOperationFlowVisible = await contractValuePage.isOperationFlowVisible();
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

Then('the displayed value corresponds to the current total contract value', async function () {
  const totalValue = await contractValuePage.getTotalContractValue();
  expect(totalValue).not.toBeNull();
  const isValidAmount = await contractValuePage.isValidMonetaryAmount(totalValue);
  expect(isValidAmount).toBeTruthy();
});