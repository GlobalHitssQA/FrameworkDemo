const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyMainScreenDisplayed();
});

When('the user selects a Banco Persona Moral contract without Mexdolar account', async function () {
  await contractBreakdownPage.selectBancoPersonaMoralContractWithoutMexdolar();
  await contractBreakdownPage.verifyContractValueComponentDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickOnTotalContractValueComponent();
});

Then('the contract value breakdown popup should be displayed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Efectivo USD rubro should not be visible in the breakdown', async function () {
  const isEfectivoUSDVisible = await contractBreakdownPage.isEfectivoUSDRubroVisible();
  expect(isEfectivoUSDVisible).toBeFalsy();
});

Then('only applicable rubros for Banco contracts without Mexdolar should be displayed', async function () {
  const isEfectivoMXNVisible = await contractBreakdownPage.isEfectivoMXNRubroVisible();
  expect(isEfectivoMXNVisible).toBeTruthy();
  
  const visibleRubros = await contractBreakdownPage.getVisibleRubros();
  const hasEfectivoUSD = visibleRubros.some(rubro => rubro.toLowerCase().includes('efectivo usd'));
  expect(hasEfectivoUSD).toBeFalsy();
});