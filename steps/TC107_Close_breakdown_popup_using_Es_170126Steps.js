const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated and viewing an active contract in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.selectActiveContract();
  const isComponentVisible = await contractBreakdownPage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user clicks on the contract value component', async function () {
  await contractBreakdownPage.clickContractValueComponent();
});

Then('the breakdown popup should be displayed with the list of items', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasBreakdownItems = await contractBreakdownPage.hasBreakdownItems();
  expect(hasBreakdownItems).toBeTruthy();
});

When('the user presses the Escape key', async function () {
  await contractBreakdownPage.pressEscapeKey();
});

Then('the breakdown popup should close immediately', async function () {
  const isPopupHidden = await contractBreakdownPage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
});

Then('the focus should return to the main contract component', async function () {
  const isFocusOnMainComponent = await contractBreakdownPage.isFocusOnContractValueComponent();
  expect(isFocusOnMainComponent).toBeTruthy();
});