const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');
const ModuloAsesorPage = require('../pages/ModuloAsesorPage');

let acticenterPage;
let moduloAsesorPage;
let acticenterValues = {};
let moduloAsesorValues = {};

Given('the user is authenticated in Acticenter', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigate();
  await acticenterPage.login();
});

Given('the user is authenticated in Modulo Asesor', async function () {
  moduloAsesorPage = new ModuloAsesorPage(this.page);
});

When('the user selects a specific contract in Acticenter', async function () {
  await acticenterPage.openContractSearch();
  await acticenterPage.searchContract(this.testData.contractNumber);
  await acticenterPage.selectContract();
});

Then('the system displays the contract information in Acticenter', async function () {
  const isDisplayed = await acticenterPage.isContractInfoDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('the user expands the contract value breakdown in Acticenter', async function () {
  await acticenterPage.expandContractValueBreakdown();
});

Then('the system displays all items with their corresponding values', async function () {
  const isBreakdownVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBeTruthy();
});

Then('the user records the values including Poder de compra and Efectivo', async function () {
  acticenterValues.poderDeCompra = await acticenterPage.getPoderDeCompraValue();
  acticenterValues.efectivoMXN = await acticenterPage.getEfectivoMXNValue();
  acticenterValues.efectivoUSD = await acticenterPage.getEfectivoUSDValue();
  acticenterValues.fondosDeuda = await acticenterPage.getFondosDeudaValue();
  acticenterValues.fondosCobertura = await acticenterPage.getFondosCoberturaValue();
  acticenterValues.fondosRentaVariable = await acticenterPage.getFondosRentaVariableValue();
  acticenterValues.mercadoDinero = await acticenterPage.getMercadoDineroValue();
  acticenterValues.capitales = await acticenterPage.getCapitalesValue();
  acticenterValues.pendientesLiquidar = await acticenterPage.getPendientesLiquidarValue();
});

When('the user accesses Modulo Asesor with the same contract', async function () {
  await moduloAsesorPage.navigate();
  await moduloAsesorPage.login();
  await moduloAsesorPage.searchContract(this.testData.contractNumber);
  await moduloAsesorPage.selectContract();
});

Then('the system displays the contract information in Modulo Asesor', async function () {
  const isDisplayed = await moduloAsesorPage.isContractInfoDisplayed();
  expect(isDisplayed).toBeTruthy();
  moduloAsesorValues.currentCash = await moduloAsesorPage.getCurrentCashValue();
  moduloAsesorValues.efectivoMXN = await moduloAsesorPage.getEfectivoMXNValue();
  moduloAsesorValues.efectivoUSD = await moduloAsesorPage.getEfectivoUSDValue();
  moduloAsesorValues.fondosDeuda = await moduloAsesorPage.getFondosDeudaValue();
  moduloAsesorValues.fondosCobertura = await moduloAsesorPage.getFondosCoberturaValue();
  moduloAsesorValues.fondosRentaVariable = await moduloAsesorPage.getFondosRentaVariableValue();
  moduloAsesorValues.mercadoDinero = await moduloAsesorPage.getMercadoDineroValue();
  moduloAsesorValues.capitales = await moduloAsesorPage.getCapitalesValue();
  moduloAsesorValues.pendientesLiquidar = await moduloAsesorPage.getPendientesLiquidarValue();
});

Then('the Poder de compra value matches the currentcash field in Modulo Asesor', async function () {
  const acticenterPoderCompra = parseFloat(acticenterValues.poderDeCompra.replace(/[^0-9.-]/g, ''));
  const moduloAsesorCurrentCash = parseFloat(moduloAsesorValues.currentCash.replace(/[^0-9.-]/g, ''));
  expect(acticenterPoderCompra).toEqual(moduloAsesorCurrentCash);
});

Then('all other item values are consistent between both systems', async function () {
  const compareValues = (actiValue, moduloValue, fieldName) => {
    const acti = parseFloat(actiValue.replace(/[^0-9.-]/g, ''));
    const modulo = parseFloat(moduloValue.replace(/[^0-9.-]/g, ''));
    expect(acti).toEqual(modulo);
  };
  compareValues(acticenterValues.efectivoMXN, moduloAsesorValues.efectivoMXN, 'Efectivo MXN');
  compareValues(acticenterValues.efectivoUSD, moduloAsesorValues.efectivoUSD, 'Efectivo USD');
  compareValues(acticenterValues.fondosDeuda, moduloAsesorValues.fondosDeuda, 'Fondos Deuda');
  compareValues(acticenterValues.fondosCobertura, moduloAsesorValues.fondosCobertura, 'Fondos Cobertura');
  compareValues(acticenterValues.fondosRentaVariable, moduloAsesorValues.fondosRentaVariable, 'Fondos Renta Variable');
  compareValues(acticenterValues.mercadoDinero, moduloAsesorValues.mercadoDinero, 'Mercado Dinero');
  compareValues(acticenterValues.capitales, moduloAsesorValues.capitales, 'Capitales');
  compareValues(acticenterValues.pendientesLiquidar, moduloAsesorValues.pendientesLiquidar, 'Pendientes Liquidar');
});