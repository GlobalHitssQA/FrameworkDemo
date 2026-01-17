const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

When('the user selects a Casa de Bolsa contract', async function () {
  await contractBreakdownPage.selectCasaDeBolsaContract();
});

Then('the system loads the Casa de Bolsa contract information', async function () {
  const isLoaded = await contractBreakdownPage.isContractInformationLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the system displays the popup with the items breakdown', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the item Poder de compra MXN is visible in the breakdown', async function () {
  const isVisible = await contractBreakdownPage.isPoderDeCompraMXNVisible();
  expect(isVisible).toBeTruthy();
});

Then('the item Efectivo MXN is not visible for Casa de Bolsa', async function () {
  const isVisible = await contractBreakdownPage.isEfectivoMXNVisible();
  expect(isVisible).toBeFalsy();
});

When('the user selects a Banco contract', async function () {
  await contractBreakdownPage.closeBreakdownPopup();
  await contractBreakdownPage.selectBancoContract();
});

Then('the item Efectivo MXN is visible in the breakdown', async function () {
  const isVisible = await contractBreakdownPage.isEfectivoMXNVisible();
  expect(isVisible).toBeTruthy();
});

Then('the item Poder de compra MXN is not visible for Banco', async function () {
  const isVisible = await contractBreakdownPage.isPoderDeCompraMXNVisible();
  expect(isVisible).toBeFalsy();
});