const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProductConfigurationPage = require('../pages/ProductConfigurationPage');

let productConfigPage;

Given('the user is authenticated as Administrator in PASE system', async function () {
  productConfigPage = new ProductConfigurationPage(this.page);
  await productConfigPage.loginAsAdministrator();
});

Given('the user navigates to the Create Product section in Product Configuration', async function () {
  await productConfigPage.navigateToProductConfiguration();
  await productConfigPage.navigateToCreateProductSection();
});

When('the user enters an existing product name in the product name field', async function () {
  await productConfigPage.enterProductName('Producto Existente');
});

Then('the error message {string} is displayed in red below the input field', async function (errorMessage) {
  const isErrorVisible = await productConfigPage.isProductNameErrorVisible();
  expect(isErrorVisible).toBeTruthy();
  const errorText = await productConfigPage.getProductNameErrorText();
  expect(errorText).toContain(errorMessage);
  const errorColor = await productConfigPage.getProductNameErrorColor();
  expect(errorColor).toBe('rgb(255, 0, 0)');
});

Then('the Accept button remains disabled', async function () {
  const isDisabled = await productConfigPage.isAcceptButtonDisabled();
  expect(isDisabled).toBeTruthy();
});

When('the user modifies the name to a unique name that does not exist', async function () {
  await productConfigPage.clearProductNameField();
  await productConfigPage.enterProductName('Producto Nuevo Unico ' + Date.now());
});

Then('the error message disappears', async function () {
  const isErrorVisible = await productConfigPage.isProductNameErrorVisible();
  expect(isErrorVisible).toBeFalsy();
});

Then('the Accept button becomes enabled', async function () {
  const isEnabled = await productConfigPage.isAcceptButtonEnabled();
  expect(isEnabled).toBeTruthy();
});

When('the user opens the New Parameter modal to create a new Commission Type', async function () {
  await productConfigPage.clickCreateParameterButton();
  await productConfigPage.waitForNewParameterModal();
  await productConfigPage.clickAddCommissionTypeButton();
});

When('the user enters an existing commission type name', async function () {
  await productConfigPage.enterCommissionTypeName('Tipo Comision Existente');
});

Then('the error message {string} is displayed in red below the commission type field', async function (errorMessage) {
  const isErrorVisible = await productConfigPage.isCommissionTypeErrorVisible();
  expect(isErrorVisible).toBeTruthy();
  const errorText = await productConfigPage.getCommissionTypeErrorText();
  expect(errorText).toContain(errorMessage);
});

Then('the Accept button in the modal remains disabled', async function () {
  const isDisabled = await productConfigPage.isModalAcceptButtonDisabled();
  expect(isDisabled).toBeTruthy();
});