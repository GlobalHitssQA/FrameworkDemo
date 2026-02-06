const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ParameterPage = require('../pages/ParameterPage');

let parameterPage;

Given('the user is on the product configuration page', async function () {
  parameterPage = new ParameterPage(this.page);
  await parameterPage.navigateToProductConfiguration();
});

Given('the user selects a module from the dropdown', async function () {
  await parameterPage.selectModule();
});

When('the user clicks the create parameter button', async function () {
  await parameterPage.clickCreateParameterButton();
});

When('the new parameter modal is displayed', async function () {
  const isVisible = await parameterPage.isNewParameterModalVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks the add commission type button', async function () {
  await parameterPage.clickAddCommissionTypeButton();
});

When('the user fills the commission type field with {string}', async function (commissionType) {
  await parameterPage.fillCommissionType(commissionType);
});

When('the user selects the charge type {string}', async function (chargeType) {
  await parameterPage.selectChargeType(chargeType);
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

Then('the success modal should be displayed with message {string}', async function (expectedMessage) {
  const isVisible = await parameterPage.isSuccessModalVisible();
  expect(isVisible).toBeTruthy();
  const message = await parameterPage.getSuccessModalMessage();
  expect(message).toContain(expectedMessage);
});