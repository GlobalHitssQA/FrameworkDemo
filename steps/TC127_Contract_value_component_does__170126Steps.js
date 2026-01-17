const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterContractPage = require('../pages/ActicenterContractPage');

let acticenterContractPage;

Given('the user is authenticated and accesses a contract in Acticenter', async function () {
  acticenterContractPage = new ActicenterContractPage(this.page);
  await acticenterContractPage.navigateToContract();
});

When('the interface loads completely', async function () {
  await acticenterContractPage.waitForInterfaceToLoad();
});

Then('the total value component and other operation flow elements should be visible', async function () {
  const isTotalValueVisible = await acticenterContractPage.isTotalValueComponentVisible();
  const areFlowElementsVisible = await acticenterContractPage.areOperationFlowElementsVisible();
  expect(isTotalValueVisible).toBe(true);
  expect(areFlowElementsVisible).toBe(true);
});

When('the user clicks on the total value component to display the breakdown popup', async function () {
  await acticenterContractPage.clickTotalValueComponent();
});

Then('the popup should display without affecting the position or visibility of other components', async function () {
  const isPopupVisible = await acticenterContractPage.isBreakdownPopupVisible();
  const areOtherComponentsIntact = await acticenterContractPage.areOtherComponentsPositionedCorrectly();
  expect(isPopupVisible).toBe(true);
  expect(areOtherComponentsIntact).toBe(true);
});

When('the user clicks on the buy\/sell icon or another flow element with the popup open', async function () {
  await acticenterContractPage.clickBuySellIcon();
});

Then('the popup should close automatically', async function () {
  const isPopupClosed = await acticenterContractPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBe(true);
});

When('the user performs a client\/contract search using the header search icon while the component is visible', async function () {
  await acticenterContractPage.clickHeaderSearchIcon();
  await acticenterContractPage.performClientSearch('test-client');
});

Then('the search functionality should operate normally without being blocked by the total value component', async function () {
  const isSearchFunctional = await acticenterContractPage.isSearchResultsDisplayed();
  expect(isSearchFunctional).toBe(true);
});

When('the user changes to a different contract', async function () {
  await acticenterContractPage.selectDifferentContract();
});

Then('the total value component should update correctly showing the new contract data without interfering with the transition', async function () {
  const isComponentUpdated = await acticenterContractPage.isTotalValueComponentUpdated();
  const isTransitionSmooth = await acticenterContractPage.isTransitionWithoutInterference();
  expect(isComponentUpdated).toBe(true);
  expect(isTransitionSmooth).toBe(true);
});