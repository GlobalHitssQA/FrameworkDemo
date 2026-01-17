const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with Wealth Management credentials', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginWithWealthManagementCredentials();
  const isMainScreenVisible = await contractValuePage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects an Individual Person contract from Wealth Management', async function () {
  await contractValuePage.selectIndividualPersonContract();
});

Then('the contract value and composition component is displayed', async function () {
  const isComponentVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the total contract value is shown with the review date', async function () {
  const totalValue = await contractValuePage.getTotalContractValue();
  expect(totalValue).toBeTruthy();
  const reviewDate = await contractValuePage.getReviewDate();
  expect(reviewDate).toBeTruthy();
});

When('the user clicks on the component to expand the breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('a popup is displayed with detailed breakdown showing all applicable items for WM Individual contract', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const breakdownItems = await contractValuePage.getBreakdownItemsCount();
  expect(breakdownItems).toBeGreaterThan(0);
});

Then('each item displays its monetary value aligned to the right', async function () {
  const areValuesAligned = await contractValuePage.areMonetaryValuesRightAligned();
  expect(areValuesAligned).toBeTruthy();
});