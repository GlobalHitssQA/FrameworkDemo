const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuationPage = require('../pages/ContractValuationPage');

let contractValuationPage;
let currentSystemDate;
let firstContractDate;

Given('I am authenticated in Acticenter', async function () {
  contractValuationPage = new ContractValuationPage(this.page);
  await contractValuationPage.navigateToLogin();
  await contractValuationPage.login();
  await contractValuationPage.waitForDashboard();
});

Given('I can see the current system date displayed in the interface', async function () {
  currentSystemDate = await contractValuationPage.getSystemDate();
  expect(currentSystemDate).toBeTruthy();
});

When('I select a contract to view its value and composition', async function () {
  await contractValuationPage.openContractSearch();
  await contractValuationPage.selectFirstAvailableContract();
});

Then('the total value component should be displayed', async function () {
  const isVisible = await contractValuationPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the valuation date should match the current system date', async function () {
  const valuationDate = await contractValuationPage.getValuationDate();
  firstContractDate = valuationDate;
  expect(valuationDate).toBe(currentSystemDate);
});

When('I select a different contract', async function () {
  await contractValuationPage.openContractSearch();
  await contractValuationPage.selectSecondAvailableContract();
});

Then('the valuation date should also match the current system date', async function () {
  const valuationDate = await contractValuationPage.getValuationDate();
  expect(valuationDate).toBe(currentSystemDate);
  expect(valuationDate).toBe(firstContractDate);
});