const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;
let expectedEquityFundsValue;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('the user has selected a contract with equity fund investments', async function () {
  await contractBreakdownPage.searchAndSelectContractWithEquityFunds();
});

When('the user views the total contract value component', async function () {
  const isVisible = await contractBreakdownPage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user retrieves the expected equity funds value from the backend service', async function () {
  expectedEquityFundsValue = await contractBreakdownPage.getExpectedEquityFundsValueFromBackend();
  expect(expectedEquityFundsValue).toBeDefined();
});

When('the user clicks on the contract value component to display the breakdown', async function () {
  await contractBreakdownPage.clickContractValueComponent();
});

Then('the breakdown popup is displayed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the equity funds section is visible in the breakdown list', async function () {
  const isEquityFundsVisible = await contractBreakdownPage.isEquityFundsSectionVisible();
  expect(isEquityFundsVisible).toBeTruthy();
});

Then('the equity funds amount matches the expected accumulated value with correct thousand separator and decimal format', async function () {
  const displayedAmount = await contractBreakdownPage.getEquityFundsDisplayedAmount();
  const formattedExpectedValue = contractBreakdownPage.formatCurrencyValue(expectedEquityFundsValue);
  expect(displayedAmount).toBe(formattedExpectedValue);
});