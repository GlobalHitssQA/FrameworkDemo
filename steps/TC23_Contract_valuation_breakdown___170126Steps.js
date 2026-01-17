const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuationPage = require('../pages/ContractValuationPage');

let contractValuationPage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuationPage = new ContractValuationPage(this.page);
  await contractValuationPage.navigateToActicenter();
  await contractValuationPage.verifyMainScreenDisplayed();
});

When('the user selects a contract with hedge fund investments', async function () {
  await contractValuationPage.selectContractWithHedgeFunds();
  await contractValuationPage.verifyTotalValueComponentDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuationPage.clickTotalValueComponent();
});

Then('the valuation breakdown popup is displayed', async function () {
  const isPopupVisible = await contractValuationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the hedge funds section is visible with its monetary value', async function () {
  const isHedgeFundsVisible = await contractValuationPage.isHedgeFundsSectionVisible();
  expect(isHedgeFundsVisible).toBeTruthy();
  
  const hedgeFundsValue = await contractValuationPage.getHedgeFundsMonetaryValue();
  expect(hedgeFundsValue).not.toBeNull();
  expect(hedgeFundsValue.length).toBeGreaterThan(0);
});