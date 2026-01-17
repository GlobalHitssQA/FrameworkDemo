const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuationPage = require('../pages/ContractValuationPage');

let contractValuationPage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuationPage = new ContractValuationPage(this.page);
  await contractValuationPage.navigateToActicenter();
  await contractValuationPage.authenticateUser();
});

Given('the user selects a contract that contains Cedes and pagares investments', async function () {
  await contractValuationPage.searchAndSelectContractWithCedesAndPagares();
  const isContractLoaded = await contractValuationPage.isContractInformationDisplayed();
  expect(isContractLoaded).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuationPage.clickTotalContractValueComponent();
});

Then('the system displays the contract value breakdown popup', async function () {
  const isPopupVisible = await contractValuationPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Cedes and pagares section is visible in the breakdown list', async function () {
  const isSectionVisible = await contractValuationPage.isCedesAndPagaresSectionVisible();
  expect(isSectionVisible).toBeTruthy();
});

Then('the Cedes and pagares label is displayed on the left side', async function () {
  const isLabelOnLeft = await contractValuationPage.isCedesAndPagaresLabelAlignedLeft();
  expect(isLabelOnLeft).toBeTruthy();
});

Then('the Cedes and pagares monetary value is displayed on the right side', async function () {
  const isValueOnRight = await contractValuationPage.isCedesAndPagaresValueAlignedRight();
  expect(isValueOnRight).toBeTruthy();
});

Then('the Cedes and pagares section is vertically aligned with other sections', async function () {
  const isAligned = await contractValuationPage.isCedesAndPagaresSectionVerticallyAligned();
  expect(isAligned).toBeTruthy();
});