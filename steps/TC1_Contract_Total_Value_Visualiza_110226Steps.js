const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is on the main dashboard page', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigate();
});

When('the user views the contract total value component', async function () {
  await contractValuePage.waitForContractValueComponent();
});

Then('the total contract value should be displayed', async function () {
  const isVisible = await contractValuePage.isContractValueVisible();
  expect(isVisible).toBeTruthy();
});

Then('the value should be formatted as currency', async function () {
  const valueText = await contractValuePage.getContractValueText();
  const currencyPattern = /^\$[\d,]+(\.\d{2})?$/;
  expect(valueText).toMatch(currencyPattern);
});