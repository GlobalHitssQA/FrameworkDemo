const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;
let expectedCheckingAccountBalance;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('a Banco Persona Moral contract with active checking account is available', async function () {
  expectedCheckingAccountBalance = await contractBreakdownPage.getExpectedCheckingAccountBalanceFromBackend();
});

When('the user selects a Banco Persona Moral contract in Acticenter', async function () {
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.selectBancoPersonaMoralContract();
});

Then('the system displays the operation screen with the selected Banco Persona Moral contract', async function () {
  const isDisplayed = await contractBreakdownPage.isOperationScreenDisplayed();
  expect(isDisplayed).toBeTruthy();
  const contractType = await contractBreakdownPage.getSelectedContractType();
  expect(contractType).toContain('Banco Persona Moral');
});

When('the user clicks on the total contract value component to display the breakdown', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays the popup with the contract breakdown items', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Effective MXN item is visible in the breakdown list', async function () {
  const isEffectiveMXNVisible = await contractBreakdownPage.isEffectiveMXNItemVisible();
  expect(isEffectiveMXNVisible).toBeTruthy();
});

Then('the Effective MXN value matches the checking account balance from backend services', async function () {
  const displayedEffectiveMXN = await contractBreakdownPage.getEffectiveMXNValue();
  const formattedExpectedBalance = contractBreakdownPage.formatCurrencyValue(expectedCheckingAccountBalance);
  expect(displayedEffectiveMXN).toBe(formattedExpectedBalance);
});