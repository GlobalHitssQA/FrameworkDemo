const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyMainScreenIsDisplayed();
});

When('the user selects a Banco Persona Fisica contract without Mexdolar account', async function () {
  await contractBreakdownPage.searchContract();
  await contractBreakdownPage.selectBancoPersonaFisicaContractWithoutMexdolar();
  await contractBreakdownPage.verifyContractValueComponentIsDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickOnTotalContractValue();
});

Then('the contract value breakdown popup is displayed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Efectivo USD field should not be visible in the breakdown', async function () {
  const isEfectivoUSDVisible = await contractBreakdownPage.isEfectivoUSDVisible();
  expect(isEfectivoUSDVisible).toBeFalsy();
});

Then('only applicable fields for Banco contracts without Mexdolar should be displayed', async function () {
  const isEfectivoMXNVisible = await contractBreakdownPage.isEfectivoMXNVisible();
  expect(isEfectivoMXNVisible).toBeTruthy();
  
  const breakdownItems = await contractBreakdownPage.getBreakdownItemsList();
  const hasEfectivoUSD = breakdownItems.some(item => item.includes('Efectivo USD'));
  expect(hasEfectivoUSD).toBeFalsy();
});