const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValueAccessibilityPage = require('../pages/ContractValueAccessibilityPage');

let contractValuePage;

Given('the user has a screen reader activated and configured', async function () {
  contractValuePage = new ContractValueAccessibilityPage(this.page);
  await contractValuePage.verifyPageIsAccessible();
});

Given('the user is authenticated in Acticenter with an active contract', async function () {
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

When('the user navigates to the contract total value component', async function () {
  await contractValuePage.navigateToContractValueComponent();
});

Then('the screen reader announces the component with appropriate descriptive labels', async function () {
  const hasAriaLabel = await contractValuePage.verifyComponentHasAccessibleLabel();
  expect(hasAriaLabel).toBeTruthy();
});

When('the user activates the component to open the breakdown popup', async function () {
  await contractValuePage.openBreakdownPopupWithKeyboard();
});

Then('the popup opens and the screen reader announces the breakdown items with their values', async function () {
  const isPopupAccessible = await contractValuePage.verifyPopupIsAccessible();
  expect(isPopupAccessible).toBeTruthy();
});

When('the user navigates through each breakdown item using the screen reader', async function () {
  await contractValuePage.navigateThroughBreakdownItems();
});

Then('the screen reader correctly announces each item including purchasing power and cash and pending settlements and funds with their monetary values', async function () {
  const allItemsAccessible = await contractValuePage.verifyAllBreakdownItemsAreAccessible();
  expect(allItemsAccessible).toBeTruthy();
});

When('the user closes the popup using screen reader commands', async function () {
  await contractValuePage.closePopupWithKeyboard();
});

Then('the screen reader announces the popup closure and focus returns to the main component', async function () {
  const focusReturned = await contractValuePage.verifyFocusReturnedToMainComponent();
  expect(focusReturned).toBeTruthy();
});