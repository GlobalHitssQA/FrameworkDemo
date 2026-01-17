const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in the system', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.performLogin();
});

Given('different contract types are available for consultation', async function () {
  await contractBreakdownPage.verifyContractsAvailable();
});

When('the user selects a Casa de Bolsa contract and clicks on total value', async function () {
  await contractBreakdownPage.selectCasaDeBolsaContract();
  await contractBreakdownPage.clickTotalValue();
});

Then('the breakdown displays Poder de compra MXN and Efectivo USD', async function () {
  const poderCompraVisible = await contractBreakdownPage.isPoderDeCompraMXNVisible();
  const efectivoUSDVisible = await contractBreakdownPage.isEfectivoUSDVisible();
  expect(poderCompraVisible).toBeTruthy();
  expect(efectivoUSDVisible).toBeTruthy();
});

Then('the breakdown does not display Efectivo MXN', async function () {
  const efectivoMXNVisible = await contractBreakdownPage.isEfectivoMXNVisible();
  expect(efectivoMXNVisible).toBeFalsy();
});

When('the user selects a Banco Persona Fisica contract without Mexdolar account', async function () {
  await contractBreakdownPage.closeBreakdownPopup();
  await contractBreakdownPage.selectBancoPersonaFisicaContract();
  await contractBreakdownPage.clickTotalValue();
});

Then('the breakdown displays Efectivo MXN', async function () {
  const efectivoMXNVisible = await contractBreakdownPage.isEfectivoMXNVisible();
  expect(efectivoMXNVisible).toBeTruthy();
});

Then('the breakdown does not display Efectivo USD', async function () {
  const efectivoUSDVisible = await contractBreakdownPage.isEfectivoUSDVisible();
  expect(efectivoUSDVisible).toBeFalsy();
});

When('the user selects a Banco Persona Moral contract with Mexdolar account', async function () {
  await contractBreakdownPage.closeBreakdownPopup();
  await contractBreakdownPage.selectBancoPersonaMoralContract();
  await contractBreakdownPage.clickTotalValue();
});

Then('the breakdown displays both Efectivo MXN and Efectivo USD with their values', async function () {
  const efectivoMXNVisible = await contractBreakdownPage.isEfectivoMXNVisible();
  const efectivoUSDVisible = await contractBreakdownPage.isEfectivoUSDVisible();
  const efectivoMXNValue = await contractBreakdownPage.getEfectivoMXNValue();
  const efectivoUSDValue = await contractBreakdownPage.getEfectivoUSDValue();
  expect(efectivoMXNVisible).toBeTruthy();
  expect(efectivoUSDVisible).toBeTruthy();
  expect(efectivoMXNValue).not.toBe('');
  expect(efectivoUSDValue).not.toBe('');
});

When('the user verifies Efectivo en transito section for Banco contracts', async function () {
  await contractBreakdownPage.closeBreakdownPopup();
  await contractBreakdownPage.selectBancoPersonaFisicaContract();
  await contractBreakdownPage.clickTotalValue();
});

Then('Efectivo en transito appears only for Banco contracts', async function () {
  const efectivoTransitoVisible = await contractBreakdownPage.isEfectivoEnTransitoVisible();
  expect(efectivoTransitoVisible).toBeTruthy();
});

Then('Efectivo en transito does not appear for Casa de Bolsa contracts', async function () {
  await contractBreakdownPage.closeBreakdownPopup();
  await contractBreakdownPage.selectCasaDeBolsaContract();
  await contractBreakdownPage.clickTotalValue();
  const efectivoTransitoVisible = await contractBreakdownPage.isEfectivoEnTransitoVisible();
  expect(efectivoTransitoVisible).toBeFalsy();
});

When('the user verifies Poder de compra MXN section visibility', async function () {
  await contractBreakdownPage.closeBreakdownPopup();
});

Then('Poder de compra MXN appears only for Casa de Bolsa contracts', async function () {
  await contractBreakdownPage.selectCasaDeBolsaContract();
  await contractBreakdownPage.clickTotalValue();
  const poderCompraVisible = await contractBreakdownPage.isPoderDeCompraMXNVisible();
  expect(poderCompraVisible).toBeTruthy();
});

Then('Poder de compra MXN does not appear for Banco contracts', async function () {
  await contractBreakdownPage.closeBreakdownPopup();
  await contractBreakdownPage.selectBancoPersonaFisicaContract();
  await contractBreakdownPage.clickTotalValue();
  const poderCompraVisible = await contractBreakdownPage.isPoderDeCompraMXNVisible();
  expect(poderCompraVisible).toBeFalsy();
});