const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated and viewing Acticenter in Responsive Landscape resolution', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.setViewportToResponsiveLandscape();
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyActicenterInterfaceIsDisplayed();
});

When('the user selects a valid contract from the client or contract search', async function () {
  await contractValuePage.clickSearchButton();
  await contractValuePage.searchAndSelectContract();
});

Then('the system displays the total contract value component on the screen', async function () {
  const isVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the system displays the breakdown with all applicable items aligned vertically with the component', async function () {
  const isBreakdownVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBeTruthy();
  
  const isPurchasingPowerMXNVisible = await contractValuePage.isPurchasingPowerMXNVisible();
  expect(isPurchasingPowerMXNVisible).toBeTruthy();
  
  const isCashMXNVisible = await contractValuePage.isCashMXNVisible();
  expect(isCashMXNVisible).toBeTruthy();
  
  const isCashUSDVisible = await contractValuePage.isCashUSDVisible();
  expect(isCashUSDVisible).toBeTruthy();
  
  const isPendingSettlementVisible = await contractValuePage.isPendingSettlementVisible();
  expect(isPendingSettlementVisible).toBeTruthy();
  
  const isDebtFundsVisible = await contractValuePage.isDebtFundsVisible();
  expect(isDebtFundsVisible).toBeTruthy();
  
  const isHedgeFundsVisible = await contractValuePage.isHedgeFundsVisible();
  expect(isHedgeFundsVisible).toBeTruthy();
  
  const isEquityFundsVisible = await contractValuePage.isEquityFundsVisible();
  expect(isEquityFundsVisible).toBeTruthy();
  
  const isCedesAndPromissoryNotesVisible = await contractValuePage.isCedesAndPromissoryNotesVisible();
  expect(isCedesAndPromissoryNotesVisible).toBeTruthy();
  
  const isMoneyMarketVisible = await contractValuePage.isMoneyMarketVisible();
  expect(isMoneyMarketVisible).toBeTruthy();
  
  const isCapitalMarketVisible = await contractValuePage.isCapitalMarketVisible();
  expect(isCapitalMarketVisible).toBeTruthy();
});