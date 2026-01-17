const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with valid credentials', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToLogin();
  await contractValuePage.login(process.env.ACTICENTER_USER, process.env.ACTICENTER_PASSWORD);
  await contractValuePage.verifyMainScreenDisplayed();
});

When('the user selects a contract containing capital market investments', async function () {
  await contractValuePage.searchContract(process.env.CONTRACT_WITH_CAPITAL_MARKET);
  await contractValuePage.selectContractFromResults();
  await contractValuePage.verifyContractLoaded();
  await contractValuePage.verifyTotalValueComponentDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the system displays the breakdown popup with contract value details', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Capital Market section shows the correct accumulated monetary value aligned to the right', async function () {
  const capitalMarketValue = await contractValuePage.getCapitalMarketValue();
  expect(capitalMarketValue).not.toBeNull();
  expect(capitalMarketValue).toMatch(/^\$[\d,]+\.\d{2}$/);
  
  const isAlignedRight = await contractValuePage.isCapitalMarketValueAlignedRight();
  expect(isAlignedRight).toBeTruthy();
});