const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.authenticate();
});

Given('the user has selected a contract with hedge fund investments', async function () {
  await contractValuePage.selectContractWithHedgeFunds();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the system displays the popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user locates the Hedge Funds item in the breakdown list', async function () {
  await contractValuePage.scrollToHedgeFundsItem();
});

Then('the Hedge Funds item is visible in the list', async function () {
  const isHedgeFundsVisible = await contractValuePage.isHedgeFundsItemVisible();
  expect(isHedgeFundsVisible).toBeTruthy();
});

Then('the accumulated monetary value for hedge fund investments is displayed on the right side', async function () {
  const accumulatedValue = await contractValuePage.getHedgeFundsAccumulatedValue();
  expect(accumulatedValue).not.toBeNull();
  expect(accumulatedValue).toMatch(/^\$[\d,]+(\.\d{2})?$/);
});