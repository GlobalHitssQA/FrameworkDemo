const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let poderDeCompraMXNValue;
let currentCashValue;

Given('the user is authenticated in Acticenter', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenDisplayed();
});

When('the user selects a Casa de Bolsa contract', async function () {
  await acticenterPage.selectCasaDeBolsaContract();
});

Then('the total contract value component is displayed', async function () {
  const isVisible = await acticenterPage.isTotalContractValueVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total value component to expand breakdown', async function () {
  await acticenterPage.clickTotalValueComponent();
});

Then('the breakdown popup is displayed', async function () {
  const isVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isVisible).toBeTruthy();
});

Then('the Poder de compra MXN field is visible with its monetary value', async function () {
  const isVisible = await acticenterPage.isPoderDeCompraMXNVisible();
  expect(isVisible).toBeTruthy();
  poderDeCompraMXNValue = await acticenterPage.getPoderDeCompraMXNValue();
  expect(poderDeCompraMXNValue).toBeTruthy();
});

When('the user retrieves the currentcash value from Modulo Asesor', async function () {
  currentCashValue = await acticenterPage.getCurrentCashFromModuloAsesor();
  expect(currentCashValue).toBeTruthy();
});

Then('the Poder de compra MXN value matches the currentcash value exactly', async function () {
  const normalizedPoderDeCompra = acticenterPage.normalizeMonetaryValue(poderDeCompraMXNValue);
  const normalizedCurrentCash = acticenterPage.normalizeMonetaryValue(currentCashValue);
  expect(normalizedPoderDeCompra).toBe(normalizedCurrentCash);
});