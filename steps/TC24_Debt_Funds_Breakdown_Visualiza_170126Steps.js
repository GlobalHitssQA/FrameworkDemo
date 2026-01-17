const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with an active contract containing debt fund investments', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.authenticateUser();
  await contractValuePage.selectContractWithDebtFunds();
  const isContractDisplayed = await contractValuePage.isContractValueComponentVisible();
  expect(isContractDisplayed).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickOnTotalContractValue();
});

Then('the system displays the breakdown popup with the contract value details', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Debt Funds item is visible in the breakdown list', async function () {
  const isDebtFundsVisible = await contractValuePage.isDebtFundsItemVisible();
  expect(isDebtFundsVisible).toBeTruthy();
});

Then('the Debt Funds item displays the accumulated monetary value on the right side', async function () {
  const debtFundsValue = await contractValuePage.getDebtFundsAccumulatedValue();
  expect(debtFundsValue).not.toBeNull();
  expect(debtFundsValue).toMatch(/^\$[\d,]+(\.\d{2})?$/);
});