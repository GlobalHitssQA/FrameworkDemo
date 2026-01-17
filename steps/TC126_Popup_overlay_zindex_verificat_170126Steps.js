const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BreakdownPopupPage = require('../pages/BreakdownPopupPage');

let breakdownPopupPage;

Given('the user is authenticated and viewing a contract with multiple visible components in Acticenter', async function () {
  breakdownPopupPage = new BreakdownPopupPage(this.page);
  await breakdownPopupPage.navigateToContract();
  const isLoaded = await breakdownPopupPage.isContractInterfaceLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user clicks on the total value component to display the breakdown popup', async function () {
  await breakdownPopupPage.clickTotalValueComponent();
});

Then('the popup should display correctly overlaying other interface elements', async function () {
  const isPopupVisible = await breakdownPopupPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  
  const hasHigherZIndex = await breakdownPopupPage.verifyPopupHasHighestZIndex();
  expect(hasHigherZIndex).toBeTruthy();
});

Then('the elements behind the popup should not respond to clicks while the popup is open', async function () {
  const elementsBlocked = await breakdownPopupPage.verifyBackgroundElementsAreBlocked();
  expect(elementsBlocked).toBeTruthy();
});

When('the user clicks outside the popup to close it', async function () {
  await breakdownPopupPage.clickOutsidePopup();
});

Then('the popup should close and all other components should become interactive again', async function () {
  const isPopupClosed = await breakdownPopupPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
  
  const areElementsInteractive = await breakdownPopupPage.verifyBackgroundElementsAreInteractive();
  expect(areElementsInteractive).toBeTruthy();
});