const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ParameterPage = require('../pages/ParameterPage');

let parameterPage;

Given('the user is logged into the PASE system', async function () {
  parameterPage = new ParameterPage(this.page);
  await parameterPage.navigateToLogin();
  await parameterPage.login();
});

Given('the user navigates to the product configuration page', async function () {
  await parameterPage.navigateToProductConfiguration();
});

When('the user selects a module from the dropdown list', async function () {
  await parameterPage.selectModule();
});

When('the user clicks the Create Parameter button', async function () {
  await parameterPage.clickCreateParameterButton();
});

Then('the New Parameter modal should be displayed', async function () {
  const isVisible = await parameterPage.isNewParameterModalVisible();
  expect(isVisible).toBeTruthy();
});

When('the user selects a commission type', async function () {
  await parameterPage.selectCommissionType();
});

When('the user selects a charge type', async function () {
  await parameterPage.selectChargeType();
});

When('the user enters a valid value', async function () {
  await parameterPage.enterParameterValue('100');
});

When('the user selects a commission start date', async function () {
  await parameterPage.selectCommissionStartDate();
});

When('the user clicks the Accept button', async function () {
  await parameterPage.clickAcceptButton();
});

Then('the new parameter should appear in the commission parameters table', async function () {
  const isParameterVisible = await parameterPage.isParameterInTable();
  expect(isParameterVisible).toBeTruthy();
});

Then('a success message should be displayed', async function () {
  const isSuccessVisible = await parameterPage.isSuccessMessageVisible();
  expect(isSuccessVisible).toBeTruthy();
});