const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let efectivoUsdValue;
let sapMexdolarBalance;

Given('the user is authenticated in Acticenter', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenDisplayed();
});

When('the user selects a Banco Persona Moral contract with associated Mexdolar account', async function () {
  await acticenterPage.selectBancoPersonaMoralContract();
  await acticenterPage.verifyTotalContractValueComponentDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the contract value breakdown popup is displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the system retrieves the Mexdolar account balance from SAP', async function () {
  sapMexdolarBalance = await acticenterPage.getMexdolarBalanceFromSAP();
  expect(sapMexdolarBalance).not.toBeNull();
});

When('the user locates the Efectivo USD item in the breakdown', async function () {
  efectivoUsdValue = await acticenterPage.getEfectivoUsdValue();
  expect(efectivoUsdValue).not.toBeNull();
});

Then('the Efectivo USD value should match the Mexdolar account balance from SAP', async function () {
  const normalizedEfectivoUsd = acticenterPage.normalizeMonetaryValue(efectivoUsdValue);
  const normalizedSapBalance = acticenterPage.normalizeMonetaryValue(sapMexdolarBalance);
  expect(normalizedEfectivoUsd).toBe(normalizedSapBalance);
});