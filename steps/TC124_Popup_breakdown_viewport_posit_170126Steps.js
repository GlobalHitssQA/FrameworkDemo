const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated and has an active contract selected', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToContract();
});

When('the user positions the total value component near the right edge of the screen', async function () {
  await contractValuePage.positionComponentNearRightEdge();
});

Then('the total value component should be displayed correctly', async function () {
  const isVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total value component to open the breakdown pop-up', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the pop-up should adjust automatically to stay within visible screen bounds', async function () {
  const isWithinViewport = await contractValuePage.isPopupWithinViewport();
  expect(isWithinViewport).toBe(true);
});

Then('the pop-up content should be fully visible without horizontal scroll', async function () {
  const hasNoHorizontalOverflow = await contractValuePage.isPopupContentFullyVisible();
  expect(hasNoHorizontalOverflow).toBe(true);
});

When('the user positions the total value component near the bottom edge of the screen', async function () {
  await contractValuePage.closePopupIfOpen();
  await contractValuePage.positionComponentNearBottomEdge();
});

Then('the pop-up should adjust vertically to remain completely visible', async function () {
  const isVerticallyVisible = await contractValuePage.isPopupVerticallyWithinViewport();
  expect(isVerticallyVisible).toBe(true);
});

When('the user clicks outside the pop-up', async function () {
  await contractValuePage.clickOutsidePopup();
});

Then('the pop-up should close correctly', async function () {
  const isPopupClosed = await contractValuePage.isPopupClosed();
  expect(isPopupClosed).toBe(true);
});