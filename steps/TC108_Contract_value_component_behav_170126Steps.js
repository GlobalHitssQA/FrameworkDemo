const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let selectedContractId;

Given('the user is logged into Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToLogin();
  await contractValuePage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
});

Given('the user has selected an active contract', async function () {
  selectedContractId = await contractValuePage.selectFirstAvailableContract();
});

Given('the total value component is displayed', async function () {
  const isVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user leaves the session inactive until timeout occurs', async function () {
  await contractValuePage.waitForSessionTimeout();
});

When('the user clicks on the total value component', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the system should display a session expired message or redirect to login', async function () {
  const isSessionExpired = await contractValuePage.isSessionExpiredMessageVisible();
  const isLoginPageDisplayed = await contractValuePage.isLoginPageDisplayed();
  expect(isSessionExpired || isLoginPageDisplayed).toBeTruthy();
});

When('the user logs in again', async function () {
  await contractValuePage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
});

When('the user selects the same contract', async function () {
  await contractValuePage.selectContractById(selectedContractId);
});

Then('the breakdown popup should display correctly with all updated contract items', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  
  const hasMoneyMarketSection = await contractValuePage.isMoneyMarketSectionVisible();
  const hasCapitalsSection = await contractValuePage.isCapitalsSectionVisible();
  const hasCashSection = await contractValuePage.isCashSectionVisible();
  const hasPendingSettlementSection = await contractValuePage.isPendingSettlementSectionVisible();
  
  expect(hasMoneyMarketSection).toBeTruthy();
  expect(hasCapitalsSection).toBeTruthy();
  expect(hasCashSection).toBeTruthy();
  expect(hasPendingSettlementSection).toBeTruthy();
});