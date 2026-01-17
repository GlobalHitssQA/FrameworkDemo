const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuationPage = require('../pages/ContractValuationPage');

let contractValuationPage;

Given('I am authenticated in Acticenter with valid advisor credentials', async function () {
  contractValuationPage = new ContractValuationPage(this.page);
  await contractValuationPage.navigateToLogin();
  await contractValuationPage.login(process.env.ADVISOR_USERNAME, process.env.ADVISOR_PASSWORD);
  const isMainScreenVisible = await contractValuationPage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

When('I select an active contract to view its value and composition', async function () {
  await contractValuationPage.openContractSearch();
  await contractValuationPage.searchAndSelectActiveContract();
  await contractValuationPage.waitForContractToLoad();
});

Then('the valuation date should be visible in the total value component', async function () {
  const isValuationDateVisible = await contractValuationPage.isValuationDateVisible();
  expect(isValuationDateVisible).toBeTruthy();
});

Then('the valuation date should be displayed in a valid format', async function () {
  const valuationDate = await contractValuationPage.getValuationDateText();
  const isValidFormat = contractValuationPage.isValidDateFormat(valuationDate);
  expect(isValidFormat).toBeTruthy();
});

Then('the valuation date should match the expected system date', async function () {
  const displayedDate = await contractValuationPage.getValuationDateText();
  const expectedDate = await contractValuationPage.getExpectedSystemDate();
  const datesMatch = contractValuationPage.compareDates(displayedDate, expectedDate);
  expect(datesMatch).toBeTruthy();
});