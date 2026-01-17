const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let currentCashValueFromService;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('the currentcash service from Modulo Asesor is available', async function () {
  const isServiceAvailable = await contractValuePage.verifyCurrentCashServiceAvailable();
  expect(isServiceAvailable).toBeTruthy();
});

When('the user selects a Casa de Bolsa contract', async function () {
  await contractValuePage.selectCasaDeBolsaContract();
});

Then('the system loads the selected contract', async function () {
  const isContractLoaded = await contractValuePage.verifyContractIsLoaded();
  expect(isContractLoaded).toBeTruthy();
});

When('the user clicks on the contract value component to display the breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the system invokes the currentcash service from Modulo Asesor', async function () {
  currentCashValueFromService = await contractValuePage.captureCurrentCashServiceResponse();
  expect(currentCashValueFromService).not.toBeNull();
});

Then('the breakdown popup is displayed', async function () {
  const isPopupVisible = await contractValuePage.verifyBreakdownPopupIsVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user verifies the Poder de compra MXN field in the breakdown', async function () {
  const isFieldVisible = await contractValuePage.verifyPoderDeCompraFieldIsVisible();
  expect(isFieldVisible).toBeTruthy();
});

Then('the system displays the Poder de compra MXN value obtained from currentcash service', async function () {
  const displayedValue = await contractValuePage.getPoderDeCompraMXNValue();
  expect(displayedValue).not.toBeNull();
  expect(displayedValue.length).toBeGreaterThan(0);
});

Then('the Poder de compra MXN value matches the current cash value from Modulo Asesor', async function () {
  const displayedValue = await contractValuePage.getPoderDeCompraMXNValue();
  const normalizedDisplayed = contractValuePage.normalizeMonetaryValue(displayedValue);
  const normalizedExpected = contractValuePage.normalizeMonetaryValue(currentCashValueFromService);
  expect(normalizedDisplayed).toBe(normalizedExpected);
});