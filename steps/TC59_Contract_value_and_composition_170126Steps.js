const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractSearchPage = require('../pages/ContractSearchPage');

let contractSearchPage;

Given('the user is authenticated in Acticenter', async function () {
  contractSearchPage = new ContractSearchPage(this.page);
  await contractSearchPage.verifyUserIsAuthenticated();
});

Given('the search screen is accessible via the magnifying glass icon', async function () {
  await contractSearchPage.verifyMagnifyingGlassIconIsVisible();
});

When('the user clicks on the magnifying glass icon in the Acticenter header', async function () {
  await contractSearchPage.clickMagnifyingGlassIcon();
});

Then('the system displays the general client screen with the list of BP or available contracts', async function () {
  const isContractListVisible = await contractSearchPage.isContractListVisible();
  expect(isContractListVisible).toBeTruthy();
});

When('the user selects a specific contract from the displayed list', async function () {
  await contractSearchPage.selectFirstAvailableContract();
});

Then('the system loads the selected contract in the operation screen', async function () {
  const isOperationScreenLoaded = await contractSearchPage.isOperationScreenLoaded();
  expect(isOperationScreenLoaded).toBeTruthy();
});

Then('the total contract value component is displayed with the selected contract information', async function () {
  const isValueComponentVisible = await contractSearchPage.isTotalContractValueComponentVisible();
  expect(isValueComponentVisible).toBeTruthy();
  const hasContractValue = await contractSearchPage.contractValueIsDisplayed();
  expect(hasContractValue).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractSearchPage.clickTotalContractValueComponent();
});

Then('the system displays the breakdown with all items and monetary values corresponding to the selected contract', async function () {
  const isBreakdownVisible = await contractSearchPage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBeTruthy();
  const hasMonetaryItems = await contractSearchPage.breakdownContainsMonetaryItems();
  expect(hasMonetaryItems).toBeTruthy();
});