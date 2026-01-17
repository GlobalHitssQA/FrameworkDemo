const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuationPage = require('../pages/ContractValuationPage');

let contractValuationPage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuationPage = new ContractValuationPage(this.page);
  await contractValuationPage.navigateToActicenter();
  await contractValuationPage.verifyUserIsAuthenticated();
});

Given('there is an active Casa de Bolsa contract available', async function () {
  await contractValuationPage.verifyCasaDeBolsaContractExists();
});

Given('the contract valuation service is available', async function () {
  await contractValuationPage.verifyValuationServiceIsAvailable();
});

When('the user selects a Casa de Bolsa contract', async function () {
  await contractValuationPage.selectCasaDeBolsaContract();
});

Then('the system loads the selected contract', async function () {
  const isLoaded = await contractValuationPage.isContractLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user accesses the contract value and composition component', async function () {
  await contractValuationPage.accessContractValueComponent();
});

Then('the system invokes the valuation service for Casa de Bolsa', async function () {
  const serviceInvoked = await contractValuationPage.isValuationServiceInvoked();
  expect(serviceInvoked).toBeTruthy();
});

Then('the component displays the total contract value', async function () {
  const totalValueVisible = await contractValuationPage.isTotalContractValueDisplayed();
  expect(totalValueVisible).toBeTruthy();
});

Then('the component displays the detailed breakdown including Poder de compra MXN', async function () {
  const poderDeCompraVisible = await contractValuationPage.isPoderDeCompraMXNDisplayed();
  expect(poderDeCompraVisible).toBeTruthy();
});

Then('the component displays Efectivo USD', async function () {
  const efectivoUSDVisible = await contractValuationPage.isEfectivoUSDDisplayed();
  expect(efectivoUSDVisible).toBeTruthy();
});

Then('the component displays other Casa de Bolsa specific items', async function () {
  const specificItemsVisible = await contractValuationPage.areCasaDeBolsaSpecificItemsDisplayed();
  expect(specificItemsVisible).toBeTruthy();
});