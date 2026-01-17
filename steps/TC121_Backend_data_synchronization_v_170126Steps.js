const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated with advisor role in Acticenter module', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenLoaded();
});

When('the user selects a Casa de Bolsa Persona Fisica contract', async function () {
  await acticenterPage.selectCasaDeBolsaPersonaFisicaContract();
});

Then('the system displays the contract value and composition component', async function () {
  const isVisible = await acticenterPage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the component to expand the breakdown', async function () {
  await acticenterPage.clickContractValueComponent();
});

Then('the system displays the popup with all breakdown items', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasAllItems = await acticenterPage.verifyAllBreakdownItemsDisplayed();
  expect(hasAllItems).toBeTruthy();
});

Then('the MXN purchasing power values match the Advisor Module currentcash service', async function () {
  const acticenterValue = await acticenterPage.getPurchasingPowerMXN();
  const serviceValue = await acticenterPage.getAdvisorModuleCurrentCashValue();
  expect(acticenterValue).toBe(serviceValue);
});

Then('the Debt Funds coverage and variable income values match corresponding services', async function () {
  const fundsMatch = await acticenterPage.verifyFundsValuesMatchServices();
  expect(fundsMatch).toBeTruthy();
});

Then('the total contract value equals the arithmetic sum of all displayed items', async function () {
  const totalValue = await acticenterPage.getTotalContractValue();
  const sumOfItems = await acticenterPage.calculateSumOfAllBreakdownItems();
  expect(totalValue).toBe(sumOfItems);
});