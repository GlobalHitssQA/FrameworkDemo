const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValuationBreakdownPage = require('../pages/ValuationBreakdownPage');

let valuationBreakdownPage;

Given('the user is authenticated in Acticenter with valid credentials', async function () {
  valuationBreakdownPage = new ValuationBreakdownPage(this.page);
  await valuationBreakdownPage.navigate();
  await valuationBreakdownPage.login(process.env.ACTICENTER_USER, process.env.ACTICENTER_PASSWORD);
});

Given('the main screen is displayed', async function () {
  const isMainScreenVisible = await valuationBreakdownPage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a contract that contains capital market investments', async function () {
  await valuationBreakdownPage.openContractSearch();
  await valuationBreakdownPage.selectContractWithCapitalMarketInvestments();
});

Then('the system loads the selected contract information', async function () {
  const isContractLoaded = await valuationBreakdownPage.isContractInformationLoaded();
  expect(isContractLoaded).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await valuationBreakdownPage.clickTotalContractValue();
});

Then('the system displays the popup with the contract value breakdown', async function () {
  const isPopupVisible = await valuationBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Capital Market section is visible in the breakdown list', async function () {
  const isCapitalMarketVisible = await valuationBreakdownPage.isCapitalMarketSectionVisible();
  expect(isCapitalMarketVisible).toBeTruthy();
});

Then('the section name is aligned to the left and the monetary value is aligned to the right', async function () {
  const isNameLeftAligned = await valuationBreakdownPage.isCapitalMarketNameLeftAligned();
  const isValueRightAligned = await valuationBreakdownPage.isCapitalMarketValueRightAligned();
  expect(isNameLeftAligned).toBeTruthy();
  expect(isValueRightAligned).toBeTruthy();
});