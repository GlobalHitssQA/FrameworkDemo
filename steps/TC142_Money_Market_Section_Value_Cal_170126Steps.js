const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with valid credentials', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToLogin();
  await contractValuePage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
  const isMainScreenVisible = await contractValuePage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a contract that contains money market investments', async function () {
  await contractValuePage.openContractSearch();
  await contractValuePage.searchContract(process.env.MONEY_MARKET_CONTRACT_ID);
  await contractValuePage.selectFirstContractResult();
  const isTotalValueComponentVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isTotalValueComponentVisible).toBeTruthy();
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await contractValuePage.clickTotalValueComponent();
  const isBreakdownPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isBreakdownPopupVisible).toBeTruthy();
});

Then('the Money Market section should display the correct accumulated monetary value on the right side', async function () {
  const isMoneyMarketSectionVisible = await contractValuePage.isMoneyMarketSectionVisible();
  expect(isMoneyMarketSectionVisible).toBeTruthy();
  
  const moneyMarketValue = await contractValuePage.getMoneyMarketAccumulatedValue();
  expect(moneyMarketValue).not.toBeNull();
  expect(moneyMarketValue).toMatch(/^\$[\d,]+(\.\d{2})?$/);
});