const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuationPage = require('../pages/ContractValuationPage');

let contractValuationPage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuationPage = new ContractValuationPage(this.page);
  await contractValuationPage.navigateToActicenter();
  await contractValuationPage.verifyMainScreenIsDisplayed();
});

When('the user selects a contract with equity fund investments', async function () {
  await contractValuationPage.selectContractWithEquityFunds();
  await contractValuationPage.verifyContractValueComponentIsDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuationPage.clickContractValueComponent();
});

Then('the valuation breakdown popup is displayed', async function () {
  const isPopupVisible = await contractValuationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Equity Funds section is visible with its monetary value', async function () {
  const isEquityFundsVisible = await contractValuationPage.isEquityFundsSectionVisible();
  expect(isEquityFundsVisible).toBeTruthy();
  
  const equityFundsValue = await contractValuationPage.getEquityFundsMonetaryValue();
  expect(equityFundsValue).toBeTruthy();
  expect(equityFundsValue.length).toBeGreaterThan(0);
});