const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter and viewing a contract in Desktop mode', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.selectActiveContract();
});

When('the user views the contract value component', async function () {
  await contractValuePage.waitForContractComponentVisible();
});

Then('the component should be displayed in closed state showing only total value', async function () {
  const isClosed = await contractValuePage.isComponentInClosedState();
  expect(isClosed).toBeTruthy();
  const totalValueVisible = await contractValuePage.isTotalValueVisible();
  expect(totalValueVisible).toBeTruthy();
});

When('the user clicks on the contract value component', async function () {
  await contractValuePage.clickContractComponent();
});

Then('the breakdown popup should display with all applicable monetary items', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasMonetaryItems = await contractValuePage.hasMonetaryItems();
  expect(hasMonetaryItems).toBeTruthy();
});

Then('all items should show their monetary values on the right side', async function () {
  const allItemsHaveValues = await contractValuePage.allItemsDisplayMonetaryValues();
  expect(allItemsHaveValues).toBeTruthy();
});

When('the user clicks outside the expanded component', async function () {
  await contractValuePage.clickOutsideComponent();
});

Then('the breakdown should close and return to initial state', async function () {
  const isClosed = await contractValuePage.isComponentInClosedState();
  expect(isClosed).toBeTruthy();
  const isPopupHidden = await contractValuePage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
});

When('the user clicks on the component again', async function () {
  await contractValuePage.clickContractComponent();
});

Then('the breakdown popup should display correctly again', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasMonetaryItems = await contractValuePage.hasMonetaryItems();
  expect(hasMonetaryItems).toBeTruthy();
});