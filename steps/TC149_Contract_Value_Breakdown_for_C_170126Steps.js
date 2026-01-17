const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToLogin();
  await contractBreakdownPage.login(process.env.TEST_USER, process.env.TEST_PASSWORD);
  const isMainScreenVisible = await contractBreakdownPage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a Casa de Bolsa contract', async function () {
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.selectCasaDeBolsaContract();
  const isTotalValueComponentVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isTotalValueComponentVisible).toBeTruthy();
});

When('the user clicks on the total value component to open the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
  const isBreakdownPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isBreakdownPopupVisible).toBeTruthy();
});

Then('the item Efectivo en transito should not be displayed', async function () {
  const isEfectivoEnTransitoVisible = await contractBreakdownPage.isItemVisible('Efectivo en tránsito');
  expect(isEfectivoEnTransitoVisible).toBeFalsy();
});

Then('the item Poder de compra MXN should be displayed', async function () {
  const isPoderDeCompraMXNVisible = await contractBreakdownPage.isItemVisible('Poder de compra MXN');
  expect(isPoderDeCompraMXNVisible).toBeTruthy();
});

Then('only Casa de Bolsa applicable items should be shown', async function () {
  const breakdownItems = await contractBreakdownPage.getBreakdownItemsList();
  const casaDeBolsaValidItems = [
    'Poder de compra MXN',
    'Efectivo MXN',
    'Efectivo USD',
    'Pendientes por liquidar',
    'Fondos',
    'Cedes y pagarés',
    'Mercado de dinero',
    'Mercado de capitales'
  ];
  const bankOnlyItems = ['Efectivo en tránsito'];
  
  for (const item of breakdownItems) {
    const isBankOnlyItem = bankOnlyItems.some(bankItem => item.includes(bankItem));
    expect(isBankOnlyItem).toBeFalsy();
  }
});