const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CommissionParameterPage = require('../pages/CommissionParameterPage');

let commissionParameterPage;

Given('I am on the commission parameters configuration page', async function() {
  commissionParameterPage = new CommissionParameterPage(this.page);
  await commissionParameterPage.navigateToCommissionParameters();
});

Given('there is at least one commission parameter in the table', async function() {
  const hasParameters = await commissionParameterPage.hasExistingParameters();
  expect(hasParameters).toBeTruthy();
});

When('I click the edit button for the first parameter', async function() {
  await commissionParameterPage.clickEditButtonForFirstParameter();
});

When('I click the edit button for a parameter', async function() {
  await commissionParameterPage.clickEditButtonForFirstParameter();
});

Then('the edit modal should display with preloaded parameter information', async function() {
  const isModalVisible = await commissionParameterPage.isEditModalVisible();
  expect(isModalVisible).toBeTruthy();
  const areFieldsPreloaded = await commissionParameterPage.areEditFieldsPreloaded();
  expect(areFieldsPreloaded).toBeTruthy();
});

When('I select a different commission type from the dropdown', async function() {
  await commissionParameterPage.selectDifferentCommissionType();
});

Then('the new commission type should be displayed in the field', async function() {
  const isCommissionTypeUpdated = await commissionParameterPage.isCommissionTypeFieldUpdated();
  expect(isCommissionTypeUpdated).toBeTruthy();
});

When('I enter a new numeric value in the value field', async function() {
  await commissionParameterPage.enterNewValue('15.5');
});

Then('the new value should be displayed in the value field', async function() {
  const currentValue = await commissionParameterPage.getValueFieldContent();
  expect(currentValue).toBeTruthy();
});

When('I select a new date in the commission start date calendar', async function() {
  await commissionParameterPage.selectNewCommissionStartDate();
});

Then('the new date should be displayed in the commission start field', async function() {
  const dateValue = await commissionParameterPage.getCommissionStartDateValue();
  expect(dateValue).toBeTruthy();
});

When('I click the accept button', async function() {
  await commissionParameterPage.clickAcceptButton();
});

Then('a success modal should display with the message changes saved successfully', async function() {
  const isSuccessModalVisible = await commissionParameterPage.isSuccessModalVisible();
  expect(isSuccessModalVisible).toBeTruthy();
  const successMessage = await commissionParameterPage.getSuccessModalMessage();
  expect(successMessage).toContain('guardaron con éxito');
});

When('I click the accept button on the confirmation modal', async function() {
  await commissionParameterPage.clickConfirmationModalAcceptButton();
});

Then('the modal should close and the updated parameter should be reflected in the table', async function() {
  const isModalClosed = await commissionParameterPage.isEditModalClosed();
  expect(isModalClosed).toBeTruthy();
  const isTableVisible = await commissionParameterPage.isParametersTableVisible();
  expect(isTableVisible).toBeTruthy();
});

When('I click the close button before saving changes', async function() {
  await commissionParameterPage.clickCloseModalButton();
});

Then('a confirmation modal should display asking to abandon editing', async function() {
  const isAbandonModalVisible = await commissionParameterPage.isAbandonConfirmationModalVisible();
  expect(isAbandonModalVisible).toBeTruthy();
  const abandonMessage = await commissionParameterPage.getAbandonModalMessage();
  expect(abandonMessage).toContain('abandonar la edición');
});

When('I click the abandon button', async function() {
  await commissionParameterPage.clickAbandonButton();
});

Then('the modal should close and changes should not be saved', async function() {
  const isModalClosed = await commissionParameterPage.isEditModalClosed();
  expect(isModalClosed).toBeTruthy();
  const isTableVisible = await commissionParameterPage.isParametersTableVisible();
  expect(isTableVisible).toBeTruthy();
});