const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');
const SAPPage = require('../pages/SAPPage');

let acticenterPage;
let sapPage;
let acticenterValues = {};
let sapValues = {};

Given('the user is authenticated in Acticenter with SAP access', async function () {
  acticenterPage = new ActicenterPage(this.page);
  sapPage = new SAPPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyUserIsAuthenticated();
});

Given('a Persona Moral bank contract with Mexdolar account exists', async function () {
  await acticenterPage.verifyPersonaMoralContractExists();
});

When('the user accesses Acticenter and selects a bank or brokerage contract', async function () {
  await acticenterPage.searchAndSelectContract();
});

Then('the system displays the selected contract screen', async function () {
  const isDisplayed = await acticenterPage.isContractScreenDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('the user expands the contract value breakdown', async function () {
  await acticenterPage.expandContractValueBreakdown();
});

Then('the system displays the popup with all categories and their values', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user records the specific category values including Cash MXN and Cash USD', async function () {
  acticenterValues = await acticenterPage.captureAllCategoryValues();
});

Then('all values displayed in Acticenter are captured', async function () {
  expect(acticenterValues.cashMXN).toBeDefined();
  expect(acticenterValues.cashUSD).toBeDefined();
});

When('the user accesses SAP to query the same contract values', async function () {
  await sapPage.navigateToSAP();
  await sapPage.searchContract(acticenterPage.getCurrentContractId());
});

Then('SAP displays the stored values for the contract', async function () {
  const isDisplayed = await sapPage.isContractDataDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('the user compares Cash USD value in Acticenter with Mexdolar account balance in SAP for Persona Moral', async function () {
  sapValues = await sapPage.captureMexdolarAccountValues();
});

Then('the Cash USD values match exactly with SAP', async function () {
  expect(acticenterValues.cashUSD).toEqual(sapValues.mexdolarBalance);
});

When('the user verifies coherence of all categories between Acticenter and SAP', async function () {
  sapValues = await sapPage.captureAllCategoryValues();
});

Then('all category values are identical between both systems', async function () {
  expect(acticenterValues.cashMXN).toEqual(sapValues.cashMXN);
  expect(acticenterValues.cashUSD).toEqual(sapValues.cashUSD);
  expect(acticenterValues.totalContractValue).toEqual(sapValues.totalContractValue);
  expect(acticenterValues.purchasingPowerMXN).toEqual(sapValues.purchasingPowerMXN);
  expect(acticenterValues.pendingSettlement).toEqual(sapValues.pendingSettlement);
});