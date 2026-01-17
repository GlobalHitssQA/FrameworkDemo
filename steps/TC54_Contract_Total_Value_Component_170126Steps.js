const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let firstContractValue;
let secondContractValue;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigate();
  await contractValuePage.login();
});

Given('the user has selected the first contract', async function () {
  await contractValuePage.selectFirstAvailableContract();
});

Given('the total value component is visible', async function () {
  const isVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user records the total value of the first contract', async function () {
  firstContractValue = await contractValuePage.getTotalValueText();
  expect(firstContractValue).toBeTruthy();
});

When('the user searches for a second different contract', async function () {
  await contractValuePage.clickSearchButton();
  await contractValuePage.enterSecondContractSearch();
});

When('the user selects the second contract from search results', async function () {
  await contractValuePage.selectSecondContractFromResults();
  await contractValuePage.waitForContractToLoad();
});

Then('the total value component should display the second contract value', async function () {
  secondContractValue = await contractValuePage.getTotalValueText();
  expect(secondContractValue).toBeTruthy();
});

Then('the total value should be different from the first contract value', async function () {
  expect(secondContractValue).not.toEqual(firstContractValue);
});