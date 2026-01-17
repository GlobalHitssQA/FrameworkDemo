const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated and has a contract selected on a mobile device', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToContractView();
  await contractValuePage.verifyComponentDisplayedOnMobile();
});

When('the user taps on the total contract value component', async function () {
  await contractValuePage.tapContractValueComponent();
});

Then('the breakdown popup should be displayed correctly', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

When('the user taps outside the breakdown popup area', async function () {
  await contractValuePage.tapOutsidePopup();
});

Then('the breakdown popup should close automatically', async function () {
  const isPopupHidden = await contractValuePage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBe(true);
});

Then('the component should respond to single touch without requiring multiple taps', async function () {
  const respondedToSingleTap = await contractValuePage.verifySingleTapResponse();
  expect(respondedToSingleTap).toBe(true);
});

Then('the touch target area should be large enough for comfortable mobile interaction', async function () {
  const touchTargetSize = await contractValuePage.getTouchTargetSize();
  expect(touchTargetSize.width).toBeGreaterThanOrEqual(44);
  expect(touchTargetSize.height).toBeGreaterThanOrEqual(44);
});