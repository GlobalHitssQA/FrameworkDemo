const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter system', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToLogin();
  await contractBreakdownPage.login();
  await contractBreakdownPage.verifyMainInterfaceDisplayed();
});

Given('the user has selected a contract with values in multiple categories', async function () {
  await contractBreakdownPage.selectContractWithMultipleCategories();
  await contractBreakdownPage.verifyContractValueComponentVisible();
});

When('the user clicks on the value and composition component', async function () {
  await contractBreakdownPage.clickValueCompositionComponent();
});

Then('the breakdown popup is displayed with the list of categories', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('all monetary values are right-aligned in each category', async function () {
  const areAllValuesRightAligned = await contractBreakdownPage.verifyAllMonetaryValuesRightAligned();
  expect(areAllValuesRightAligned).toBeTruthy();
});

Then('the right alignment is consistent for Poder de compra category', async function () {
  const isAligned = await contractBreakdownPage.verifyCategoryValueAlignment('poder-de-compra');
  expect(isAligned).toBeTruthy();
});

Then('the right alignment is consistent for Efectivo MXN category', async function () {
  const isAligned = await contractBreakdownPage.verifyCategoryValueAlignment('efectivo-mxn');
  expect(isAligned).toBeTruthy();
});

Then('the right alignment is consistent for Efectivo USD category', async function () {
  const isAligned = await contractBreakdownPage.verifyCategoryValueAlignment('efectivo-usd');
  expect(isAligned).toBeTruthy();
});

Then('the right alignment is consistent for Pendientes por liquidar category', async function () {
  const isAligned = await contractBreakdownPage.verifyCategoryValueAlignment('pendientes-liquidar');
  expect(isAligned).toBeTruthy();
});

Then('the right alignment is consistent for Fondos category', async function () {
  const isAligned = await contractBreakdownPage.verifyCategoryValueAlignment('fondos');
  expect(isAligned).toBeTruthy();
});

Then('the right alignment is consistent for Cedes y pagares category', async function () {
  const isAligned = await contractBreakdownPage.verifyCategoryValueAlignment('cedes-pagares');
  expect(isAligned).toBeTruthy();
});

Then('the right alignment is consistent for Mercado de dinero category', async function () {
  const isAligned = await contractBreakdownPage.verifyCategoryValueAlignment('mercado-dinero');
  expect(isAligned).toBeTruthy();
});

Then('the right alignment is consistent for Mercado de capitales category', async function () {
  const isAligned = await contractBreakdownPage.verifyCategoryValueAlignment('mercado-capitales');
  expect(isAligned).toBeTruthy();
});