const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user opens Acticenter application in the latest stable Google Chrome browser', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  const isLoaded = await contractValuePage.isApplicationLoaded();
  expect(isLoaded).toBeTruthy();
});

Given('the user is authenticated and has an active contract available', async function () {
  await contractValuePage.authenticateUser();
  const isAuthenticated = await contractValuePage.isUserAuthenticated();
  expect(isAuthenticated).toBeTruthy();
});

When('the user navigates to the funds operation module with an active contract', async function () {
  await contractValuePage.navigateToFundsOperationModule();
  await contractValuePage.selectActiveContract();
});

Then('the total contract value component is displayed correctly', async function () {
  const isVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
  const hasCorrectFormat = await contractValuePage.hasTotalValueCorrectFormat();
  expect(hasCorrectFormat).toBeTruthy();
});

When('the user clicks on the total value component to open the breakdown popup', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the breakdown popup is displayed with all visible items and proper formatting', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const areItemsVisible = await contractValuePage.areBreakdownItemsVisible();
  expect(areItemsVisible).toBeTruthy();
  const hasProperFormatting = await contractValuePage.hasBreakdownProperFormatting();
  expect(hasProperFormatting).toBeTruthy();
});

Then('all interactive elements function correctly including click to open and click outside to close', async function () {
  await contractValuePage.clickOutsidePopup();
  const isPopupClosed = await contractValuePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
  await contractValuePage.clickTotalValueComponent();
  const isPopupReopened = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupReopened).toBeTruthy();
  await contractValuePage.clickCloseButton();
  const isClosedByButton = await contractValuePage.isBreakdownPopupClosed();
  expect(isClosedByButton).toBeTruthy();
  const scrollFunctions = await contractValuePage.verifyScrollFunctionality();
  expect(scrollFunctions).toBeTruthy();
});

Then('the CSS styles are applied correctly including colors fonts alignment and spacing', async function () {
  await contractValuePage.clickTotalValueComponent();
  const stylesCorrect = await contractValuePage.verifyCSSStyles();
  expect(stylesCorrect).toBeTruthy();
});

Then('the browser console shows no compatibility errors or warnings', async function () {
  const consoleErrors = await contractValuePage.getConsoleErrors();
  expect(consoleErrors.length).toBe(0);
});