const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractAccessPage = require('../pages/ContractAccessPage');

let contractAccessPage;

Given('the user is authenticated with specific assigned contracts', async function () {
  contractAccessPage = new ContractAccessPage(this.page);
  await contractAccessPage.navigateToLogin();
  await contractAccessPage.enterUsername(process.env.TEST_USERNAME || 'usuario_prueba');
  await contractAccessPage.enterPassword(process.env.TEST_PASSWORD || 'password_prueba');
  await contractAccessPage.clickLoginButton();
  await contractAccessPage.verifySuccessfulLogin();
});

When('the user searches and selects an assigned contract', async function () {
  await contractAccessPage.clickSearchIcon();
  await contractAccessPage.enterContractSearch(process.env.ASSIGNED_CONTRACT || 'CONTRATO_ASIGNADO_001');
  await contractAccessPage.selectContractFromResults();
});

Then('the system displays the contract value and composition component', async function () {
  const isValueComponentVisible = await contractAccessPage.isContractValueComponentVisible();
  expect(isValueComponentVisible).toBeTruthy();
  const isCompositionVisible = await contractAccessPage.isContractCompositionVisible();
  expect(isCompositionVisible).toBeTruthy();
});

When('the user searches and selects a non-assigned contract', async function () {
  await contractAccessPage.clickSearchIcon();
  await contractAccessPage.enterContractSearch(process.env.NON_ASSIGNED_CONTRACT || 'CONTRATO_NO_ASIGNADO_001');
  await contractAccessPage.attemptSelectNonAssignedContract();
});

Then('the system denies access or shows an authorization error message', async function () {
  const hasAccessDenied = await contractAccessPage.isAccessDeniedMessageVisible();
  const isContractNotSelectable = await contractAccessPage.isContractNotSelectable();
  expect(hasAccessDenied || isContractNotSelectable).toBeTruthy();
});

Then('the system only displays contracts authorized for the user', async function () {
  await contractAccessPage.clickSearchIcon();
  const displayedContracts = await contractAccessPage.getDisplayedContractsList();
  const unauthorizedContractVisible = await contractAccessPage.checkUnauthorizedContractInList(process.env.NON_ASSIGNED_CONTRACT || 'CONTRATO_NO_ASIGNADO_001');
  expect(unauthorizedContractVisible).toBeFalsy();
});