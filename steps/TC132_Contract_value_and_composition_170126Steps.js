const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated and opens Acticenter application in Safari browser', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyApplicationLoaded();
});

When('the user selects a previously registered contract', async function () {
  await contractValuePage.selectRegisteredContract();
});

Then('the system displays the contract value and composition component', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the component to display the contract value breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the system displays the popup with the breakdown showing all corresponding items', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  
  const hasAllItems = await contractValuePage.verifyAllBreakdownItemsDisplayed();
  expect(hasAllItems).toBeTruthy();
});

Then('all visual elements are displayed correctly aligned and with proper formatting', async function () {
  const isProperlyAligned = await contractValuePage.verifyElementsAlignment();
  expect(isProperlyAligned).toBeTruthy();
  
  const hasProperFormatting = await contractValuePage.verifyMonetaryValuesFormatting();
  expect(hasProperFormatting).toBeTruthy();
});