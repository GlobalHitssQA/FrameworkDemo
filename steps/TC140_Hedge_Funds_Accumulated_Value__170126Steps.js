const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let expectedHedgeFundsTotal = 0;
let individualHedgeFundValues = [];

Given('the user is authenticated and viewing a contract with multiple hedge fund investments', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.waitForAuthentication();
});

When('the user selects the contract containing hedge fund investments', async function () {
  await contractValuePage.openContractSearch();
  await contractValuePage.searchAndSelectContractWithHedgeFunds();
});

Then('the system displays the contract value and composition component', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user retrieves individual hedge fund investment values from the system', async function () {
  individualHedgeFundValues = await contractValuePage.getIndividualHedgeFundInvestmentValues();
});

Then('the user calculates the expected total hedge fund value', async function () {
  expectedHedgeFundsTotal = individualHedgeFundValues.reduce((sum, value) => sum + value, 0);
});

When('the user clicks on the contract value component to display the breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the system displays the popup with the breakdown including the Hedge Funds section', async function () {
  const isBreakdownVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBeTruthy();
  const isHedgeFundsSectionVisible = await contractValuePage.isHedgeFundsSectionVisible();
  expect(isHedgeFundsSectionVisible).toBeTruthy();
});

Then('the accumulated value shown in Hedge Funds matches the calculated sum of all individual hedge fund investments', async function () {
  const displayedHedgeFundsValue = await contractValuePage.getHedgeFundsAccumulatedValue();
  expect(displayedHedgeFundsValue).toBeCloseTo(expectedHedgeFundsTotal, 2);
});