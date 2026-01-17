const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated and on the Acticenter main screen', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user selects a Banco contract without Mexdolar account', async function () {
  await acticenterPage.openContractSearch();
  await acticenterPage.selectBancoContractWithoutMexdolar();
  await acticenterPage.verifyContractIsLoaded();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the breakdown popup should be displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Efectivo USD field should not be visible in the breakdown', async function () {
  const isEfectivoUSDVisible = await acticenterPage.isEfectivoUSDVisible();
  expect(isEfectivoUSDVisible).toBeFalsy();
});

Then('only applicable fields for Banco contracts without Mexdolar should be displayed', async function () {
  const breakdownFields = await acticenterPage.getBreakdownFields();
  const hasEfectivoUSD = breakdownFields.some(field => field.includes('Efectivo USD'));
  expect(hasEfectivoUSD).toBeFalsy();
  
  const hasEfectivoMXN = await acticenterPage.isEfectivoMXNVisible();
  expect(hasEfectivoMXN).toBeTruthy();
});