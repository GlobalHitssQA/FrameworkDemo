const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated and opens Acticenter application on Android device', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.verifyApplicationLoaded();
});

When('the user selects a previously registered contract', async function () {
  await contractValuePage.selectRegisteredContract();
});

Then('the contract value and composition component is displayed with responsive design', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user taps on the component to display the value breakdown', async function () {
  await contractValuePage.tapContractValueComponent();
});

Then('the popup displays all breakdown items adapted to the device screen', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const areItemsDisplayed = await contractValuePage.areBreakdownItemsDisplayed();
  expect(areItemsDisplayed).toBeTruthy();
});

When('the user taps on the search magnifying glass icon', async function () {
  await contractValuePage.tapSearchMagnifyingGlass();
});

Then('the general client screen is displayed allowing contract selection', async function () {
  const isClientScreenVisible = await contractValuePage.isClientSearchScreenVisible();
  expect(isClientScreenVisible).toBeTruthy();
  await contractValuePage.verifyContractSelectionAvailable();
});

When('the user taps outside the expanded component', async function () {
  await contractValuePage.tapOutsidePopup();
});

Then('the popup closes correctly', async function () {
  const isPopupClosed = await contractValuePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});