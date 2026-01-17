const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.performAuthentication();
});

Given('the user has selected a contract with variable income fund investments', async function () {
  await contractValuePage.selectContractWithVariableIncomeFunds();
  const isContractDisplayed = await contractValuePage.isContractValueComponentVisible();
  expect(isContractDisplayed).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the system displays the popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user locates the variable income funds item in the breakdown list', async function () {
  await contractValuePage.scrollToVariableIncomeFundsItem();
});

Then('the system displays the variable income funds item in the list', async function () {
  const isItemVisible = await contractValuePage.isVariableIncomeFundsItemVisible();
  expect(isItemVisible).toBeTruthy();
});

Then('the accumulated monetary value for variable income fund investments is displayed on the right side', async function () {
  const accumulatedValue = await contractValuePage.getVariableIncomeFundsAccumulatedValue();
  expect(accumulatedValue).not.toBeNull();
  expect(accumulatedValue).toMatch(/^\$?[\d,]+(\.\d{2})?$/);
});