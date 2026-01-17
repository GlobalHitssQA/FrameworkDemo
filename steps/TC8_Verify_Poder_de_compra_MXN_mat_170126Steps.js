const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ModuloAsesorPage = require('../pages/ModuloAsesorPage');
const ActicenterPage = require('../pages/ActicenterPage');

let moduloAsesorPage;
let acticenterPage;
let currentCashValue;
let poderDeCompraMXNValue;

Given('the user is authenticated in Modulo Asesor', async function () {
  moduloAsesorPage = new ModuloAsesorPage(this.page);
  await moduloAsesorPage.navigateToModuloAsesor();
  await moduloAsesorPage.login();
});

Given('the user has access to a specific Casa de Bolsa contract', async function () {
  await moduloAsesorPage.verifyCasaDeBolsaContractAccess();
});

When('the user retrieves the currentcash value from Modulo Asesor', async function () {
  currentCashValue = await moduloAsesorPage.getCurrentCashValue();
});

When('the user navigates to Acticenter', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
});

When('the user selects the same Casa de Bolsa contract', async function () {
  await acticenterPage.searchContract();
  await acticenterPage.selectCasaDeBolsaContract();
});

When('the user expands the total value breakdown popup', async function () {
  await acticenterPage.clickTotalValueComponent();
  await acticenterPage.waitForBreakdownPopup();
});

Then('the Poder de compra MXN value should match exactly the currentcash value from Modulo Asesor', async function () {
  poderDeCompraMXNValue = await acticenterPage.getPoderDeCompraMXNValue();
  expect(poderDeCompraMXNValue).toBe(currentCashValue);
});

Then('when the currentcash value changes in Modulo Asesor the Poder de compra MXN should reflect the updated value', async function () {
  const updatedCurrentCash = await moduloAsesorPage.simulateCurrentCashUpdate();
  await acticenterPage.refreshContractView();
  await acticenterPage.clickTotalValueComponent();
  await acticenterPage.waitForBreakdownPopup();
  const updatedPoderDeCompra = await acticenterPage.getPoderDeCompraMXNValue();
  expect(updatedPoderDeCompra).toBe(updatedCurrentCash);
});