const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with an active contract', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.waitForPageLoad();
});

When('the user navigates to the contract value component using Tab key', async function () {
  await contractValuePage.navigateToComponentWithTab();
});

Then('the keyboard focus should be positioned on the component and visually identifiable', async function () {
  const isFocused = await contractValuePage.isContractComponentFocused();
  expect(isFocused).toBeTruthy();
  const hasFocusIndicator = await contractValuePage.hasFocusIndicatorVisible();
  expect(hasFocusIndicator).toBeTruthy();
});

When('the user presses Enter key on the component', async function () {
  await contractValuePage.pressEnterOnComponent();
});

Then('the breakdown popup should be displayed correctly', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user navigates through popup elements using Tab key', async function () {
  await contractValuePage.navigateThroughPopupWithTab();
});

Then('the focus should move sequentially through all breakdown items and remain visible', async function () {
  const allItemsFocusable = await contractValuePage.areAllBreakdownItemsFocusable();
  expect(allItemsFocusable).toBeTruthy();
});

When('the user presses Escape key to close the popup', async function () {
  await contractValuePage.pressEscapeToClosePopup();
});

Then('the popup should close and focus should return to the main component', async function () {
  const isPopupClosed = await contractValuePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
  const focusReturnedToMain = await contractValuePage.isFocusOnMainComponent();
  expect(focusReturnedToMain).toBeTruthy();
});

Then('all interactive elements should be accessible without using the mouse', async function () {
  const allAccessible = await contractValuePage.verifyAllElementsKeyboardAccessible();
  expect(allAccessible).toBeTruthy();
});