const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let totalValueDisplayed;
let breakdownItemsSum;

Given('the user is authenticated in Acticenter with an advisor role', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('the user has access to an active contract with multiple value items', async function () {
  await contractValuePage.verifyActiveContractExists();
});

When('the user accesses the Acticenter module and selects a contract', async function () {
  await contractValuePage.selectContract();
});

Then('the contract value and composition component is displayed with the total value', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
  totalValueDisplayed = await contractValuePage.getTotalContractValue();
  expect(totalValueDisplayed).not.toBeNull();
});

When('the user clicks on the component to expand the complete breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the popup with the detailed breakdown of all applicable items is displayed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user calculates the sum of all monetary values from the breakdown items', async function () {
  breakdownItemsSum = await contractValuePage.calculateBreakdownItemsSum();
});

Then('the manual sum matches exactly with the total value shown in the main component', async function () {
  const totalValue = await contractValuePage.parseCurrencyValue(totalValueDisplayed);
  expect(breakdownItemsSum).toBeCloseTo(totalValue, 2);
});

Then('there are no rounding discrepancies in the decimal values', async function () {
  const totalValue = await contractValuePage.parseCurrencyValue(totalValueDisplayed);
  const difference = Math.abs(breakdownItemsSum - totalValue);
  expect(difference).toBeLessThan(0.01);
});