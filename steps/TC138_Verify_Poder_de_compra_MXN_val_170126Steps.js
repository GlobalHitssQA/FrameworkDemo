const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ModuloAsesorPage = require('../pages/ModuloAsesorPage');
const ActicenterPage = require('../pages/ActicenterPage');

setDefaultTimeout(60000);

let moduloAsesorPage;
let acticenterPage;
let currentCashValue;
let contractNumber;

Given('I am authenticated in Modulo Asesor', async function () {
  moduloAsesorPage = new ModuloAsesorPage(this.page);
  await moduloAsesorPage.navigate();
  await moduloAsesorPage.waitForPageLoad();
});

Given('I query a Casa de Bolsa contract and note the currentcash value', async function () {
  contractNumber = await moduloAsesorPage.selectCasaDeBolsaContract();
  currentCashValue = await moduloAsesorPage.getCurrentCashValue();
  expect(currentCashValue).not.toBeNull();
});

When('I open Acticenter and select the same Casa de Bolsa contract', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigate();
  await acticenterPage.waitForPageLoad();
  await acticenterPage.searchContract(contractNumber);
  await acticenterPage.selectContract(contractNumber);
});

When('I click on the contract value component to display the breakdown', async function () {
  await acticenterPage.clickContractValueComponent();
  await acticenterPage.waitForBreakdownPopup();
});

Then('the Poder de compra MXN value in Acticenter should match the currentcash value from Modulo Asesor', async function () {
  const poderDeCompraMXN = await acticenterPage.getPoderDeCompraMXNValue();
  const normalizedActicenterValue = acticenterPage.normalizeMonetaryValue(poderDeCompraMXN);
  const normalizedModuloAsesorValue = moduloAsesorPage.normalizeMonetaryValue(currentCashValue);
  expect(normalizedActicenterValue).toBe(normalizedModuloAsesorValue);
});