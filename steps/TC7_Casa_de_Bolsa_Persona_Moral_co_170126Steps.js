const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.login();
});

Given('a Casa de Bolsa Persona Moral contract is active', async function () {
  await contractBreakdownPage.verifyCasaDeBolsaPersonaMoralContractExists();
});

When('the user selects a Casa de Bolsa Persona Moral contract', async function () {
  await contractBreakdownPage.selectCasaDeBolsaPersonaMoralContract();
});

Then('the system displays the operation screen with the selected contract', async function () {
  const isDisplayed = await contractBreakdownPage.isOperationScreenDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays the breakdown popup with contract items', async function () {
  const isVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isVisible).toBeTruthy();
});

Then('the Poder de compra MXN item is visible in the breakdown list', async function () {
  const isVisible = await contractBreakdownPage.isPoderDeCompraMXNVisible();
  expect(isVisible).toBeTruthy();
});

Then('the Poder de compra MXN value is displayed on the right side', async function () {
  const hasValue = await contractBreakdownPage.hasPoderDeCompraMXNValue();
  expect(hasValue).toBeTruthy();
});

Then('the Poder de compra MXN value matches the currentcash value from Modulo Asesor', async function () {
  const poderDeCompraValue = await contractBreakdownPage.getPoderDeCompraMXNValue();
  const currentCashValue = await contractBreakdownPage.getCurrentCashFromModuloAsesor();
  expect(poderDeCompraValue).toEqual(currentCashValue);
});