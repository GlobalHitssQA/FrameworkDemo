const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('I am authenticated and accessing a contract with monetary values', async function() {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToContract();
});

When('I view the contract value and composition component', async function() {
  const isComponentVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('I click on the component to display the breakdown popup', async function() {
  await contractValuePage.clickContractValueComponent();
  await contractValuePage.waitForBreakdownPopup();
});

Then('all monetary values should use period as decimal separator', async function() {
  const monetaryValues = await contractValuePage.getAllMonetaryValues();
  const decimalFormatRegex = /^-?\$?[\d,]+\.\d{2}$/;
  
  for (const value of monetaryValues) {
    const cleanValue = value.replace(/[MXN|USD|\s]/g, '').trim();
    expect(cleanValue).toMatch(decimalFormatRegex);
  }
});

Then('values with zero decimals should display with two decimal places', async function() {
  const monetaryValues = await contractValuePage.getAllMonetaryValues();
  const twoDecimalPlacesRegex = /\.\d{2}$/;
  
  for (const value of monetaryValues) {
    expect(value).toMatch(twoDecimalPlacesRegex);
  }
});