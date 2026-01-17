const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with an active contract selected', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.authenticateUser();
  await contractValuePage.selectActiveContract();
});

Given('the contract value component is visible on the screen', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the contract value component', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the breakdown popup is displayed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

When('the user clicks outside the popup and the contract value component', async function () {
  await contractValuePage.clickOutsidePopup();
});

Then('the breakdown popup is closed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(false);
});

Then('the contract value component remains visible and functional', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBe(true);
  const isClickable = await contractValuePage.isContractValueComponentClickable();
  expect(isClickable).toBe(true);
});