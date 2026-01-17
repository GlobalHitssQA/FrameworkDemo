const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter application', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.performLogin();
});

Given('the browser is configured with Responsive Portrait resolution', async function () {
  await contractValuePage.setResponsivePortraitViewport();
});

When('the user searches and selects a valid contract', async function () {
  await contractValuePage.clickSearchButton();
  await contractValuePage.enterContractSearch();
  await contractValuePage.selectFirstContractResult();
});

Then('the contract total value component is displayed', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the contract total value component', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the breakdown popup is displayed on the right side with all applicable monetary values', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  
  const hasMonetaryValues = await contractValuePage.hasMonetaryValuesInBreakdown();
  expect(hasMonetaryValues).toBeTruthy();
  
  const isAlignedRight = await contractValuePage.isPopupAlignedVertically();
  expect(isAlignedRight).toBeTruthy();
});