const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let expectedDebtFundsTotal;
let displayedDebtFundsValue;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('there is an active contract with multiple debt fund investments', async function () {
  await contractValuePage.verifyActiveContractExists();
});

Given('the backend services are available', async function () {
  await contractValuePage.verifyBackendServicesAvailable();
});

Given('I select a contract that contains multiple debt fund investments', async function () {
  await contractValuePage.selectContractWithDebtFunds();
});

Then('the system displays the contract value and composition component', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('I retrieve the individual values of each debt fund investment', async function () {
  const individualValues = await contractValuePage.getIndividualDebtFundValues();
  this.individualDebtFundValues = individualValues;
});

When('I calculate the expected total sum manually', async function () {
  expectedDebtFundsTotal = await contractValuePage.calculateTotalDebtFunds(this.individualDebtFundValues);
});

When('I click on the contract value component to display the breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the system displays a popup with the breakdown including Debt Funds section', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  const hasDebtFundsSection = await contractValuePage.isDebtFundsSectionVisible();
  expect(hasDebtFundsSection).toBe(true);
});

When('I compare the displayed Debt Funds value with the calculated sum', async function () {
  displayedDebtFundsValue = await contractValuePage.getDebtFundsDisplayedValue();
});

Then('the accumulated value in Debt Funds matches exactly the sum of all individual debt fund investments', async function () {
  const valuesMatch = await contractValuePage.compareDebtFundsValues(displayedDebtFundsValue, expectedDebtFundsTotal);
  expect(valuesMatch).toBe(true);
});