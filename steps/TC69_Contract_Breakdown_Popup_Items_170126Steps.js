const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('the user selects an active contract', async function () {
  await contractBreakdownPage.selectActiveContract();
});

Then('the system displays the contract screen', async function () {
  const isContractScreenVisible = await contractBreakdownPage.isContractScreenVisible();
  expect(isContractScreenVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays the breakdown popup with all items', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the first item is Purchasing Power MXN or Cash MXN depending on contract type', async function () {
  const firstItemText = await contractBreakdownPage.getFirstBreakdownItem();
  const validFirstItems = ['Poder de compra MXN', 'Efectivo MXN'];
  const isValidFirstItem = validFirstItems.some(item => firstItemText.includes(item));
  expect(isValidFirstItem).toBeTruthy();
});

Then('the following items appear in order: Cash USD, Pending settlement, Debt funds, Hedge funds, Equity funds', async function () {
  const expectedOrder = [
    'Efectivo USD',
    'Pendientes por liquidar',
    'Fondos de deuda',
    'Fondos de cobertura',
    'Fondos de renta variable'
  ];
  const isOrderCorrect = await contractBreakdownPage.verifyMiddleItemsOrder(expectedOrder);
  expect(isOrderCorrect).toBeTruthy();
});

Then('the final items are Cedes and promissory notes, Money market, and Capital market', async function () {
  const expectedFinalItems = [
    'Cedes y pagarés',
    'Mercado de dinero',
    'Mercado de capitales'
  ];
  const isFinalOrderCorrect = await contractBreakdownPage.verifyFinalItemsOrder(expectedFinalItems);
  expect(isFinalOrderCorrect).toBeTruthy();
});

Then('all items display their monetary value aligned to the right', async function () {
  const allItemsHaveValues = await contractBreakdownPage.verifyAllItemsHaveMonetaryValues();
  expect(allItemsHaveValues).toBeTruthy();
});