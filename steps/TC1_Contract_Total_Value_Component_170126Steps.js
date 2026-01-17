const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('I am authenticated in Acticenter as a Patrimonial Banking advisor', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginAsPatrimonialBankingAdvisor();
  await contractValuePage.verifyMainScreenIsDisplayed();
});

When('I select a Physical Person contract from Patrimonial Banking', async function () {
  await contractValuePage.openContractSelector();
  await contractValuePage.selectPhysicalPersonContract();
  await contractValuePage.waitForContractToLoad();
});

Then('I should see the total contract value component on the screen', async function () {
  const isVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the total contract value should be displayed in Mexican pesos', async function () {
  const valueText = await contractValuePage.getTotalContractValueText();
  expect(valueText).toMatch(/\$[\d,]+(\.\d{2})?\s*(MXN|pesos)?/i);
});

Then('the displayed value should correspond to the current contract total value', async function () {
  const isValueValid = await contractValuePage.verifyContractValueIsUpdated();
  expect(isValueValid).toBeTruthy();
});