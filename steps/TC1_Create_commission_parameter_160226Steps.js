const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProductManagementPage = require('../pages/ProductManagementPage');

let productPage;

Given('the user is on the product management page', async function () {
  productPage = new ProductManagementPage(this.page);
  await productPage.navigateToProductManagement();
});

When('the user selects a module from the dropdown', async function () {
  await productPage.selectModule();
});

When('the user clicks on the create parameter button', async function () {
  await productPage.clickCreateParameterButton();
});

When('the user fills the commission type field with {string}', async function (commissionType) {
  await productPage.fillCommissionType(commissionType);
});

When('the user selects the charge type from dropdown', async function () {
  await productPage.selectChargeType();
});

When('the user enters the value {string}', async function (value) {
  await productPage.fillValue(value);
});

When('the user selects the commission start date', async function () {
  await productPage.selectCommissionStartDate();
});

When('the user clicks the accept button', async function () {
  await productPage.clickAcceptButton();
});

Then('the new parameter should be displayed in the commission parameters table', async function () {
  const isVisible = await productPage.isParameterVisibleInTable();
  expect(isVisible).toBeTruthy();
});