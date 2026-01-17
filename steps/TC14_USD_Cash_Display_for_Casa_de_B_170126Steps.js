const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated and on the Acticenter main screen', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user selects a Casa de Bolsa contract with USD balance', async function () {
  await acticenterPage.selectCasaDeBolsaContractWithUSDBalance();
  await acticenterPage.verifyContractInformationIsLoaded();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the breakdown popup is displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the USD Cash item shows the amount in US dollars without conversion to MXN', async function () {
  const usdCashItem = await acticenterPage.getUSDCashItemText();
  expect(usdCashItem).toContain('USD');
  const isUSDFormat = await acticenterPage.verifyUSDCashIsInDollars();
  expect(isUSDFormat).toBeTruthy();
});