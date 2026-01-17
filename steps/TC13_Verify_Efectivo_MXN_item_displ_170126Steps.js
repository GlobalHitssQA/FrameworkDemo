const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyMainScreenDisplayed();
});

When('the user selects a Banco Persona Moral contract from the contract selector', async function () {
  await contractBreakdownPage.openContractSelector();
  await contractBreakdownPage.selectBancoPersonaMoralContract();
});

Then('the system displays the total contract value component', async function () {
  const isVisible = await contractBreakdownPage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Efectivo MXN item is visible in the breakdown list with its monetary value', async function () {
  const isEfectivoMXNVisible = await contractBreakdownPage.isEfectivoMXNItemVisible();
  expect(isEfectivoMXNVisible).toBeTruthy();
  const hasMonetaryValue = await contractBreakdownPage.efectivoMXNHasMonetaryValue();
  expect(hasMonetaryValue).toBeTruthy();
});

Then('the Poder de compra MXN item is not visible in the breakdown list', async function () {
  const isPoderCompraMXNVisible = await contractBreakdownPage.isPoderCompraMXNItemVisible();
  expect(isPoderCompraMXNVisible).toBeFalsy();
});