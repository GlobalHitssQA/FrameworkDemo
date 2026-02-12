const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProductConfigurationPage = require('../pages/ProductConfigurationPage');

let productConfigPage;

Given('the user is authenticated as PASE Administrator and on the product configuration screen', async function () {
  productConfigPage = new ProductConfigurationPage(this.page);
  await productConfigPage.navigateToProductConfiguration();
});

When('the user navigates to the commission parameters section', async function () {
  await productConfigPage.navigateToCommissionParametersSection();
});

Then('the Create parameter button should be visible', async function () {
  const isVisible = await productConfigPage.isCreateParameterButtonVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks the Create parameter button', async function () {
  await productConfigPage.clickCreateParameterButton();
});

Then('a modal with title New Parameter should be displayed', async function () {
  const isVisible = await productConfigPage.isNewParameterModalVisible();
  expect(isVisible).toBeTruthy();
  const title = await productConfigPage.getModalTitle();
  expect(title).toContain('Nuevo Parámetro');
});

Then('the modal should contain Commission type, Charge type, Value and Commission start date fields', async function () {
  const areFieldsVisible = await productConfigPage.areModalFieldsVisible();
  expect(areFieldsVisible).toBeTruthy();
});

When('the user selects an existing commission type from the dropdown', async function () {
  await productConfigPage.selectCommissionType();
});

Then('the selected value should be displayed in the Commission type field', async function () {
  const hasValue = await productConfigPage.hasCommissionTypeValue();
  expect(hasValue).toBeTruthy();
});

When('the user selects a charge type from the dropdown', async function () {
  await productConfigPage.selectChargeType();
});

Then('the selected value should be displayed in the Charge type field', async function () {
  const hasValue = await productConfigPage.hasChargeTypeValue();
  expect(hasValue).toBeTruthy();
});

When('the user enters a valid numeric value in the Value field', async function () {
  await productConfigPage.enterValue('100');
});

Then('the entered value should be displayed in the Value field', async function () {
  const value = await productConfigPage.getValueFieldContent();
  expect(value).toBe('100');
});

When('the user selects a date from the Commission start date calendar', async function () {
  await productConfigPage.selectCommissionStartDate();
});

Then('the selected date should be displayed in the Commission start date field', async function () {
  const hasDate = await productConfigPage.hasCommissionStartDateValue();
  expect(hasDate).toBeTruthy();
});

When('the user clicks the Accept button', async function () {
  await productConfigPage.clickAcceptButton();
});

Then('the modal should close', async function () {
  const isHidden = await productConfigPage.isModalClosed();
  expect(isHidden).toBeTruthy();
});

Then('the new parameter should be displayed in the Commission parameters table', async function () {
  const isDisplayed = await productConfigPage.isNewParameterInTable();
  expect(isDisplayed).toBeTruthy();
});