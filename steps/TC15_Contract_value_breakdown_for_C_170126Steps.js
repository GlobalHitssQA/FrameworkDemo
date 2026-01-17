const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyMainScreenDisplayed();
});

When('the user selects a Casa de Bolsa Persona Fisica contract from the contract selector', async function () {
  await contractBreakdownPage.openContractSelector();
  await contractBreakdownPage.selectCasaDeBolsaPersonaFisicaContract();
});

Then('the system displays the total contract value component', async function () {
  const isVisible = await contractBreakdownPage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isVisible).toBeTruthy();
});

Then('the USD Cash item is visible in the breakdown list', async function () {
  const isVisible = await contractBreakdownPage.isUsdCashItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('the USD Cash value is displayed with USD currency format', async function () {
  const hasCorrectFormat = await contractBreakdownPage.verifyUsdCashCurrencyFormat();
  expect(hasCorrectFormat).toBeTruthy();
});