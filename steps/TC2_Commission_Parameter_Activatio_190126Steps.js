const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CommissionParametersPage = require('../pages/CommissionParametersPage');

let commissionParametersPage;
let targetParameterName;

Given('I am logged in as an Administrator and on the Product Configuration screen', async function () {
  commissionParametersPage = new CommissionParametersPage(this.page);
  await commissionParametersPage.navigateToProductConfiguration();
});

Given('I can see the Commission Parameters table with at least one parameter', async function () {
  const isTableVisible = await commissionParametersPage.isCommissionParametersTableVisible();
  expect(isTableVisible).toBeTruthy();
  const hasParameters = await commissionParametersPage.hasAtLeastOneParameter();
  expect(hasParameters).toBeTruthy();
});

When('I click on the deactivate option for an active commission parameter', async function () {
  targetParameterName = await commissionParametersPage.getFirstActiveParameterName();
  await commissionParametersPage.clickDeactivateForParameter(targetParameterName);
});

Then('I should see a confirmation modal with message about deactivating the parameter', async function () {
  const isModalVisible = await commissionParametersPage.isConfirmationModalVisible();
  expect(isModalVisible).toBeTruthy();
  const modalMessage = await commissionParametersPage.getConfirmationModalMessage();
  expect(modalMessage).toContain('desactivar este parámetro');
});

Then('I should see Deactivate and Cancel buttons in the modal', async function () {
  const isDeactivateButtonVisible = await commissionParametersPage.isDeactivateButtonVisible();
  const isCancelButtonVisible = await commissionParametersPage.isCancelButtonVisible();
  expect(isDeactivateButtonVisible).toBeTruthy();
  expect(isCancelButtonVisible).toBeTruthy();
});

When('I click on the Deactivate button', async function () {
  await commissionParametersPage.clickDeactivateButton();
});

Then('the parameter should be deactivated and the modal should close', async function () {
  const isModalClosed = await commissionParametersPage.isConfirmationModalClosed();
  expect(isModalClosed).toBeTruthy();
});

Then('the parameter should display deactivated status in the table', async function () {
  const isDeactivated = await commissionParametersPage.isParameterDeactivated(targetParameterName);
  expect(isDeactivated).toBeTruthy();
});

When('I click on the activate option for the deactivated parameter', async function () {
  await commissionParametersPage.clickActivateForParameter(targetParameterName);
});

Then('I should see a confirmation modal with message about activating the parameter', async function () {
  const isModalVisible = await commissionParametersPage.isConfirmationModalVisible();
  expect(isModalVisible).toBeTruthy();
  const modalMessage = await commissionParametersPage.getConfirmationModalMessage();
  expect(modalMessage).toContain('activar este parámetro');
});

Then('I should see Activate and Cancel buttons in the modal', async function () {
  const isActivateButtonVisible = await commissionParametersPage.isActivateButtonVisible();
  const isCancelButtonVisible = await commissionParametersPage.isCancelButtonVisible();
  expect(isActivateButtonVisible).toBeTruthy();
  expect(isCancelButtonVisible).toBeTruthy();
});

When('I click on the Activate button', async function () {
  await commissionParametersPage.clickActivateButton();
});

Then('the parameter should be activated and the modal should close', async function () {
  const isModalClosed = await commissionParametersPage.isConfirmationModalClosed();
  expect(isModalClosed).toBeTruthy();
});

Then('the parameter should display activated status in the table', async function () {
  const isActivated = await commissionParametersPage.isParameterActivated(targetParameterName);
  expect(isActivated).toBeTruthy();
});

When('I click on the deactivate option for an active parameter', async function () {
  targetParameterName = await commissionParametersPage.getFirstActiveParameterName();
  await commissionParametersPage.clickDeactivateForParameter(targetParameterName);
});

When('I click on the Cancel button in the confirmation modal', async function () {
  await commissionParametersPage.clickCancelButton();
});

Then('the modal should close and the parameter should remain active', async function () {
  const isModalClosed = await commissionParametersPage.isConfirmationModalClosed();
  expect(isModalClosed).toBeTruthy();
  const isActive = await commissionParametersPage.isParameterActivated(targetParameterName);
  expect(isActive).toBeTruthy();
});