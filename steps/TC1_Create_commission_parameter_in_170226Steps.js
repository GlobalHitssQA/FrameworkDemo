const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CommissionParameterPage = require('../pages/CommissionParameterPage');

let commissionParameterPage;

Given('the user is authenticated as Administrator in PASE system', async function () {
  commissionParameterPage = new CommissionParameterPage(this.page);
  await commissionParameterPage.loginAsAdministrator();
});

Given('the user navigates to the Payments Module', async function () {
  await commissionParameterPage.navigateToPaymentsModule();
});

Given('the user selects a module from the dropdown list', async function () {
  await commissionParameterPage.selectModuleFromDropdown();
});

Given('the user accesses Step 1 of the Product Configuration screen', async function () {
  await commissionParameterPage.accessProductConfigurationStep1();
});

Then('the Commission Parameters section is displayed with only the Create Parameter button', async function () {
  const isVisible = await commissionParameterPage.isCommissionParametersSectionVisible();
  expect(isVisible).toBeTruthy();
  const hasOnlyCreateButton = await commissionParameterPage.hasOnlyCreateParameterButton();
  expect(hasOnlyCreateButton).toBeTruthy();
});

When('the user clicks the Create Parameter button', async function () {
  await commissionParameterPage.clickCreateParameterButton();
});

Then('the New Parameter modal is displayed with fields Type of Commission, Type of Charge, Value and Commission Start Date', async function () {
  const isModalVisible = await commissionParameterPage.isNewParameterModalVisible();
  expect(isModalVisible).toBeTruthy();
  const hasAllFields = await commissionParameterPage.modalHasAllRequiredFields();
  expect(hasAllFields).toBeTruthy();
});

When('the user selects a value from the Type of Commission dropdown', async function () {
  await commissionParameterPage.selectCommissionType();
});

Then('the system registers the selected commission type', async function () {
  const isSelected = await commissionParameterPage.isCommissionTypeSelected();
  expect(isSelected).toBeTruthy();
});

When('the user selects a value from the Type of Charge dropdown', async function () {
  await commissionParameterPage.selectChargeType();
});

Then('the system registers the selected charge type', async function () {
  const isSelected = await commissionParameterPage.isChargeTypeSelected();
  expect(isSelected).toBeTruthy();
});

When('the user enters a numeric value in the Value field', async function () {
  await commissionParameterPage.enterValue('10');
});

Then('the system accepts the entered value', async function () {
  const hasValue = await commissionParameterPage.hasValueEntered();
  expect(hasValue).toBeTruthy();
});

When('the user selects a date from the Commission Start Date calendar', async function () {
  await commissionParameterPage.selectCommissionStartDate();
});

Then('the system registers the selected start date', async function () {
  const isDateSelected = await commissionParameterPage.isStartDateSelected();
  expect(isDateSelected).toBeTruthy();
});

Then('the Accept button is enabled', async function () {
  const isEnabled = await commissionParameterPage.isAcceptButtonEnabled();
  expect(isEnabled).toBeTruthy();
});

When('the user clicks the Accept button', async function () {
  await commissionParameterPage.clickAcceptButton();
});

Then('the modal closes and the new parameter appears in the Commission Parameters table', async function () {
  const isModalClosed = await commissionParameterPage.isModalClosed();
  expect(isModalClosed).toBeTruthy();
  const isParameterInTable = await commissionParameterPage.isNewParameterInTable();
  expect(isParameterInTable).toBeTruthy();
});