const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let expectedHedgeFundsValue;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('the user selects a contract with hedge fund investments', async function () {
  await contractValuePage.searchAndSelectContractWithHedgeFunds();
});

Then('the total contract value component is displayed', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user retrieves the expected hedge funds value from backend service', async function () {
  expectedHedgeFundsValue = await contractValuePage.getExpectedHedgeFundsValueFromBackend();
});

When('the user clicks on the contract value component to expand breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the breakdown popup is displayed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user locates the hedge funds section in the breakdown list', async function () {
  await contractValuePage.scrollToHedgeFundsSection();
});

Then('the hedge funds section is visible', async function () {
  const isVisible = await contractValuePage.isHedgeFundsSectionVisible();
  expect(isVisible).toBeTruthy();
});

Then('the displayed hedge funds amount matches the expected backend value with correct thousand separators and decimal format', async function () {
  const displayedValue = await contractValuePage.getHedgeFundsDisplayedValue();
  const formattedExpectedValue = contractValuePage.formatCurrencyMXN(expectedHedgeFundsValue);
  expect(displayedValue).toBe(formattedExpectedValue);
});