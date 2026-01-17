const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('a contract with multiple breakdown items is available', async function () {
  await contractBreakdownPage.verifyContractWithMultipleItemsExists();
});

When('the user selects a contract containing all available breakdown items', async function () {
  await contractBreakdownPage.selectContractWithAllBreakdownItems();
});

Then('the system loads the selected contract', async function () {
  await contractBreakdownPage.verifyContractIsLoaded();
});

When('the user clicks on the total value component to display the breakdown popup', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the popup displays showing the complete list of breakdown items', async function () {
  await contractBreakdownPage.verifyBreakdownPopupIsDisplayed();
  await contractBreakdownPage.verifyBreakdownItemsAreVisible();
});

Then('a vertical scrollbar appears when items exceed the popup height', async function () {
  const hasScrollbar = await contractBreakdownPage.verifyVerticalScrollbarExists();
  expect(hasScrollbar).toBeTruthy();
});

When('the user scrolls down to view all breakdown items', async function () {
  await contractBreakdownPage.scrollDownBreakdownList();
});

Then('the scroll works correctly allowing to view all items without cuts or overlaps', async function () {
  await contractBreakdownPage.verifyAllItemsVisibleAfterScroll();
  await contractBreakdownPage.verifyNoOverlapsInItems();
});

Then('the popup maintains vertical alignment with the total value component during scrolling', async function () {
  await contractBreakdownPage.verifyPopupAlignmentWithTotalValue();
});