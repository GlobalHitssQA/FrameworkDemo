const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('I am authenticated in Acticenter from a Desktop device with Private Banking credentials', async function() {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.loginWithPrivateBankingCredentials();
  const isDesktopInterfaceLoaded = await acticenterPage.isDesktopInterfaceVisible();
  expect(isDesktopInterfaceLoaded).toBeTruthy();
});

When('I select a Private Banking contract using the client or contract search', async function() {
  await acticenterPage.clickSearchIcon();
  await acticenterPage.searchAndSelectPrivateBankingContract();
});

Then('the system displays the selected contract with the total value component visible', async function() {
  const isContractDisplayed = await acticenterPage.isContractDisplayed();
  const isTotalValueComponentVisible = await acticenterPage.isTotalValueComponentVisible();
  expect(isContractDisplayed).toBeTruthy();
  expect(isTotalValueComponentVisible).toBeTruthy();
});

When('I click on the value and composition component to display the breakdown', async function() {
  await acticenterPage.clickValueCompositionComponent();
});

Then('the system shows the Pop-up with the breakdown of applicable items for Private Banking', async function() {
  const isBreakdownPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isBreakdownPopupVisible).toBeTruthy();
});

Then('all applicable items are displayed with correct monetary format and right-aligned values', async function() {
  const areItemsDisplayedCorrectly = await acticenterPage.verifyBreakdownItemsFormat();
  expect(areItemsDisplayedCorrectly).toBeTruthy();
});

When('I verify the client or contract search functionality in the header', async function() {
  await acticenterPage.closeBreakdownPopup();
  await acticenterPage.clickHeaderSearchIcon();
});

Then('the search function with magnifying glass allows selecting BP or contract and updates the value component', async function() {
  const isSearchFunctional = await acticenterPage.verifySearchFunctionality();
  const isValueComponentUpdated = await acticenterPage.isValueComponentUpdatedAfterSearch();
  expect(isSearchFunctional).toBeTruthy();
  expect(isValueComponentUpdated).toBeTruthy();
});