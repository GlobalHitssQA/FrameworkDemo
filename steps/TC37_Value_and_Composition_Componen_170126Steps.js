const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user is authenticated in Acticenter from a Desktop device with Patrimonial Banking credentials', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToActicenter();
  await valueCompositionPage.authenticatePatrimonialBankingUser();
  await valueCompositionPage.verifyDesktopInterfaceDisplayed();
});

When('the user selects a Patrimonial Banking contract from the query module', async function () {
  await valueCompositionPage.openQueryModule();
  await valueCompositionPage.selectPatrimonialBankingContract();
});

Then('the system displays the contract with the total value component visible on screen', async function () {
  const isVisible = await valueCompositionPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on any part of the value and composition component', async function () {
  await valueCompositionPage.clickValueCompositionComponent();
});

Then('the system displays the popup with the complete breakdown of applicable items for Patrimonial Banking', async function () {
  const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the breakdown shows all items with values aligned to the right including purchasing power or cash, pending settlement, debt funds, hedge funds, variable income funds, cash in transit, certificates and promissory notes, money market and capital market', async function () {
  const areItemsVisible = await valueCompositionPage.verifyAllBreakdownItemsDisplayed();
  expect(areItemsVisible).toBeTruthy();
  const areValuesAlignedRight = await valueCompositionPage.verifyValuesAlignedRight();
  expect(areValuesAlignedRight).toBeTruthy();
});

When('the user clicks outside the breakdown popup', async function () {
  await valueCompositionPage.clickOutsidePopup();
});

Then('the system closes the popup and returns to the total value component view', async function () {
  const isPopupClosed = await valueCompositionPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
  const isComponentVisible = await valueCompositionPage.isTotalValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});