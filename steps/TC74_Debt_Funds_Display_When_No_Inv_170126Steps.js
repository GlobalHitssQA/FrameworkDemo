const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.waitForAuthentication();
});

Given('there is an active contract without debt fund investments', async function () {
  await contractBreakdownPage.verifyContractWithoutDebtFundsExists();
});

When('the user selects a contract without debt fund investments', async function () {
  await contractBreakdownPage.selectContractWithoutDebtFunds();
});

Then('the contract loads and displays on screen', async function () {
  const isDisplayed = await contractBreakdownPage.isContractDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValue();
});

Then('the popup with the complete contract value breakdown is displayed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Debt Funds section shows a value of zero pesos', async function () {
  const debtFundsValue = await contractBreakdownPage.getDebtFundsValue();
  expect(debtFundsValue).toBe('$0.00');
});

When('the user clicks outside the breakdown component', async function () {
  await contractBreakdownPage.clickOutsideBreakdownPopup();
});

Then('the popup closes correctly', async function () {
  const isPopupClosed = await contractBreakdownPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});