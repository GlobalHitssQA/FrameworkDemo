const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractCompositionPage = require('../pages/ContractCompositionPage');

let contractPage;

Given('I am authenticated in Acticenter', async function () {
  contractPage = new ContractCompositionPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.waitForAuthentication();
});

Given('I have a Casa de Bolsa contract or Banco Persona Moral contract with Mexdolar account', async function () {
  const hasValidContract = await contractPage.verifyContractWithUSDAvailable();
  expect(hasValidContract).toBeTruthy();
});

When('I select the contract with USD balance', async function () {
  await contractPage.selectContractWithUSDBalance();
});

Then('the contract value and composition component is displayed', async function () {
  const isVisible = await contractPage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('I click on the component to expand the breakdown', async function () {
  await contractPage.clickContractValueComponent();
});

Then('the popup displays the breakdown with all items including Efectivo USD', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  
  const hasEfectivoUSD = await contractPage.isEfectivoUSDItemVisible();
  expect(hasEfectivoUSD).toBeTruthy();
});

Then('the Efectivo USD item displays the dollar symbol before the value', async function () {
  const efectivoUSDValue = await contractPage.getEfectivoUSDValue();
  const hasDollarSymbol = efectivoUSDValue.includes('$');
  expect(hasDollarSymbol).toBeTruthy();
  
  const dollarSymbolPosition = efectivoUSDValue.indexOf('$');
  const firstDigitPosition = efectivoUSDValue.search(/\d/);
  expect(dollarSymbolPosition).toBeLessThan(firstDigitPosition);
});

Then('the Efectivo USD item is clearly distinguishable from Efectivo MXN by its label', async function () {
  const usdLabel = await contractPage.getEfectivoUSDLabel();
  const mxnLabel = await contractPage.getEfectivoMXNLabel();
  
  expect(usdLabel).toContain('USD');
  expect(mxnLabel).toContain('MXN');
  expect(usdLabel).not.toEqual(mxnLabel);
});

Then('the monetary format is consistent with standards', async function () {
  const efectivoUSDValue = await contractPage.getEfectivoUSDValue();
  const monetaryFormatRegex = /^\$[\d,]+\.\d{2}$/;
  const valueOnly = efectivoUSDValue.replace(/[^$\d,.]/g, '');
  expect(monetaryFormatRegex.test(valueOnly)).toBeTruthy();
});