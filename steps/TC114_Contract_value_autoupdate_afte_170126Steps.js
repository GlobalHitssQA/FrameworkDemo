const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let initialTotalValue;
let initialBreakdownValues;
let purchaseAmount;

Given('the user is authenticated and accesses Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.waitForPageLoad();
});

Given('the user selects a contract with available purchasing power', async function () {
  await contractValuePage.openContractSearch();
  await contractValuePage.selectContractWithPurchasingPower();
});

Given('the system displays the component with the current total contract value', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user records the total contract value and breakdown values', async function () {
  initialTotalValue = await contractValuePage.getTotalContractValue();
  await contractValuePage.openBreakdownPopup();
  initialBreakdownValues = await contractValuePage.getAllBreakdownValues();
  await contractValuePage.closeBreakdownPopup();
});

When('the user executes a debt fund purchase operation for a specific amount', async function () {
  purchaseAmount = 10000;
  await contractValuePage.navigateToFundPurchase();
  await contractValuePage.selectDebtFund();
  await contractValuePage.enterPurchaseAmount(purchaseAmount);
  await contractValuePage.confirmPurchaseOperation();
});

When('the system successfully processes the purchase operation', async function () {
  const isSuccess = await contractValuePage.waitForOperationSuccess();
  expect(isSuccess).toBeTruthy();
});

When('the user waits for the specified refresh interval', async function () {
  await contractValuePage.waitForAutoRefresh();
});

Then('the component updates automatically without page reload', async function () {
  const hasUpdated = await contractValuePage.verifyComponentUpdatedWithoutReload();
  expect(hasUpdated).toBeTruthy();
});

Then('the total value increases correctly', async function () {
  const newTotalValue = await contractValuePage.getTotalContractValue();
  expect(newTotalValue).toBeGreaterThan(initialTotalValue);
});

Then('the breakdown shows the new balance in the Debt Funds section', async function () {
  await contractValuePage.openBreakdownPopup();
  const newDebtFundsValue = await contractValuePage.getDebtFundsValue();
  const initialDebtFundsValue = initialBreakdownValues.debtFunds;
  expect(newDebtFundsValue).toBeGreaterThan(initialDebtFundsValue);
  await contractValuePage.closeBreakdownPopup();
});