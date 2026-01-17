const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter on a touch device', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyApplicationLoaded();
});

Given('the user has an active contract selected', async function () {
  await contractBreakdownPage.selectActiveContract();
  await contractBreakdownPage.verifyContractValueComponentVisible();
});

When('the user taps on the contract value component', async function () {
  await contractBreakdownPage.tapOnContractValueComponent();
});

Then('the breakdown popup should be displayed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the popup should show all applicable breakdown items', async function () {
  const hasBreakdownItems = await contractBreakdownPage.hasBreakdownItems();
  expect(hasBreakdownItems).toBeTruthy();
});

Then('the breakdown items should be vertically aligned', async function () {
  const isVerticallyAligned = await contractBreakdownPage.verifyItemsVerticalAlignment();
  expect(isVerticallyAligned).toBeTruthy();
});