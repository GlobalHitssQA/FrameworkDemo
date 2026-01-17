const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AssetPage = require('../pages/AssetPage');
const ActicenterPage = require('../pages/ActicenterPage');

let assetPage;
let acticenterPage;
let recordedUsdValue;
let contractId;

Given('I have identified a Casa de Bolsa contract with USD balance', async function () {
  contractId = await this.testData.getValidCasaDeBolsaContractWithUsd();
  expect(contractId).toBeTruthy();
});

Given('I have accessed the Asset system', async function () {
  assetPage = new AssetPage(this.page);
  await assetPage.navigate();
  await assetPage.waitForPageLoad();
});

When('I query the USD Cash value for the identified contract in Asset', async function () {
  await assetPage.searchContract(contractId);
  await assetPage.selectContract(contractId);
});

Then('I should see the USD amount displayed in Asset', async function () {
  const isUsdCashVisible = await assetPage.isUsdCashValueVisible();
  expect(isUsdCashVisible).toBeTruthy();
});

Then('I record the exact USD Cash value with full decimals', async function () {
  recordedUsdValue = await assetPage.getUsdCashValue();
  expect(recordedUsdValue).toBeTruthy();
});

When('I authenticate in Acticenter', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigate();
  await acticenterPage.login(this.credentials.username, this.credentials.password);
  await acticenterPage.waitForDashboard();
});

When('I select the same Casa de Bolsa contract', async function () {
  await acticenterPage.clickSearchIcon();
  await acticenterPage.searchContract(contractId);
  await acticenterPage.selectContractFromResults(contractId);
});

Then('the system loads the contract and displays the Value and Composition component', async function () {
  const isComponentVisible = await acticenterPage.isValueCompositionComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('I expand the contract breakdown', async function () {
  await acticenterPage.expandContractBreakdown();
});

Then('I should see the USD Cash item in the popup breakdown', async function () {
  const isUsdCashVisible = await acticenterPage.isUsdCashItemVisible();
  expect(isUsdCashVisible).toBeTruthy();
});

Then('the USD Cash value in Acticenter matches exactly the value recorded from Asset', async function () {
  const acticenterUsdValue = await acticenterPage.getUsdCashValue();
  expect(acticenterUsdValue).toBe(recordedUsdValue);
});