const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterContractPage = require('../pages/ActicenterContractPage');

let acticenterPage;

Given('the user is authenticated in Acticenter with access to Banco Persona Moral contracts', async function () {
  acticenterPage = new ActicenterContractPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.loginWithBancoPersonaMoralAccess();
  const isMainScreenVisible = await acticenterPage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user searches and selects a Banco Persona Moral contract with a related Mexdolar account', async function () {
  await acticenterPage.openSearchDialog();
  await acticenterPage.searchForMexdolarContract();
  await acticenterPage.selectFirstContractResult();
  const isContractInfoVisible = await acticenterPage.isContractInfoDisplayed();
  expect(isContractInfoVisible).toBeTruthy();
  const isTotalValueComponentVisible = await acticenterPage.isTotalValueComponentVisible();
  expect(isTotalValueComponentVisible).toBeTruthy();
});

When('the user clicks on the total contract value component to display the breakdown', async function () {
  await acticenterPage.clickTotalValueComponent();
  const isBreakdownPopupVisible = await acticenterPage.isBreakdownPopupDisplayed();
  expect(isBreakdownPopupVisible).toBeTruthy();
});

Then('the Efectivo USD section should display the Mexdolar account balance in US dollars without exchange rate conversion', async function () {
  const isEfectivoUsdVisible = await acticenterPage.isEfectivoUsdSectionVisible();
  expect(isEfectivoUsdVisible).toBeTruthy();
  const efectivoUsdValue = await acticenterPage.getEfectivoUsdValue();
  expect(efectivoUsdValue).toMatch(/^\$?[\d,]+\.?\d*\s*USD$/);
  const hasNoConversionIndicator = await acticenterPage.verifyNoExchangeRateApplied();
  expect(hasNoConversionIndicator).toBeTruthy();
});