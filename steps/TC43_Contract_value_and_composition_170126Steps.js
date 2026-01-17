const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractCompositionPage = require('../pages/ContractCompositionPage');

let contractPage;

Given('the user is authenticated in Acticenter with Banca Privada profile', async function () {
  contractPage = new ContractCompositionPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.loginWithBancaPrivadaCredentials();
  const isLoggedIn = await contractPage.isMainScreenDisplayed();
  expect(isLoggedIn).toBeTruthy();
});

When('the user selects a Persona Moral contract from Banca Privada', async function () {
  await contractPage.openContractSearch();
  await contractPage.selectPersonaMoralContract();
});

Then('the contract value and composition component is displayed', async function () {
  const isComponentVisible = await contractPage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the total contract value is shown with the review date', async function () {
  const totalValue = await contractPage.getTotalContractValue();
  expect(totalValue).not.toBeNull();
  const reviewDate = await contractPage.getReviewDate();
  expect(reviewDate).not.toBeNull();
});

When('the user clicks on the component to expand the breakdown', async function () {
  await contractPage.clickContractValueComponent();
});

Then('a popup with detailed breakdown is displayed', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('all applicable sections for Persona Moral are visible including cash MXN and USD and pending settlements and debt funds and hedge funds and equity funds and cash in transit and certificates and money market and capital market', async function () {
  const isCashMXNVisible = await contractPage.isSectionVisible('cashMXN');
  expect(isCashMXNVisible).toBeTruthy();
  
  const isCashUSDVisible = await contractPage.isSectionVisible('cashUSD');
  expect(isCashUSDVisible).toBeTruthy();
  
  const isPendingSettlementsVisible = await contractPage.isSectionVisible('pendingSettlements');
  expect(isPendingSettlementsVisible).toBeTruthy();
  
  const isDebtFundsVisible = await contractPage.isSectionVisible('debtFunds');
  expect(isDebtFundsVisible).toBeTruthy();
  
  const isHedgeFundsVisible = await contractPage.isSectionVisible('hedgeFunds');
  expect(isHedgeFundsVisible).toBeTruthy();
  
  const isEquityFundsVisible = await contractPage.isSectionVisible('equityFunds');
  expect(isEquityFundsVisible).toBeTruthy();
  
  const isCashInTransitVisible = await contractPage.isSectionVisible('cashInTransit');
  expect(isCashInTransitVisible).toBeTruthy();
  
  const isCertificatesVisible = await contractPage.isSectionVisible('certificates');
  expect(isCertificatesVisible).toBeTruthy();
  
  const isMoneyMarketVisible = await contractPage.isSectionVisible('moneyMarket');
  expect(isMoneyMarketVisible).toBeTruthy();
  
  const isCapitalMarketVisible = await contractPage.isSectionVisible('capitalMarket');
  expect(isCapitalMarketVisible).toBeTruthy();
});