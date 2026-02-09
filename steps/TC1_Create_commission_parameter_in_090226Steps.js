const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProductConfigurationPage = require('../pages/ProductConfigurationPage');

let productConfigPage;

Given('the user is authenticated as Administrator in PASE', async function () {
  productConfigPage = new ProductConfigurationPage(this.page);
  await productConfigPage.navigateToLogin();
  await productConfigPage.loginAsAdmin();
});

Given('the user is on the Product Configuration screen in the Payments Module', async function () {
  await productConfigPage.navigateToProductConfiguration();
});

Given('a module is selected in the modules dropdown', async function () {
  await productConfigPage.selectModule();
});

When('the user navigates to the Commission Parameters section', async function () {
  await productConfigPage.navigateToCommissionParametersSection();
});

Then('the Create Parameter button should be visible', async function () {
  const isVisible = await productConfigPage.isCreateParameterButtonVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks the Create Parameter button', async function () {
  await productConfigPage.clickCreateParameterButton();
});

Then('a modal with title New Parameter should be displayed', async function () {
  const isVisible = await productConfigPage.isNewParameterModalVisible();
  expect(isVisible).toBeTruthy();
  const title = await productConfigPage.getModalTitle();
  expect(title).toContain('Nuevo Parámetro');
});

Then('the modal should contain Commission Type field', async function () {
  const isVisible = await productConfigPage.isCommissionTypeFieldVisible();
  expect(isVisible).toBeTruthy();
});

Then('the modal should contain Charge Type field', async function () {
  const isVisible = await productConfigPage.isChargeTypeFieldVisible();
  expect(isVisible).toBeTruthy();
});

Then('the modal should contain Value field', async function () {
  const isVisible = await productConfigPage.isValueFieldVisible();
  expect(isVisible).toBeTruthy();
});

Then('the modal should contain Commission Start Date field', async function () {
  const isVisible = await productConfigPage.isCommissionStartDateFieldVisible();
  expect(isVisible).toBeTruthy();
});

Then('the Accept button should be disabled', async function () {
  const isDisabled = await productConfigPage.isAcceptButtonDisabled();
  expect(isDisabled).toBeTruthy();
});

When('the user selects a value from the Commission Type dropdown', async function () {
  await productConfigPage.selectCommissionType();
});

Then('the Commission Type field should display the selected value', async function () {
  const hasValue = await productConfigPage.hasCommissionTypeValue();
  expect(hasValue).toBeTruthy();
});

When('the user selects a value from the Charge Type dropdown', async function () {
  await productConfigPage.selectChargeType();
});

Then('the Charge Type field should display the selected value', async function () {
  const hasValue = await productConfigPage.hasChargeTypeValue();
  expect(hasValue).toBeTruthy();
});

When('the user enters a valid numeric value in the Value field', async function () {
  await productConfigPage.enterValue('10.50');
});

Then('the Value field should display the entered value', async function () {
  const value = await productConfigPage.getValueFieldContent();
  expect(value).toBeTruthy();
});

When('the user selects a valid date in the Commission Start Date calendar', async function () {
  await productConfigPage.selectCommissionStartDate();
});

Then('the Commission Start Date field should display the selected date', async function () {
  const hasDate = await productConfigPage.hasCommissionStartDateValue();
  expect(hasDate).toBeTruthy();
});

Then('the Accept button should be enabled', async function () {
  const isEnabled = await productConfigPage.isAcceptButtonEnabled();
  expect(isEnabled).toBeTruthy();
});

When('the user clicks the Accept button', async function () {
  await productConfigPage.clickAcceptButton();
});

Then('the modal should close', async function () {
  const isClosed = await productConfigPage.isModalClosed();
  expect(isClosed).toBeTruthy();
});

Then('the new commission parameter should appear in the Commission Parameters table', async function () {
  const isVisible = await productConfigPage.isNewParameterInTable();
  expect(isVisible).toBeTruthy();
});