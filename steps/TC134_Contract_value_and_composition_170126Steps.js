const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user opens the Acticenter application on an iOS device', async function() {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.openApplication();
  const isLoaded = await contractValuePage.isApplicationLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user selects a previously registered contract', async function() {
  await contractValuePage.selectContract();
});

Then('the contract value and composition component is displayed with responsive design', async function() {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user taps on the component to expand the contract value breakdown', async function() {
  await contractValuePage.tapContractValueComponent();
});

Then('the popup displays all corresponding breakdown items adapted to the device screen', async function() {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasBreakdownItems = await contractValuePage.hasBreakdownItems();
  expect(hasBreakdownItems).toBeTruthy();
});

When('the user verifies the search magnifying glass functionality', async function() {
  await contractValuePage.tapSearchMagnifyingGlass();
});

Then('the general client screen is displayed allowing contract selection', async function() {
  const isClientScreenVisible = await contractValuePage.isClientSearchScreenVisible();
  expect(isClientScreenVisible).toBeTruthy();
  await contractValuePage.closeClientSearchScreen();
});

When('the user taps outside the expanded component', async function() {
  await contractValuePage.tapOutsidePopup();
});

Then('the popup closes correctly', async function() {
  const isPopupClosed = await contractValuePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});