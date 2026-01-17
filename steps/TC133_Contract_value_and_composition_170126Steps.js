const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter application on Edge browser', async function() {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyApplicationLoaded();
});

When('the user selects a previously registered contract', async function() {
  await contractValuePage.selectContract();
});

Then('the contract value and composition component is displayed', async function() {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the component to expand the breakdown', async function() {
  await contractValuePage.clickContractValueComponent();
});

Then('the breakdown popup displays all corresponding items', async function() {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  
  const hasAllItems = await contractValuePage.verifyAllBreakdownItemsDisplayed();
  expect(hasAllItems).toBeTruthy();
});

Then('all visual elements are properly aligned and formatted', async function() {
  const isProperlyAligned = await contractValuePage.verifyElementsAlignment();
  expect(isProperlyAligned).toBeTruthy();
  
  const isMonetaryFormatCorrect = await contractValuePage.verifyMonetaryValuesFormat();
  expect(isMonetaryFormatCorrect).toBeTruthy();
});