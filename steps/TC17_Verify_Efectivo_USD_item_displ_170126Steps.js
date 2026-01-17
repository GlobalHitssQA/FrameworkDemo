const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterContractPage = require('../pages/ActicenterContractPage');

let acticenterPage;

Given('the user is authenticated in Acticenter', async function () {
  acticenterPage = new ActicenterContractPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenDisplayed();
});

When('the user selects a Banco Persona Moral contract with associated Mexdolar account', async function () {
  await acticenterPage.selectBancoPersonaMoralContractWithMexdolar();
  await acticenterPage.verifyContractValueComponentDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the contract value breakdown popup is displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the system validates the Mexdolar account association', async function () {
  await acticenterPage.waitForMexdolarValidation();
});

Then('the Efectivo USD item is visible in the breakdown list', async function () {
  const isEfectivoUsdVisible = await acticenterPage.isEfectivoUsdItemVisible();
  expect(isEfectivoUsdVisible).toBeTruthy();
});

Then('the Efectivo USD value is displayed in USD currency format', async function () {
  const efectivoUsdValue = await acticenterPage.getEfectivoUsdValue();
  const isUsdFormat = acticenterPage.isValidUsdCurrencyFormat(efectivoUsdValue);
  expect(isUsdFormat).toBeTruthy();
});