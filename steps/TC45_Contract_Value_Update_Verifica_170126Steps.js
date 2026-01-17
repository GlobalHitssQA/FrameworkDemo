const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractPage = require('../pages/ContractPage');

let contractPage;
let firstContractValues = {};

Given('the user is authenticated and on the Acticenter system', async function () {
  contractPage = new ContractPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.waitForPageLoad();
});

When('the user selects an initial contract', async function () {
  await contractPage.selectInitialContract();
});

Then('the system loads the contract and displays the component with the selected contract values', async function () {
  const isComponentVisible = await contractPage.isContractComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user records the values shown in the initial contract breakdown', async function () {
  firstContractValues = await contractPage.getContractBreakdownValues();
});

Then('the values of the first contract are stored for later comparison', async function () {
  expect(Object.keys(firstContractValues).length).toBeGreaterThan(0);
});

When('the user clicks on the search icon to find another contract', async function () {
  await contractPage.clickSearchIcon();
});

Then('the client general screen is displayed allowing contract selection', async function () {
  const isSearchScreenVisible = await contractPage.isClientSearchScreenVisible();
  expect(isSearchScreenVisible).toBeTruthy();
});

When('the user selects a second different contract', async function () {
  await contractPage.selectSecondContract();
});

Then('the system loads the newly selected contract', async function () {
  await contractPage.waitForContractLoad();
});

Then('the total contract value is updated correctly for the second contract', async function () {
  const newTotalValue = await contractPage.getTotalContractValue();
  expect(newTotalValue).not.toEqual(firstContractValues.totalValue);
});

When('the user expands the breakdown section', async function () {
  await contractPage.expandBreakdownSection();
});

Then('all breakdown items are updated and correspond to the second contract', async function () {
  const isBreakdownVisible = await contractPage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBeTruthy();
});

Then('the values are different from the first contract', async function () {
  const secondContractValues = await contractPage.getContractBreakdownValues();
  const valuesAreDifferent = await contractPage.compareContractValues(firstContractValues, secondContractValues);
  expect(valuesAreDifferent).toBeTruthy();
});