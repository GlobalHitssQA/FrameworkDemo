const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AdvisorModulePage = require('../pages/AdvisorModulePage');
const ActicenterPage = require('../pages/ActicenterPage');

let advisorModulePage;
let acticenterPage;
let contractId;
let currentCashValue;

Given('I have identified a valid Brokerage House contract with buying power balance', async function () {
  contractId = await this.testData.getBrokerageHouseContract();
  expect(contractId).toBeTruthy();
});

Given('I am logged into the Advisor Module', async function () {
  advisorModulePage = new AdvisorModulePage(this.page);
  await advisorModulePage.navigate();
  await advisorModulePage.login(this.credentials.username, this.credentials.password);
});

When('I query the currentcash value for the identified contract', async function () {
  await advisorModulePage.searchContract(contractId);
  await advisorModulePage.selectContract(contractId);
});

Then('the Advisor Module displays the currentcash value in Mexican pesos', async function () {
  const isDisplayed = await advisorModulePage.isCurrentCashDisplayed();
  expect(isDisplayed).toBeTruthy();
});

Then('I record the exact currentcash value including decimals', async function () {
  currentCashValue = await advisorModulePage.getCurrentCashValue();
  expect(currentCashValue).toBeTruthy();
});

When('I authenticate in Acticenter', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigate();
  await acticenterPage.login(this.credentials.username, this.credentials.password);
});

When('I select the same Brokerage House contract', async function () {
  await acticenterPage.searchContract(contractId);
  await acticenterPage.selectContract(contractId);
});

Then('the system loads the contract and displays the Value and Composition component', async function () {
  const isDisplayed = await acticenterPage.isValueCompositionComponentDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('I expand the contract breakdown', async function () {
  await acticenterPage.expandContractBreakdown();
});

Then('the popup displays the breakdown including the Buying Power MXN field with its value in pesos', async function () {
  const isPopupDisplayed = await acticenterPage.isBreakdownPopupDisplayed();
  expect(isPopupDisplayed).toBeTruthy();
  const isBuyingPowerDisplayed = await acticenterPage.isBuyingPowerMXNDisplayed();
  expect(isBuyingPowerDisplayed).toBeTruthy();
});

Then('the Buying Power MXN value in Acticenter matches exactly the currentcash from Advisor Module', async function () {
  const buyingPowerValue = await acticenterPage.getBuyingPowerMXNValue();
  const normalizedBuyingPower = acticenterPage.normalizeMonetaryValue(buyingPowerValue);
  const normalizedCurrentCash = acticenterPage.normalizeMonetaryValue(currentCashValue);
  expect(normalizedBuyingPower).toBe(normalizedCurrentCash);
});

When('I select a Bank contract', async function () {
  const bankContractId = await this.testData.getBankContract();
  await acticenterPage.searchContract(bankContractId);
  await acticenterPage.selectContract(bankContractId);
  await acticenterPage.expandContractBreakdown();
});

Then('the Buying Power MXN field is not displayed in the breakdown', async function () {
  const isBuyingPowerDisplayed = await acticenterPage.isBuyingPowerMXNDisplayed();
  expect(isBuyingPowerDisplayed).toBeFalsy();
});

Then('only the Cash MXN field is shown for Bank contracts', async function () {
  const isCashMXNDisplayed = await acticenterPage.isCashMXNDisplayed();
  expect(isCashMXNDisplayed).toBeTruthy();
});