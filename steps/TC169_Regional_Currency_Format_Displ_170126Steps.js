const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RegionalCurrencyPage = require('../pages/RegionalCurrencyPage');

let regionalCurrencyPage;

Given('the user is authenticated in Acticenter with Mexico regional configuration', async function () {
  regionalCurrencyPage = new RegionalCurrencyPage(this.page);
  await regionalCurrencyPage.navigateToActicenter();
  await regionalCurrencyPage.verifyMexicoRegionalInterface();
});

When('the user selects a contract and expands the value and composition breakdown', async function () {
  await regionalCurrencyPage.selectActiveContract();
  await regionalCurrencyPage.expandValueCompositionBreakdown();
});

Then('all amounts should display correct Mexican format with peso symbol and proper separators', async function () {
  const isValidFormat = await regionalCurrencyPage.verifyMexicanCurrencyFormat();
  expect(isValidFormat).toBeTruthy();
});

Then('MXN amounts should show {string} symbol and USD amounts should show {string} identifier', async function (pesoSymbol, usdIdentifier) {
  const mxnSymbolCorrect = await regionalCurrencyPage.verifyMXNSymbol(pesoSymbol);
  const usdIdentifierCorrect = await regionalCurrencyPage.verifyUSDIdentifier(usdIdentifier);
  expect(mxnSymbolCorrect).toBeTruthy();
  expect(usdIdentifierCorrect).toBeTruthy();
});

When('the user changes the browser regional configuration to a different locale', async function () {
  await regionalCurrencyPage.changeRegionalConfiguration();
});

Then('the system should update amount display format according to new regional configuration', async function () {
  const formatUpdated = await regionalCurrencyPage.verifyRegionalFormatUpdate();
  expect(formatUpdated).toBeTruthy();
});

Then('all decimal and thousand separators should adjust to the new configuration maintaining readability', async function () {
  const separatorsCorrect = await regionalCurrencyPage.verifySeparatorsAdjusted();
  expect(separatorsCorrect).toBeTruthy();
});