const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProductConfigurationPage = require('../pages/ProductConfigurationPage');

let productConfigPage;

Given('the user is authenticated as PASE Administrator', async function () {
  productConfigPage = new ProductConfigurationPage(this.page);
  await productConfigPage.loginAsAdministrator();
});

Given('the user navigates to the Payments Module', async function () {
  await productConfigPage.navigateToPaymentsModule();
});

When('the user accesses the Product Configuration screen', async function () {
  await productConfigPage.accessProductConfigurationScreen();
});

Then('the module dropdown list should be visible at the top of the screen', async function () {
  const isVisible = await productConfigPage.isModuleDropdownVisible();
  expect(isVisible).toBeTruthy();
});

Then('the product configuration section should be disabled', async function () {
  const isDisabled = await productConfigPage.isProductConfigurationSectionDisabled();
  expect(isDisabled).toBeTruthy();
});

When('the user attempts to configure products without selecting a module', async function () {
  await productConfigPage.attemptProductConfigurationWithoutModule();
});

Then('the system should prevent product configuration actions', async function () {
  const isPrevented = await productConfigPage.isProductConfigurationPrevented();
  expect(isPrevented).toBeTruthy();
});

When('the user selects an available module from the dropdown', async function () {
  await productConfigPage.selectFirstAvailableModule();
});

Then('the selected module should be displayed in the dropdown field', async function () {
  const isSelected = await productConfigPage.isModuleSelected();
  expect(isSelected).toBeTruthy();
});

Then('the product configuration section should be enabled', async function () {
  const isEnabled = await productConfigPage.isProductConfigurationSectionEnabled();
  expect(isEnabled).toBeTruthy();
});