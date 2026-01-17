const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('I am authenticated in Acticenter as a Private Banking banker user', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginAsPrivateBankingBanker();
  const isMainScreenVisible = await contractValuePage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('I select a Legal Entity contract from Private Banking in the contract selector', async function () {
  await contractValuePage.openContractSelector();
  await contractValuePage.selectLegalEntityContract();
});

Then('the system loads the selected contract and displays the operation flow', async function () {
  const isOperationFlowVisible = await contractValuePage.isOperationFlowDisplayed();
  expect(isOperationFlowVisible).toBeTruthy();
});

Then('the total contract value component is visible with the amount in Mexican pesos', async function () {
  const isComponentVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
  const currencyFormat = await contractValuePage.getContractValueCurrency();
  expect(currencyFormat).toContain('MXN');
});

Then('the displayed value corresponds to the total contract value on the review date', async function () {
  const contractValue = await contractValuePage.getTotalContractValue();
  expect(contractValue).not.toBeNull();
  const isValueFormatValid = await contractValuePage.isContractValueFormatValid();
  expect(isValueFormatValid).toBeTruthy();
});