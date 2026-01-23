const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractPage = require('../pages/ContractPage');

let contractPage;

Given('the user is on the OTA-ACTICENTER main page', async function () {
  contractPage = new ContractPage(this.page);
  await contractPage.navigateToMainPage();
});

When('the user navigates to the contract section', async function () {
  await contractPage.navigateToContractSection();
});

Then('the total contract value component should be visible', async function () {
  const isVisible = await contractPage.isTotalValueComponentVisible();
  expect(isVisible).toBe(true);
});

Then('the contract value should display a valid amount', async function () {
  const amount = await contractPage.getTotalContractValue();
  expect(amount).toBeTruthy();
  expect(amount).toMatch(/^\$?[\d,]+(\.\d{2})?$/);
});