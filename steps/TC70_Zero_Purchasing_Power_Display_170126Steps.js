const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyMainScreenDisplayed();
});

When('the user selects a Casa de Bolsa contract without purchasing power balance', async function () {
  await contractBreakdownPage.selectContractWithoutPurchasingPower();
  await contractBreakdownPage.verifyContractLoaded();
});

When('the user clicks on the total value component to expand the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the popup with all applicable items should be displayed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Purchasing Power MXN item should be visible in the breakdown', async function () {
  const isItemVisible = await contractBreakdownPage.isPurchasingPowerMXNVisible();
  expect(isItemVisible).toBeTruthy();
});

Then('the Purchasing Power MXN value should display zero point zero zero', async function () {
  const value = await contractBreakdownPage.getPurchasingPowerMXNValue();
  expect(value).toMatch(/0\.00|0,00/);
});

Then('the Purchasing Power MXN item should remain visible with zero value', async function () {
  const isStillVisible = await contractBreakdownPage.isPurchasingPowerMXNVisible();
  expect(isStillVisible).toBeTruthy();
  const value = await contractBreakdownPage.getPurchasingPowerMXNValue();
  expect(value).toMatch(/0\.00|0,00/);
});