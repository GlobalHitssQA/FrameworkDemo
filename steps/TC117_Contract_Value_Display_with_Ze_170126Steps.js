const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let testContractNumber;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('a Casa de Bolsa contract without investments or available cash exists', async function () {
  testContractNumber = await contractValuePage.getZeroBalanceContractNumber();
  expect(testContractNumber).toBeTruthy();
});

When('the user searches for the contract using the search magnifier', async function () {
  await contractValuePage.clickSearchMagnifier();
  await contractValuePage.enterContractNumber(testContractNumber);
});

When('the user selects the contract from the results', async function () {
  await contractValuePage.selectContractFromResults(testContractNumber);
  await contractValuePage.waitForContractToLoad();
});

Then('the main component should display a total value of {string}', async function (expectedValue) {
  const totalValue = await contractValuePage.getTotalContractValue();
  expect(totalValue).toBe(expectedValue);
});

When('the user clicks on the component to expand the breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the breakdown popup should be visible', async function () {
  const isVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isVisible).toBe(true);
});

Then('all applicable sections should display {string}', async function (expectedValue) {
  const allSectionsZero = await contractValuePage.verifyAllSectionsDisplayValue(expectedValue);
  expect(allSectionsZero).toBe(true);
});

Then('the section {string} should display {string}', async function (sectionName, expectedValue) {
  const sectionValue = await contractValuePage.getSectionValue(sectionName);
  expect(sectionValue).toBe(expectedValue);
});