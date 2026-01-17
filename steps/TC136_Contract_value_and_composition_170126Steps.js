const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter on a tablet device', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyApplicationLoaded();
});

When('the user selects a registered contract in portrait orientation', async function () {
  await contractValuePage.setViewportToPortrait();
  await contractValuePage.selectRegisteredContract();
});

Then('the contract value and composition component is displayed adapted to portrait orientation', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
  const isAdapted = await contractValuePage.verifyPortraitLayout();
  expect(isAdapted).toBeTruthy();
});

When('the user taps on the contract value component to expand the breakdown', async function () {
  await contractValuePage.tapContractValueComponent();
});

Then('the breakdown popup is displayed showing all corresponding items', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasAllItems = await contractValuePage.verifyBreakdownItems();
  expect(hasAllItems).toBeTruthy();
});

When('the user closes the breakdown popup and rotates to landscape orientation', async function () {
  await contractValuePage.closeBreakdownPopup();
  await contractValuePage.setViewportToLandscape();
});

Then('the component adapts correctly to landscape orientation', async function () {
  const isAdapted = await contractValuePage.verifyLandscapeLayout();
  expect(isAdapted).toBeTruthy();
});

When('the user taps on the contract value component again to expand the breakdown', async function () {
  await contractValuePage.tapContractValueComponent();
});

Then('the breakdown popup is displayed adapted to landscape orientation with vertical alignment', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasVerticalAlignment = await contractValuePage.verifyLandscapePopupVerticalAlignment();
  expect(hasVerticalAlignment).toBeTruthy();
});