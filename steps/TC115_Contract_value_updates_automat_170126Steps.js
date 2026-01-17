const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let initialTotalValue;
let initialFundsBalance;
let saleAmount;

Given('the user is authenticated and has access to Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('the user selects a contract with fund investments', async function () {
  await contractValuePage.openContractSearch();
  await contractValuePage.selectContractWithFunds();
});

Given('the system displays the component with the current total contract value', async function () {
  const isVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user records the initial total value and funds balance', async function () {
  initialTotalValue = await contractValuePage.getTotalContractValue();
  initialFundsBalance = await contractValuePage.getFundsBalance();
});

When('the user executes a variable income fund sale operation for a specific amount', async function () {
  saleAmount = 10000;
  await contractValuePage.openFundsSaleSection();
  await contractValuePage.selectVariableIncomeFund();
  await contractValuePage.enterSaleAmount(saleAmount);
  await contractValuePage.submitSaleOperation();
});

When('the system confirms the sale transaction successfully', async function () {
  const isConfirmed = await contractValuePage.isTransactionConfirmed();
  expect(isConfirmed).toBeTruthy();
});

When('the user waits for the automatic component refresh interval', async function () {
  await contractValuePage.waitForAutomaticRefresh();
});

Then('the variable income funds section should show a decreased value', async function () {
  const currentFundsBalance = await contractValuePage.getFundsBalance();
  expect(currentFundsBalance).toBeLessThan(initialFundsBalance);
});

Then('the purchasing power should show a proportionally increased value', async function () {
  const purchasingPower = await contractValuePage.getPurchasingPowerMXN();
  expect(purchasingPower).toBeGreaterThan(0);
});

Then('the values should update without requiring a page reload', async function () {
  const hasPageReloaded = await contractValuePage.checkIfPageWasReloaded();
  expect(hasPageReloaded).toBeFalsy();
});