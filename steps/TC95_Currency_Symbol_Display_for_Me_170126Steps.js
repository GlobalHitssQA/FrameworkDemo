const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('the user has a contract with values in Mexican pesos', async function () {
  await contractBreakdownPage.verifyContractWithMXNValuesExists();
});

When('the user selects a contract containing MXN values', async function () {
  await contractBreakdownPage.selectContractWithMXNValues();
});

Then('the system loads the contract and displays the total value component', async function () {
  const isVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total value component to expand the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the popup displays all applicable contract items', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  const hasItems = await contractBreakdownPage.hasBreakdownItems();
  expect(hasItems).toBe(true);
});

Then('all MXN values display the dollar sign symbol before the amount', async function () {
  const mxnItemsHaveCorrectSymbol = await contractBreakdownPage.verifyMXNValuesHavePesoSymbol();
  expect(mxnItemsHaveCorrectSymbol).toBe(true);
});

Then('the currency symbol is consistent across all peso-denominated items', async function () {
  const pesoItems = [
    'Poder de compra MXN',
    'Efectivo MXN',
    'Pendientes por liquidar',
    'Fondos de deuda',
    'Fondos de cobertura',
    'Fondos de renta variable',
    'Cedes y pagarés',
    'Mercado de dinero',
    'Mercado de capitales'
  ];
  const allItemsConsistent = await contractBreakdownPage.verifyCurrencySymbolConsistency(pesoItems);
  expect(allItemsConsistent).toBe(true);
});