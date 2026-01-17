const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;
let firstContractValues = {};
let secondContractValues = {};

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToLogin();
  await contractBreakdownPage.login(process.env.USERNAME, process.env.PASSWORD);
});

Given('the user selects the first available contract', async function () {
  await contractBreakdownPage.selectFirstContract();
});

Given('the system displays the first contract information with the total value component visible', async function () {
  const isVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the system displays the popup showing the breakdown of items for the first contract', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the user records the values of the items shown in the breakdown', async function () {
  firstContractValues = await contractBreakdownPage.getBreakdownValues();
});

When('the user closes the breakdown popup', async function () {
  await contractBreakdownPage.closeBreakdownPopup();
});

When('the user uses the search function to select a different second contract', async function () {
  await contractBreakdownPage.clickSearchIcon();
  await contractBreakdownPage.selectSecondContract();
});

Then('the system displays the second contract information', async function () {
  const isVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total value component to display the breakdown again', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the system displays the popup showing the updated breakdown with the second contract items', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the breakdown values correspond to the second contract and are different from the first contract', async function () {
  secondContractValues = await contractBreakdownPage.getBreakdownValues();
  const valuesAreDifferent = contractBreakdownPage.compareBreakdownValues(firstContractValues, secondContractValues);
  expect(valuesAreDifferent).toBeTruthy();
});