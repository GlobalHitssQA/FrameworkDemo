const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const ProductParameterPage = require('../pages/ProductParameterPage');

let browser;
let page;
let productParameterPage;

Given('the user is on the product parameter configuration page', async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  productParameterPage = new ProductParameterPage(page);
  await productParameterPage.navigate();
});

When('the user selects a module from the dropdown', async function () {
  await productParameterPage.selectModule('Módulo de prueba');
});

When('the user clicks the create parameter button', async function () {
  await productParameterPage.clickCreateParameter();
});

When('the user fills in the new parameter form with valid data', async function () {
  await productParameterPage.fillCommissionType('Comisión estándar');
  await productParameterPage.fillChargeType('Porcentaje');
  await productParameterPage.fillValue('5');
  await productParameterPage.fillCommissionStartDate('2026-03-01');
});

When('the user confirms the new parameter creation', async function () {
  await productParameterPage.clickAcceptButton();
});

Then('the new parameter should be displayed in the parameters list', async function () {
  const isVisible = await productParameterPage.isParameterVisible('Comisión estándar');
  if (!isVisible) {
    throw new Error('The new parameter is not visible in the parameters list');
  }
  await browser.close();
});