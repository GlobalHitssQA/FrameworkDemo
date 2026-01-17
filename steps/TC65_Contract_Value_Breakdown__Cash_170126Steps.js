const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValueBreakdownPage = require('../pages/ContractValueBreakdownPage');

let contractValueBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractValueBreakdownPage = new ContractValueBreakdownPage(this.page);
  await contractValueBreakdownPage.navigateToActicenter();
  await contractValueBreakdownPage.waitForAuthentication();
});

Given('the user has selected a contract that handles USD currency', async function () {
  await contractValueBreakdownPage.selectUSDContract();
});

When('the user views the operation screen with the total contract value component', async function () {
  const isVisible = await contractValueBreakdownPage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValueBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractValueBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Cash USD label is visible in the breakdown list', async function () {
  const isLabelVisible = await contractValueBreakdownPage.isCashUSDLabelVisible();
  expect(isLabelVisible).toBeTruthy();
});

Then('the Cash USD label name matches the Look and Feel specifications', async function () {
  const labelText = await contractValueBreakdownPage.getCashUSDLabelText();
  expect(labelText).toBe('Efectivo USD');
  
  const labelStyles = await contractValueBreakdownPage.getCashUSDLabelStyles();
  expect(labelStyles).toBeDefined();
});