const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ModuloAsesorPage = require('../pages/ModuloAsesorPage');
const ActicenterPage = require('../pages/ActicenterPage');

let moduloAsesorPage;
let acticenterPage;
let moduloAsesorValues = {};

Given('the user is authenticated in Modulo Asesor', async function () {
  moduloAsesorPage = new ModuloAsesorPage(this.page);
  await moduloAsesorPage.navigateToModuloAsesor();
  await moduloAsesorPage.waitForPageLoad();
});

Given('the user queries a specific contract and records all category values', async function () {
  await moduloAsesorPage.searchContract(this.testData.contractNumber);
  await moduloAsesorPage.selectContract();
  moduloAsesorValues = await moduloAsesorPage.getAllCategoryValues();
});

When('the user opens Acticenter and selects the same contract', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.waitForPageLoad();
  await acticenterPage.searchContract(this.testData.contractNumber);
  await acticenterPage.selectContract();
});

When('the user clicks on the contract value component to display the breakdown', async function () {
  await acticenterPage.clickContractValueComponent();
  await acticenterPage.waitForBreakdownPopup();
});

Then('all monetary values for each category in Acticenter should match the values from Modulo Asesor', async function () {
  const acticenterValues = await acticenterPage.getAllCategoryValues();
  for (const category of Object.keys(moduloAsesorValues)) {
    expect(acticenterValues[category]).toBe(moduloAsesorValues[category]);
  }
});

Then('the breakdown should display Purchasing power MXN value correctly', async function () {
  const value = await acticenterPage.getPurchasingPowerMXN();
  expect(value).toBe(moduloAsesorValues.purchasingPowerMXN);
});

Then('the breakdown should display Cash MXN value correctly', async function () {
  const value = await acticenterPage.getCashMXN();
  expect(value).toBe(moduloAsesorValues.cashMXN);
});

Then('the breakdown should display Cash USD value correctly', async function () {
  const value = await acticenterPage.getCashUSD();
  expect(value).toBe(moduloAsesorValues.cashUSD);
});

Then('the breakdown should display Pending settlement value correctly', async function () {
  const value = await acticenterPage.getPendingSettlement();
  expect(value).toBe(moduloAsesorValues.pendingSettlement);
});

Then('the breakdown should display Debt funds value correctly', async function () {
  const value = await acticenterPage.getDebtFunds();
  expect(value).toBe(moduloAsesorValues.debtFunds);
});

Then('the breakdown should display Hedge funds value correctly', async function () {
  const value = await acticenterPage.getHedgeFunds();
  expect(value).toBe(moduloAsesorValues.hedgeFunds);
});

Then('the breakdown should display Equity funds value correctly', async function () {
  const value = await acticenterPage.getEquityFunds();
  expect(value).toBe(moduloAsesorValues.equityFunds);
});

Then('the breakdown should display Cedes and promissory notes value correctly', async function () {
  const value = await acticenterPage.getCedesAndPromissoryNotes();
  expect(value).toBe(moduloAsesorValues.cedesAndPromissoryNotes);
});

Then('the breakdown should display Money market value correctly', async function () {
  const value = await acticenterPage.getMoneyMarket();
  expect(value).toBe(moduloAsesorValues.moneyMarket);
});

Then('the breakdown should display Capital market value correctly', async function () {
  const value = await acticenterPage.getCapitalMarket();
  expect(value).toBe(moduloAsesorValues.capitalMarket);
});