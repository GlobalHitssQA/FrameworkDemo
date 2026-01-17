const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.authenticate();
});

Given('the user has selected a contract with money market instrument investments', async function () {
  await contractValuePage.selectContractWithMoneyMarketInvestments();
  const isContractVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isContractVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickOnTotalContractValueComponent();
});

Then('the system displays the popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Money Market section is visible in the breakdown list', async function () {
  const isMoneyMarketVisible = await contractValuePage.isMoneyMarketSectionVisible();
  expect(isMoneyMarketVisible).toBeTruthy();
});

Then('the Money Market section displays the accumulated monetary value on the right side', async function () {
  const accumulatedValue = await contractValuePage.getMoneyMarketAccumulatedValue();
  expect(accumulatedValue).not.toBeNull();
  expect(accumulatedValue).toMatch(/^\$[\d,]+(\.\d{2})?$/);
});