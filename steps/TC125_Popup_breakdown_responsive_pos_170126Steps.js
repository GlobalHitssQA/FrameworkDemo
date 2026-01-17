const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractPopupPage = require('../pages/ContractPopupPage');

let contractPopupPage;

Given('the user is authenticated and navigates to an active contract in Acticenter', async function () {
  contractPopupPage = new ContractPopupPage(this.page);
  await contractPopupPage.navigateToContract();
});

When('the user sets the browser resolution to 1920x1080 Full HD', async function () {
  await contractPopupPage.setViewportSize(1920, 1080);
});

When('the user clicks on the total value component to display the popup', async function () {
  await contractPopupPage.clickTotalValueComponent();
});

Then('the popup should be displayed with correct positioning and alignment', async function () {
  const isVisible = await contractPopupPage.isPopupVisible();
  expect(isVisible).toBeTruthy();
  const isAligned = await contractPopupPage.isPopupAlignedWithComponent();
  expect(isAligned).toBeTruthy();
  await contractPopupPage.closePopup();
});

When('the user changes the browser resolution to 1366x768', async function () {
  await contractPopupPage.setViewportSize(1366, 768);
});

Then('the popup should adapt correctly to the new resolution maintaining functionality and legibility', async function () {
  const isVisible = await contractPopupPage.isPopupVisible();
  expect(isVisible).toBeTruthy();
  const isWithinBounds = await contractPopupPage.isPopupWithinViewport();
  expect(isWithinBounds).toBeTruthy();
  const isLegible = await contractPopupPage.isPopupContentLegible();
  expect(isLegible).toBeTruthy();
  await contractPopupPage.closePopup();
});

When('the user changes the browser resolution to 1280x720', async function () {
  await contractPopupPage.setViewportSize(1280, 720);
});

Then('the popup should display correctly within screen boundaries', async function () {
  const isVisible = await contractPopupPage.isPopupVisible();
  expect(isVisible).toBeTruthy();
  const isWithinBounds = await contractPopupPage.isPopupWithinViewport();
  expect(isWithinBounds).toBeTruthy();
  await contractPopupPage.closePopup();
});

When('the user changes the browser resolution to 768x1024 tablet portrait mode', async function () {
  await contractPopupPage.setViewportSize(768, 1024);
});

Then('the popup should adjust to responsive view maintaining functionality', async function () {
  const isVisible = await contractPopupPage.isPopupVisible();
  expect(isVisible).toBeTruthy();
  const isResponsive = await contractPopupPage.isPopupResponsive();
  expect(isResponsive).toBeTruthy();
});

Then('the popup should maintain vertical alignment with the total value component across all resolutions', async function () {
  const isAligned = await contractPopupPage.isPopupVerticallyAligned();
  expect(isAligned).toBeTruthy();
  await contractPopupPage.closePopup();
});