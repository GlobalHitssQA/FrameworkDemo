const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter with an active contract', async function() {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.waitForContractComponentToLoad();
});

When('the user navigates to the contract value component using Tab key', async function() {
  await contractBreakdownPage.navigateToComponentUsingTab();
});

Then('the keyboard focus should be visible on the component', async function() {
  const isFocused = await contractBreakdownPage.isContractComponentFocused();
  expect(isFocused).toBeTruthy();
});

When('the user presses Enter key on the focused component', async function() {
  await contractBreakdownPage.pressEnterOnFocusedComponent();
});

Then('the breakdown popup should be displayed with all applicable contract items', async function() {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasItems = await contractBreakdownPage.hasBreakdownItems();
  expect(hasItems).toBeTruthy();
});

When('the user presses Escape key to close the popup', async function() {
  await contractBreakdownPage.pressEscapeToClosePopup();
});

Then('the breakdown popup should be closed', async function() {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeFalsy();
});

When('the user presses Enter key on the component again', async function() {
  await contractBreakdownPage.pressEnterOnFocusedComponent();
});

Then('the breakdown popup should be displayed with the same information', async function() {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasItems = await contractBreakdownPage.hasBreakdownItems();
  expect(hasItems).toBeTruthy();
});