const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('I am logged in as a Private Banking user in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginAsPrivateBankingUser();
  const isLoggedIn = await contractValuePage.isMainInterfaceVisible();
  expect(isLoggedIn).toBeTruthy();
});

When('I configure the browser to Responsive Portrait mode', async function () {
  await contractValuePage.setResponsivePortraitMode();
  const isPortraitAdapted = await contractValuePage.isInterfaceAdaptedToPortrait();
  expect(isPortraitAdapted).toBeTruthy();
});

When('I select a contract for Individual or Legal Entity', async function () {
  await contractValuePage.selectContract();
});

Then('the contract loads and displays the value and composition component in Portrait view', async function () {
  const isComponentVisible = await contractValuePage.isValueCompositionComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the total value is displayed with proper monetary format for Portrait view', async function () {
  const totalValue = await contractValuePage.getTotalValueText();
  const isValidMonetaryFormat = await contractValuePage.isValidMonetaryFormat(totalValue);
  expect(isValidMonetaryFormat).toBeTruthy();
});

When('I click on the component to view the breakdown', async function () {
  await contractValuePage.clickValueComponent();
});

Then('the popup displays the complete breakdown of items adapted to Portrait view', async function () {
  const isBreakdownPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isBreakdownPopupVisible).toBeTruthy();
});

Then('each applicable item shows its monetary value or zero balance as $0.00', async function () {
  const allItemsHaveValidValues = await contractValuePage.verifyAllItemsHaveMonetaryValues();
  expect(allItemsHaveValidValues).toBeTruthy();
});

When('I click outside the component to close the breakdown', async function () {
  await contractValuePage.clickOutsideBreakdownPopup();
});

Then('the popup closes correctly', async function () {
  const isPopupClosed = await contractValuePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});