const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with Wealth Management profile', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginWithWealthManagementCredentials();
  const isMainScreenVisible = await contractValuePage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a Persona Moral contract from Wealth Management', async function () {
  await contractValuePage.openContractSearch();
  await contractValuePage.selectPersonaMoralContract();
});

Then('the contract value and composition component is displayed', async function () {
  const isComponentVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the total contract value is shown with the review date', async function () {
  const totalValue = await contractValuePage.getTotalContractValue();
  expect(totalValue).not.toBeNull();
  const reviewDate = await contractValuePage.getReviewDate();
  expect(reviewDate).not.toBeNull();
});

When('the user clicks on the component to expand the breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('a popup is displayed with the detailed breakdown showing all applicable items for WM PM contract', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasBreakdownItems = await contractValuePage.hasBreakdownItems();
  expect(hasBreakdownItems).toBeTruthy();
});

Then('the items without monetary value are displayed as $0.00', async function () {
  const zeroValueItems = await contractValuePage.getZeroValueItems();
  for (const item of zeroValueItems) {
    expect(item).toContain('$0.00');
  }
});