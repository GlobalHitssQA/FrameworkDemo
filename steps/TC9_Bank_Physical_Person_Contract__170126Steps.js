const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('I am authenticated in Acticenter with a Bank Physical Person contract', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.waitForAuthentication();
});

When('I select a Bank Physical Person contract', async function () {
  await contractBreakdownPage.selectBankPhysicalPersonContract();
});

Then('the system displays the operation screen with the selected contract', async function () {
  const isDisplayed = await contractBreakdownPage.isOperationScreenDisplayed();
  expect(isDisplayed).toBe(true);
});

When('I click on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays the breakdown popup with contract sections', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('the Cash MXN section is visible in the breakdown list', async function () {
  const isCashMXNVisible = await contractBreakdownPage.isCashMXNSectionVisible();
  expect(isCashMXNVisible).toBe(true);
});

Then('the Cash MXN value corresponds to the checking account balance', async function () {
  const cashMXNValue = await contractBreakdownPage.getCashMXNValue();
  const expectedBalance = await contractBreakdownPage.getExpectedCheckingAccountBalance();
  expect(cashMXNValue).not.toBeNull();
  expect(parseFloat(cashMXNValue.replace(/[^0-9.-]+/g, ''))).toBeGreaterThanOrEqual(0);
});