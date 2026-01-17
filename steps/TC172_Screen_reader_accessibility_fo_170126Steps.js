const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user has a screen reader activated and functioning', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.verifyPageAccessibilityStructure();
});

Given('the user is authenticated in Acticenter with an active contract', async function () {
  await contractValuePage.navigateToApplication();
  await contractValuePage.verifyUserIsAuthenticated();
});

When('the user navigates to the contract value and composition component', async function () {
  await contractValuePage.navigateToContractValueComponent();
});

Then('the screen reader announces the component and its purpose', async function () {
  const hasAccessibleLabel = await contractValuePage.verifyComponentHasAccessibleLabel();
  expect(hasAccessibleLabel).toBeTruthy();
  const hasAriaDescription = await contractValuePage.verifyComponentHasAriaDescription();
  expect(hasAriaDescription).toBeTruthy();
});

When('the user clicks on the component to display the breakdown popup', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the screen reader announces the popup opening and reads the content in a structured manner', async function () {
  const popupIsVisible = await contractValuePage.verifyBreakdownPopupIsVisible();
  expect(popupIsVisible).toBeTruthy();
  const hasAriaLive = await contractValuePage.verifyPopupHasAriaLiveRegion();
  expect(hasAriaLive).toBeTruthy();
  const hasProperStructure = await contractValuePage.verifyPopupHasProperHeadingStructure();
  expect(hasProperStructure).toBeTruthy();
});

When('the user navigates through each breakdown item using the screen reader', async function () {
  await contractValuePage.navigateThroughBreakdownItems();
});

Then('the screen reader correctly reads each item label and its associated monetary value', async function () {
  const itemsHaveLabels = await contractValuePage.verifyAllItemsHaveAccessibleLabels();
  expect(itemsHaveLabels).toBeTruthy();
  const valuesHaveAriaLabels = await contractValuePage.verifyMonetaryValuesHaveAriaLabels();
  expect(valuesHaveAriaLabels).toBeTruthy();
});

When('the user closes the breakdown popup', async function () {
  await contractValuePage.closeBreakdownPopup();
});

Then('the screen reader announces the component closure and returns focus to the main element', async function () {
  const popupIsClosed = await contractValuePage.verifyBreakdownPopupIsClosed();
  expect(popupIsClosed).toBeTruthy();
  const focusReturned = await contractValuePage.verifyFocusReturnedToMainElement();
  expect(focusReturned).toBeTruthy();
});