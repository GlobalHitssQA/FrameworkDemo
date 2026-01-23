const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated and has an active contract selected in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyMainScreenWithActiveContract();
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the breakdown popup with the itemized list should be displayed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user clicks outside the breakdown component', async function () {
  await contractValuePage.clickOutsideBreakdownPopup();
});

Then('the breakdown popup should close automatically', async function () {
  const isPopupHidden = await contractValuePage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
});

Then('the total value component should remain visible in its initial state', async function () {
  const isComponentVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
  const isInitialState = await contractValuePage.isTotalValueComponentInInitialState();
  expect(isInitialState).toBeTruthy();
});