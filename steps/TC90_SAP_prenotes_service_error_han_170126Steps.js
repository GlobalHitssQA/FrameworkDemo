const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the SAP prenotes service is unavailable', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.simulateSAPPrenotesServiceFailure();
});

Given('the user is authenticated in Acticenter', async function () {
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

When('the user selects a Bank contract that normally has cash in transit', async function () {
  await contractValuePage.openContractSearch();
  await contractValuePage.selectBankContractWithCashInTransit();
});

Then('the total contract value component loads with partial error for cash in transit', async function () {
  const isComponentLoaded = await contractValuePage.isContractValueComponentVisible();
  expect(isComponentLoaded).toBeTruthy();
  const hasPartialError = await contractValuePage.hasCashInTransitErrorIndicator();
  expect(hasPartialError).toBeTruthy();
});

When('the user opens the breakdown popup', async function () {
  await contractValuePage.openBreakdownPopup();
});

Then('the cash in transit field shows zero or error message', async function () {
  const cashInTransitValue = await contractValuePage.getCashInTransitValue();
  const isZeroOrError = cashInTransitValue === '$0.00' || 
                        cashInTransitValue.includes('error') || 
                        cashInTransitValue.includes('no disponible') ||
                        cashInTransitValue === '--';
  expect(isZeroOrError).toBeTruthy();
});

Then('all other breakdown fields display their correct values', async function () {
  const isCashMXNVisible = await contractValuePage.isCashMXNFieldVisible();
  const isCashUSDVisible = await contractValuePage.isCashUSDFieldVisible();
  const isFundsVisible = await contractValuePage.isFundsFieldVisible();
  const isPendingSettlementVisible = await contractValuePage.isPendingSettlementFieldVisible();
  const isPurchasingPowerVisible = await contractValuePage.isPurchasingPowerFieldVisible();
  
  expect(isCashMXNVisible).toBeTruthy();
  expect(isCashUSDVisible).toBeTruthy();
  expect(isFundsVisible).toBeTruthy();
  expect(isPendingSettlementVisible).toBeTruthy();
  expect(isPurchasingPowerVisible).toBeTruthy();
  
  const cashMXNValue = await contractValuePage.getCashMXNValue();
  const cashUSDValue = await contractValuePage.getCashUSDValue();
  expect(cashMXNValue).not.toContain('error');
  expect(cashUSDValue).not.toContain('error');
});