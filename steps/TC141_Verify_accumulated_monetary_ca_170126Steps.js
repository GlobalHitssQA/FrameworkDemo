const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValueBreakdownPage = require('../pages/ContractValueBreakdownPage');

let contractValueBreakdownPage;

Given('the user is authenticated in Acticenter with valid patrimonial banking credentials', async function () {
  contractValueBreakdownPage = new ContractValueBreakdownPage(this.page);
  await contractValueBreakdownPage.navigateToActicenter();
  await contractValueBreakdownPage.authenticateUser();
  await contractValueBreakdownPage.verifyMainScreenDisplayed();
});

When('the user selects a contract containing variable income fund investments', async function () {
  await contractValueBreakdownPage.selectContractWithVariableIncomeFunds();
  await contractValueBreakdownPage.verifyContractLoaded();
  await contractValueBreakdownPage.verifyTotalValueComponentVisible();
});

When('the user clicks on the total contract value component to display the breakdown', async function () {
  await contractValueBreakdownPage.clickTotalValueComponent();
  await contractValueBreakdownPage.verifyBreakdownPopupDisplayed();
});

Then('the Variable Income Funds section should display the correct accumulated monetary value aligned to the right', async function () {
  const isVariableIncomeFundsVisible = await contractValueBreakdownPage.isVariableIncomeFundsSectionVisible();
  expect(isVariableIncomeFundsVisible).toBeTruthy();
  
  const variableIncomeFundsValue = await contractValueBreakdownPage.getVariableIncomeFundsValue();
  expect(variableIncomeFundsValue).toBeTruthy();
  expect(variableIncomeFundsValue).toMatch(/^\$[\d,]+(\.\d{2})?$/);
  
  const isAlignedRight = await contractValueBreakdownPage.isVariableIncomeFundsValueAlignedRight();
  expect(isAlignedRight).toBeTruthy();
});