const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterWealthPage = require('../pages/ActicenterWealthPage');

let acticenterWealthPage;

Given('the user is authenticated in Acticenter from a Desktop device with Wealth Management credentials', async function () {
  acticenterWealthPage = new ActicenterWealthPage(this.page);
  await acticenterWealthPage.navigateToActicenter();
  await acticenterWealthPage.loginAsWealthManagementUser();
  const isDesktopInterfaceVisible = await acticenterWealthPage.isDesktopInterfaceDisplayed();
  expect(isDesktopInterfaceVisible).toBeTruthy();
});

When('the user selects a Wealth Management contract from the operation module', async function () {
  await acticenterWealthPage.selectWealthManagementContract();
});

Then('the system loads the contract with the total value component visible on screen', async function () {
  const isTotalValueVisible = await acticenterWealthPage.isTotalValueComponentVisible();
  expect(isTotalValueVisible).toBeTruthy();
});

When('the user clicks on the value and composition component to expand the breakdown', async function () {
  await acticenterWealthPage.clickValueCompositionComponent();
});

Then('the system displays a popup showing the breakdown of applicable Wealth Management items', async function () {
  const isPopupVisible = await acticenterWealthPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('all applicable items are displayed with their values including Buying power MXN for Brokerage House and Cash MXN for Bank and Cash USD if applicable and Pending settlement and Debt funds and Hedge funds and Equity funds and Cash in transit for Bank and CDs and promissory notes and Money market and Capital market', async function () {
  const areAllItemsVisible = await acticenterWealthPage.areAllBreakdownItemsVisible();
  expect(areAllItemsVisible).toBeTruthy();
});

Then('the breakdown shows all items with correct monetary format and values aligned to the right and zero values displayed as zero pesos', async function () {
  const hasCorrectFormat = await acticenterWealthPage.validateMonetaryFormat();
  expect(hasCorrectFormat).toBeTruthy();
  const areValuesAlignedRight = await acticenterWealthPage.areValuesRightAligned();
  expect(areValuesAlignedRight).toBeTruthy();
  const hasCorrectZeroFormat = await acticenterWealthPage.validateZeroValuesFormat();
  expect(hasCorrectZeroFormat).toBeTruthy();
});

When('the user clicks on the magnifying glass in the header to search for another contract', async function () {
  await acticenterWealthPage.clickSearchMagnifyingGlass();
});

Then('the system presents the general client or BP search screen allowing selection of another contract', async function () {
  const isSearchScreenVisible = await acticenterWealthPage.isClientSearchScreenVisible();
  expect(isSearchScreenVisible).toBeTruthy();
});