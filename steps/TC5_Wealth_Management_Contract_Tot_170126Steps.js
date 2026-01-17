const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('I am authenticated in Acticenter as a Wealth Management banker', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginAsWealthManagementBanker();
  const isMainScreenVisible = await contractValuePage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('I select a Physical Person contract from Wealth Management', async function () {
  await contractValuePage.openContractSelector();
  await contractValuePage.selectPhysicalPersonContract();
});

Then('I should see the contract operation flow loaded', async function () {
  const isOperationFlowVisible = await contractValuePage.isOperationFlowDisplayed();
  expect(isOperationFlowVisible).toBeTruthy();
});

Then('I should see the total contract value component', async function () {
  const isComponentVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the total contract value should be displayed in Mexican pesos', async function () {
  const valueText = await contractValuePage.getTotalContractValueText();
  const hasMXNCurrency = contractValuePage.valueContainsMXNCurrency(valueText);
  expect(hasMXNCurrency).toBeTruthy();
});

Then('the total contract value should be correctly updated for the review date', async function () {
  const hasValidValue = await contractValuePage.hasTotalContractValueDisplayed();
  expect(hasValidValue).toBeTruthy();
});