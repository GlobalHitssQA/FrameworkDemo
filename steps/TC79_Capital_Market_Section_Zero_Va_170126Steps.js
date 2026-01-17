const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('I am authenticated as an advisor or banker user', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.waitForAuthentication();
});

Given('I have access to a contract without capital market investments', async function () {
  await contractBreakdownPage.verifyContractListIsAvailable();
});

When('I select the contract without capital market investments', async function () {
  await contractBreakdownPage.selectContractWithoutCapitalMarket();
});

Then('the system loads and displays the selected contract', async function () {
  const isContractDisplayed = await contractBreakdownPage.isContractDisplayed();
  expect(isContractDisplayed).toBeTruthy();
});

When('I click on the total contract value component to expand the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the popup opens showing all applicable sections for the contract type', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('I locate the Capital Market section in the list', async function () {
  await contractBreakdownPage.scrollToCapitalMarketSection();
});

Then('the Capital Market section displays a value of $0.00 on the right side', async function () {
  const capitalMarketValue = await contractBreakdownPage.getCapitalMarketValue();
  expect(capitalMarketValue).toBe('$0.00');
});

Then('all sections without balance show $0.00 with consistent formatting', async function () {
  const zeroBalanceSections = await contractBreakdownPage.getAllZeroBalanceSections();
  for (const section of zeroBalanceSections) {
    expect(section.value).toMatch(/^\$0\.00$/);
  }
});