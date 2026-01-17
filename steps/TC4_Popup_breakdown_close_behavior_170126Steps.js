const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BreakdownPopupPage = require('../pages/BreakdownPopupPage');

let breakdownPopupPage;

Given('the user is authenticated in Acticenter with a selected contract', async function () {
  breakdownPopupPage = new BreakdownPopupPage(this.page);
  await breakdownPopupPage.navigateToContractView();
  await breakdownPopupPage.verifyUserIsAuthenticated();
  await breakdownPopupPage.verifyContractIsSelected();
});

When('the user clicks on the total contract value component', async function () {
  await breakdownPopupPage.clickTotalContractValueComponent();
});

Then('the system displays the popup with the contract breakdown', async function () {
  const isPopupVisible = await breakdownPopupPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user clicks outside the popup and component area', async function () {
  await breakdownPopupPage.clickOutsidePopup();
});

Then('the system automatically closes the breakdown popup', async function () {
  const isPopupHidden = await breakdownPopupPage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
});

Then('the total contract value component remains visible in its original position', async function () {
  const isComponentVisible = await breakdownPopupPage.isTotalContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});