const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('a user with advisor or banker role is authenticated', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('a contract without variable income fund investments is available', async function () {
  await contractValuePage.verifyContractWithoutVariableIncomeFundsExists();
});

When('the user selects the contract without variable income fund investments', async function () {
  await contractValuePage.selectContractWithoutVariableIncomeFunds();
});

Then('the contract loads correctly in the system', async function () {
  const isLoaded = await contractValuePage.isContractLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the popup with the value breakdown is displayed showing all sections', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const sectionsCount = await contractValuePage.getBreakdownSectionsCount();
  expect(sectionsCount).toBeGreaterThan(0);
});

When('the user searches for the Variable Income Funds section in the breakdown list', async function () {
  await contractValuePage.locateVariableIncomeFundsSection();
});

Then('the Variable Income Funds section appears with value zero', async function () {
  const variableIncomeFundsValue = await contractValuePage.getVariableIncomeFundsValue();
  expect(variableIncomeFundsValue).toBe('$0.00');
});

Then('the sum of all sections equals the total contract value displayed', async function () {
  const totalValue = await contractValuePage.getTotalContractValue();
  const sumOfSections = await contractValuePage.calculateSumOfAllSections();
  expect(sumOfSections).toBeCloseTo(totalValue, 2);
});