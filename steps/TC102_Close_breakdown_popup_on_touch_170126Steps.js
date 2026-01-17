const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter on a touch device with an active contract selected', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.waitForAuthentication();
});

Given('the contract total value component is displayed', async function () {
  const isVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user taps on the total value component', async function () {
  await contractValuePage.tapOnTotalValueComponent();
});

Then('the breakdown popup is displayed with contract value details', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user taps outside the breakdown popup', async function () {
  await contractValuePage.tapOutsideBreakdownPopup();
});

Then('the breakdown popup is closed', async function () {
  const isPopupHidden = await contractValuePage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
});

Then('the total value component remains visible without alterations', async function () {
  const isVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
  const hasCorrectState = await contractValuePage.verifyTotalValueComponentIntegrity();
  expect(hasCorrectState).toBeTruthy();
});