const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuationPage = require('../pages/ContractValuationPage');

let contractValuationPage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuationPage = new ContractValuationPage(this.page);
  await contractValuationPage.navigateToActicenter();
  await contractValuationPage.verifyMainScreenIsDisplayed();
});

When('the user selects a contract with debt fund investments', async function () {
  await contractValuationPage.selectContractWithDebtFunds();
  await contractValuationPage.verifyTotalValueComponentIsDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuationPage.clickTotalContractValueComponent();
});

Then('the breakdown popup is displayed', async function () {
  const isPopupVisible = await contractValuationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Debt Funds section is visible with its monetary value', async function () {
  const isDebtFundsVisible = await contractValuationPage.isDebtFundsSectionVisible();
  expect(isDebtFundsVisible).toBeTruthy();
  
  const debtFundsValue = await contractValuationPage.getDebtFundsMonetaryValue();
  expect(debtFundsValue).not.toBeNull();
  expect(debtFundsValue.length).toBeGreaterThan(0);
});