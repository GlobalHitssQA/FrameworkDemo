const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractPage = require('../pages/ContractPage');

let contractPage;
let contractWithMexdolar;
let contractWithoutMexdolar;

Given('the user is authenticated in Acticenter', async function () {
  contractPage = new ContractPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.login();
});

Given('a Persona Moral Bank contract with associated Mexdolar account exists', async function () {
  contractWithMexdolar = await contractPage.getContractWithMexdolar();
  expect(contractWithMexdolar).toBeTruthy();
});

Given('a Persona Moral Bank contract without Mexdolar account exists', async function () {
  contractWithoutMexdolar = await contractPage.getContractWithoutMexdolar();
  expect(contractWithoutMexdolar).toBeTruthy();
});

When('the user selects the contract with Mexdolar account', async function () {
  await contractPage.searchAndSelectContract(contractWithMexdolar);
});

Then('the system loads the contract and displays the total contract value component', async function () {
  const isVisible = await contractPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total value component to expand the breakdown', async function () {
  await contractPage.clickTotalValueComponent();
});

Then('the system displays the popup with detailed contract composition breakdown', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the USD Cash item appears in the breakdown', async function () {
  const isUsdCashVisible = await contractPage.isUsdCashItemVisible();
  expect(isUsdCashVisible).toBeTruthy();
});

Then('the USD Cash value shows the Mexdolar account balance from SAP', async function () {
  const usdCashValue = await contractPage.getUsdCashValue();
  expect(usdCashValue).not.toBeNull();
  expect(parseFloat(usdCashValue.replace(/[^0-9.-]/g, ''))).toBeGreaterThanOrEqual(0);
});

Then('the USD Cash value is displayed in dollars without currency conversion', async function () {
  const usdCashDisplayFormat = await contractPage.getUsdCashDisplayFormat();
  expect(usdCashDisplayFormat).toMatch(/USD|\$/);
  expect(usdCashDisplayFormat).not.toMatch(/MXN/);
});

When('the user selects the contract without Mexdolar account', async function () {
  await contractPage.closeBreakdownPopup();
  await contractPage.searchAndSelectContract(contractWithoutMexdolar);
});

Then('the USD Cash item is not displayed in the breakdown', async function () {
  const isUsdCashVisible = await contractPage.isUsdCashItemVisible();
  expect(isUsdCashVisible).toBeFalsy();
});