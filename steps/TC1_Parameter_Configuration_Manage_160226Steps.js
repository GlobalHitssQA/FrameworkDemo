const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ParameterConfigPage = require('../pages/ParameterConfigPage');

let parameterConfigPage;

Given('the user is on the product parameters configuration page', async function() {
  parameterConfigPage = new ParameterConfigPage(this.page);
  await parameterConfigPage.navigateToParameterConfig();
});

When('the user selects a module from the dropdown', async function() {
  await parameterConfigPage.selectModule();
});

When('the user clicks the create parameter button', async function() {
  await parameterConfigPage.clickCreateParameterButton();
});

Then('the new parameter modal should be displayed', async function() {
  const isVisible = await parameterConfigPage.isNewParameterModalVisible();
  expect(isVisible).toBeTruthy();
});

When('the user fills the commission type field with {string}', async function(commissionType) {
  await parameterConfigPage.fillCommissionType(commissionType);
});

When('the user selects the charge type {string}', async function(chargeType) {
  await parameterConfigPage.selectChargeType(chargeType);
});

When('the user enters the value {string}', async function(value) {
  await parameterConfigPage.fillValue(value);
});

When('the user selects the commission start date', async function() {
  await parameterConfigPage.selectCommissionStartDate();
});

When('the user clicks the accept button', async function() {
  await parameterConfigPage.clickAcceptButton();
});

Then('the success modal should be displayed with message {string}', async function(expectedMessage) {
  const message = await parameterConfigPage.getSuccessModalMessage();
  expect(message).toContain(expectedMessage);
});

Then('the new parameter should appear in the commission parameters table', async function() {
  const isVisible = await parameterConfigPage.isParameterInTable();
  expect(isVisible).toBeTruthy();
});