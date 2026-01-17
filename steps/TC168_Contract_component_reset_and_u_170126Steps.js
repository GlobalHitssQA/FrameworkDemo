const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractComponentPage = require('../pages/ContractComponentPage');

let contractPage;
let firstContractValues;
let secondContractValues;

Given('the user is authenticated in Acticenter with an initial contract selected', async function () {
  contractPage = new ContractComponentPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.waitForContractComponentToLoad();
  const isComponentVisible = await contractPage.isContractComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user clicks on the component to display the breakdown of the first contract', async function () {
  await contractPage.clickContractComponent();
});

Then('the breakdown opens showing the items and values of the first selected contract', async function () {
  const isBreakdownVisible = await contractPage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBeTruthy();
  firstContractValues = await contractPage.getBreakdownValues();
  expect(firstContractValues.length).toBeGreaterThan(0);
});

When('the user clicks on the search magnifying glass to find a different client or contract', async function () {
  await contractPage.clickSearchMagnifyingGlass();
  const isSearchVisible = await contractPage.isSearchPanelVisible();
  expect(isSearchVisible).toBeTruthy();
});

When('the user selects a different contract from the search results', async function () {
  await contractPage.searchForContract('second-contract');
  await contractPage.selectContractFromResults(1);
});

Then('the component resets and displays the values corresponding to the new selected contract', async function () {
  await contractPage.waitForContractComponentToLoad();
  const currentTotalValue = await contractPage.getContractTotalValue();
  expect(currentTotalValue).toBeTruthy();
});

Then('the breakdown is automatically closed when changing contracts', async function () {
  const isBreakdownVisible = await contractPage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBeFalsy();
});

When('the user expands the breakdown of the new contract', async function () {
  await contractPage.clickContractComponent();
  const isBreakdownVisible = await contractPage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBeTruthy();
});

Then('the breakdown displays the specific items and values of the new contract without mixing information from the previous contract', async function () {
  secondContractValues = await contractPage.getBreakdownValues();
  expect(secondContractValues.length).toBeGreaterThan(0);
  const valuesAreDifferent = JSON.stringify(firstContractValues) !== JSON.stringify(secondContractValues);
  expect(valuesAreDifferent).toBeTruthy();
  await contractPage.closeBreakdownPopup();
});