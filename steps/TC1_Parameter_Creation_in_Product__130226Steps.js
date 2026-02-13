const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ParameterPage = require('../pages/ParameterPage');

let parameterPage;

Given('the user is on the product parameters configuration page', async function () {
  parameterPage = new ParameterPage(this.page);
  await parameterPage.navigateToParametersPage();
});

When('the user selects a module from the dropdown', async function () {
  await parameterPage.selectModule();
});

When('the user clicks the create parameter button', async function () {
  await parameterPage.clickCreateParameterButton();
});

When('the user fills the commission type field with {string}', async function (commissionType) {
  await parameterPage.fillCommissionType(commissionType);
});

When('the user fills the charge type field with {string}', async function (chargeType) {
  await parameterPage.fillChargeType(chargeType);
});

When('the user fills the value field with {string}', async function (value) {
  await parameterPage.fillValue(value);
});

When('the user selects the commission start date', async function () {
  await parameterPage.selectCommissionStartDate();
});

When('the user clicks the accept button', async function () {
  await parameterPage.clickAcceptButton();
});

Then('the new parameter should be visible in the parameters table', async function () {
  const isVisible = await parameterPage.isParameterVisibleInTable();
  expect(isVisible).toBeTruthy();
});