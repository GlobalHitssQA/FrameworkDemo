const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractComponentPage = require('../pages/ContractComponentPage');

let contractPage;
let initialValues = {};

Given('the user is authenticated in Acticenter with operation permissions', async function () {
  contractPage = new ContractComponentPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.loginWithOperationPermissions();
});

Given('the user has an active contract with available balance', async function () {
  const hasActiveContract = await contractPage.verifyActiveContractExists();
  expect(hasActiveContract).toBeTruthy();
});

When('the user selects a contract and opens the breakdown popup', async function () {
  await contractPage.selectContract();
  await contractPage.openBreakdownPopup();
});

Then('the popup displays the breakdown with current values for each category', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const categories = await contractPage.getBreakdownCategories();
  expect(categories.length).toBeGreaterThan(0);
});

When('the user records the initial values of relevant categories', async function () {
  initialValues.buyingPower = await contractPage.getBuyingPowerValue();
  initialValues.funds = await contractPage.getFundsValue();
  initialValues.pendingSettlement = await contractPage.getPendingSettlementValue();
  initialValues.totalValue = await contractPage.getTotalContractValue();
});

Then('the initial values are documented for later comparison', async function () {
  expect(initialValues.buyingPower).toBeDefined();
  expect(initialValues.funds).toBeDefined();
  expect(initialValues.pendingSettlement).toBeDefined();
  expect(initialValues.totalValue).toBeDefined();
});

When('the user executes a fund purchase operation for the selected contract', async function () {
  await contractPage.closeBreakdownPopup();
  await contractPage.navigateToFundPurchase();
  await contractPage.selectFundToPurchase();
  await contractPage.enterPurchaseAmount();
  await contractPage.confirmPurchaseOperation();
});

Then('the operation is executed correctly and registered in the system', async function () {
  const isOperationSuccessful = await contractPage.isOperationConfirmationVisible();
  expect(isOperationSuccessful).toBeTruthy();
});

When('the user observes the total contract value component', async function () {
  await contractPage.navigateBackToContractView();
  await contractPage.waitForValueUpdate();
});

Then('the total value updates automatically without page refresh', async function () {
  const currentTotalValue = await contractPage.getTotalContractValue();
  expect(currentTotalValue).not.toEqual(initialValues.totalValue);
});

When('the user opens the breakdown popup again', async function () {
  await contractPage.openBreakdownPopup();
});

Then('the affected categories show the new updated values in real time', async function () {
  const updatedPendingSettlement = await contractPage.getPendingSettlementValue();
  const updatedFunds = await contractPage.getFundsValue();
  
  expect(updatedPendingSettlement).not.toEqual(initialValues.pendingSettlement);
  expect(updatedFunds).not.toEqual(initialValues.funds);
  
  await contractPage.closeBreakdownPopup();
});