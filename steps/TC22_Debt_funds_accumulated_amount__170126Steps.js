const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let expectedDebtFundsValue;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('there is an active contract with debt fund investments', async function () {
  const hasDebtFunds = await contractValuePage.verifyContractHasDebtFundInvestments();
  expect(hasDebtFunds).toBeTruthy();
});

When('the user accesses Acticenter and selects a contract with debt fund investments', async function () {
  await contractValuePage.searchAndSelectContractWithDebtFunds();
});

Then('the system displays the total contract value component', async function () {
  const isVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user retrieves the expected debt funds value from the backend service', async function () {
  expectedDebtFundsValue = await contractValuePage.getDebtFundsValueFromBackend();
});

Then('the accumulated value of debt fund investments is obtained', async function () {
  expect(expectedDebtFundsValue).not.toBeNull();
  expect(expectedDebtFundsValue).toBeDefined();
});

When('the user clicks on the component to display the contract value breakdown', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the system displays the popup with detailed breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user identifies the Debt Funds section in the breakdown list', async function () {
  await contractValuePage.scrollToDebtFundsSection();
});

Then('the Debt Funds section is displayed in the list', async function () {
  const isDebtFundsSectionVisible = await contractValuePage.isDebtFundsSectionVisible();
  expect(isDebtFundsSectionVisible).toBeTruthy();
});

Then('the amount shown in the Debt Funds section matches exactly the accumulated monetary value including thousands separator and decimals', async function () {
  const displayedAmount = await contractValuePage.getDebtFundsDisplayedAmount();
  const formattedExpectedValue = contractValuePage.formatCurrencyValue(expectedDebtFundsValue);
  expect(displayedAmount).toBe(formattedExpectedValue);
});