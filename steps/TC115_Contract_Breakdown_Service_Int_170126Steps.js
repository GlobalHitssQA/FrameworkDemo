const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;
let serviceResponse;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToLogin();
  await contractBreakdownPage.login();
});

Given('the user has selected an active Individual Person contract', async function () {
  await contractBreakdownPage.searchAndSelectIndividualPersonContract();
});

When('the user views the contract value and composition component', async function () {
  const isVisible = await contractBreakdownPage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the component to display the detailed breakdown', async function () {
  serviceResponse = await contractBreakdownPage.clickContractValueComponentAndCaptureResponse();
});

Then('the system should invoke the AGAS21437 service successfully', async function () {
  expect(serviceResponse).not.toBeNull();
  expect(serviceResponse.url).toContain('AGAS21437');
});

Then('the service should return HTTP status code {int}', async function (statusCode) {
  expect(serviceResponse.status).toBe(statusCode);
});

Then('the popup should display all breakdown items correctly', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the breakdown should include Purchasing Power item', async function () {
  const isVisible = await contractBreakdownPage.isPurchasingPowerItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('the breakdown should include Cash MXN item', async function () {
  const isVisible = await contractBreakdownPage.isCashMXNItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('the breakdown should include Cash USD item', async function () {
  const isVisible = await contractBreakdownPage.isCashUSDItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('the breakdown should include Pending Settlement item', async function () {
  const isVisible = await contractBreakdownPage.isPendingSettlementItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('the breakdown should include Funds item', async function () {
  const isVisible = await contractBreakdownPage.isFundsItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('the breakdown should include Cedes item', async function () {
  const isVisible = await contractBreakdownPage.isCedesItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('the breakdown should include Money Market item', async function () {
  const isVisible = await contractBreakdownPage.isMoneyMarketItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('the breakdown should include Capital Market item', async function () {
  const isVisible = await contractBreakdownPage.isCapitalMarketItemVisible();
  expect(isVisible).toBeTruthy();
});

Then('items without value should display as $0.00', async function () {
  const zeroValueItems = await contractBreakdownPage.getItemsWithZeroValue();
  for (const item of zeroValueItems) {
    expect(item.value).toBe('$0.00');
  }
});