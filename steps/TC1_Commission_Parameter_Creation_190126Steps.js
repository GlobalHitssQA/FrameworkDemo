const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProductConfigurationPage = require('../pages/ProductConfigurationPage');

let productConfigPage;

Given('I am authenticated as an administrator and on the Product Configuration screen', async function () {
  productConfigPage = new ProductConfigurationPage(this.page);
  await productConfigPage.navigateToProductConfiguration();
  await productConfigPage.verifyCommissionParametersSectionVisible();
});

When('I select the payments module from the dropdown', async function () {
  await productConfigPage.selectModule('Pagos');
});

When('I click on the Create Parameter button in the Commission Parameters section', async function () {
  await productConfigPage.clickCreateParameterButton();
});

Then('I should see the New Parameter modal with all required fields', async function () {
  const isModalVisible = await productConfigPage.isNewParameterModalVisible();
  expect(isModalVisible).toBeTruthy();
  await productConfigPage.verifyModalFieldsPresent();
});

When('I select an existing commission type from the dropdown', async function () {
  await productConfigPage.selectCommissionType();
});

When('I select a charge type from the dropdown', async function () {
  await productConfigPage.selectChargeType();
});

When('I enter a valid numeric value in the Value field', async function () {
  await productConfigPage.enterValue('10.5');
});

When('I select a valid date in the Commission Start calendar', async function () {
  await productConfigPage.selectCommissionStartDate();
});

Then('the Accept button should be enabled', async function () {
  const isEnabled = await productConfigPage.isAcceptButtonEnabled();
  expect(isEnabled).toBeTruthy();
});

When('I click on the Accept button', async function () {
  await productConfigPage.clickAcceptButton();
});

Then('the modal should close and the new parameter should appear in the Commission Parameters table', async function () {
  await productConfigPage.waitForModalToClose();
  const isParameterInTable = await productConfigPage.isNewParameterInTable();
  expect(isParameterInTable).toBeTruthy();
});