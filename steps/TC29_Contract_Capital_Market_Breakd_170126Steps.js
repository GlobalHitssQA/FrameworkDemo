const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.login();
});

Given('the user has selected a contract with capital market investments', async function () {
  await contractBreakdownPage.selectContractWithCapitalMarketInvestments();
  const isContractDisplayed = await contractBreakdownPage.isContractValueComponentVisible();
  expect(isContractDisplayed).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the contract value breakdown popup is displayed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Capital Market section is visible in the breakdown list', async function () {
  const isCapitalMarketVisible = await contractBreakdownPage.isCapitalMarketSectionVisible();
  expect(isCapitalMarketVisible).toBeTruthy();
});

Then('the Capital Market section displays the accumulated monetary value on the right side', async function () {
  const accumulatedValue = await contractBreakdownPage.getCapitalMarketAccumulatedValue();
  expect(accumulatedValue).not.toBeNull();
  expect(accumulatedValue).toMatch(/^\$[\d,]+(\.\d{2})?$/);
});