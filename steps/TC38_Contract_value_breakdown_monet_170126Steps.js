const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('I am authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToLogin();
  await contractBreakdownPage.login();
});

Given('I have selected a contract with multiple value items', async function () {
  await contractBreakdownPage.searchAndSelectContract();
  const isContractLoaded = await contractBreakdownPage.isContractInformationDisplayed();
  expect(isContractLoaded).toBeTruthy();
});

When('I click on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValue();
});

Then('the breakdown popup should be displayed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('all monetary values should be right-aligned', async function () {
  const areValuesRightAligned = await contractBreakdownPage.areMonetaryValuesRightAligned();
  expect(areValuesRightAligned).toBeTruthy();
});

Then('all item labels should be left-aligned', async function () {
  const areLabelsLeftAligned = await contractBreakdownPage.areItemLabelsLeftAligned();
  expect(areLabelsLeftAligned).toBeTruthy();
});