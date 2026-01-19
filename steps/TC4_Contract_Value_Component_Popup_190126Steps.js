const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FundsOperationPage = require('../pages/FundsOperationPage');

let fundsOperationPage;

Given('the user is authenticated in Acticenter', async function () {
  fundsOperationPage = new FundsOperationPage(this.page);
  await fundsOperationPage.login();
});

Given('the user navigates to the funds operation module', async function () {
  await fundsOperationPage.navigateToFundsOperationModule();
});

When('the user selects an available contract', async function () {
  await fundsOperationPage.selectAvailableContract();
});

Then('the system loads the selected contract information', async function () {
  const isLoaded = await fundsOperationPage.isContractInformationLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user clicks on the contract value and composition component', async function () {
  await fundsOperationPage.clickContractValueComponent();
});

Then('the system displays a popup with the detailed breakdown of all applicable items', async function () {
  const isPopupVisible = await fundsOperationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the popup is vertically aligned with the total contract value component', async function () {
  const isAligned = await fundsOperationPage.isPopupVerticallyAligned();
  expect(isAligned).toBeTruthy();
});

When('the user clicks outside the component and the popup', async function () {
  await fundsOperationPage.clickOutsidePopup();
});

Then('the popup closes automatically', async function () {
  const isPopupHidden = await fundsOperationPage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
});

When('the user clicks on the component again', async function () {
  await fundsOperationPage.clickContractValueComponent();
});

Then('the popup displays again showing the complete breakdown', async function () {
  const isPopupVisible = await fundsOperationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasBreakdownItems = await fundsOperationPage.hasBreakdownItems();
  expect(hasBreakdownItems).toBeTruthy();
});