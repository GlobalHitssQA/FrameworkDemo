const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated in Acticenter', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user selects a Banco Persona Moral contract with associated Mexdolar account', async function () {
  await acticenterPage.searchAndSelectContract('BANCO_PERSONA_MORAL_MEXDOLAR');
  await acticenterPage.verifyContractInfoLoaded();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the SAP microservice returns the Mexdolar account balance', async function () {
  await acticenterPage.waitForSAPServiceResponse();
  const sapBalanceReceived = await acticenterPage.isSAPBalanceReceived();
  expect(sapBalanceReceived).toBeTruthy();
});

Then('the Efectivo USD field displays the Mexdolar balance without currency conversion', async function () {
  const efectivoUSDValue = await acticenterPage.getEfectivoUSDValue();
  expect(efectivoUSDValue).not.toBeNull();
  expect(efectivoUSDValue).toMatch(/^\$?[\d,]+\.?\d*\s*(USD)?$/);
  const isDisplayedInUSD = await acticenterPage.verifyEfectivoUSDDisplaysOriginalSAPValue();
  expect(isDisplayedInUSD).toBeTruthy();
});