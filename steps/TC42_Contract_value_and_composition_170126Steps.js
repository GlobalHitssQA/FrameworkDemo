const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractCompositionPage = require('../pages/ContractCompositionPage');

let contractPage;

Given('the user is authenticated in Acticenter with Patrimonial Banking profile', async function () {
  contractPage = new ContractCompositionPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.loginWithPatrimonialBankingProfile();
  const isMainScreenVisible = await contractPage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a Corporate Person contract from Patrimonial Banking', async function () {
  await contractPage.selectCorporatePersonContract();
});

Then('the contract value and composition component is displayed', async function () {
  const isComponentVisible = await contractPage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the total contract value is shown with the review date', async function () {
  const totalValue = await contractPage.getTotalContractValue();
  expect(totalValue).not.toBeNull();
  const reviewDate = await contractPage.getReviewDate();
  expect(reviewDate).not.toBeNull();
});

When('the user clicks on the component to expand the breakdown', async function () {
  await contractPage.clickContractValueComponent();
});

Then('a popup is displayed with the detailed breakdown for PA PM contract', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the MXN Cash section is displayed with the bank account balance', async function () {
  const isMxnCashVisible = await contractPage.isMxnCashSectionVisible();
  expect(isMxnCashVisible).toBeTruthy();
  const mxnCashValue = await contractPage.getMxnCashValue();
  expect(mxnCashValue).not.toBeNull();
});

Then('the USD Cash section is displayed if the contract has a related Mexdolar account', async function () {
  const hasMexdolarAccount = await contractPage.hasMexdolarAccount();
  if (hasMexdolarAccount) {
    const isUsdCashVisible = await contractPage.isUsdCashSectionVisible();
    expect(isUsdCashVisible).toBeTruthy();
    const usdCashValue = await contractPage.getUsdCashValue();
    expect(usdCashValue).not.toBeNull();
  } else {
    const isUsdCashVisible = await contractPage.isUsdCashSectionVisible();
    expect(isUsdCashVisible).toBeFalsy();
  }
});