const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('a contract without Cedes and Pagares investments is available', async function () {
  await contractBreakdownPage.verifyContractWithoutCedesAndPagaresIsAvailable();
});

When('the user selects the contract without Cedes and Pagares investments', async function () {
  await contractBreakdownPage.selectContractWithoutCedesAndPagares();
});

Then('the system loads the contract correctly', async function () {
  const isLoaded = await contractBreakdownPage.verifyContractIsLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user clicks on the total value component to open the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the breakdown popup displays with the complete list of contract sections', async function () {
  const isPopupVisible = await contractBreakdownPage.verifyBreakdownPopupIsVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasSections = await contractBreakdownPage.verifyBreakdownHasSections();
  expect(hasSections).toBeTruthy();
});

When('the user locates the Cedes and Pagares section in the breakdown', async function () {
  await contractBreakdownPage.locateCedesAndPagaresSection();
});

Then('the Cedes and Pagares section shows a value of zero pesos', async function () {
  const value = await contractBreakdownPage.getCedesAndPagaresValue();
  expect(value).toMatch(/\$0\.00|\$0|0\.00/);
});

Then('the breakdown list is vertically aligned with the main value component', async function () {
  const isAligned = await contractBreakdownPage.verifyBreakdownVerticalAlignment();
  expect(isAligned).toBeTruthy();
});