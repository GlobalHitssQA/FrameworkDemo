const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with a Patrimonial Banking profile', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginWithPatrimonialBankingProfile();
  const isMainScreenVisible = await contractValuePage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects an Individual Person contract from Patrimonial Banking', async function () {
  await contractValuePage.selectIndividualPersonContract();
  const isContractLoaded = await contractValuePage.isContractInfoLoaded();
  expect(isContractLoaded).toBeTruthy();
});

Then('the total contract value component should be displayed on the screen', async function () {
  const isComponentVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the system displays the popup with contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the applicable items for Individual Person Patrimonial Banking are shown correctly', async function () {
  const areItemsDisplayed = await contractValuePage.areApplicableItemsDisplayed();
  expect(areItemsDisplayed).toBeTruthy();
});

Then('all monetary values are displayed on the right side with correct currency format', async function () {
  const areValuesFormatted = await contractValuePage.areMonetaryValuesFormattedCorrectly();
  expect(areValuesFormatted).toBeTruthy();
});

When('the user clicks outside the breakdown component', async function () {
  await contractValuePage.clickOutsideBreakdownPopup();
});

Then('the breakdown popup closes correctly', async function () {
  const isPopupClosed = await contractValuePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});