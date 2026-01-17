const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in the system', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToApplication();
  await contractBreakdownPage.performAuthentication();
});

Given('a contract without MXN cash balance exists', async function () {
  const contractExists = await contractBreakdownPage.verifyContractWithoutMXNCashExists();
  expect(contractExists).toBeTruthy();
});

When('the user selects a contract without MXN cash balance', async function () {
  await contractBreakdownPage.selectContractWithoutMXNCash();
});

Then('the system loads the contract correctly', async function () {
  const isLoaded = await contractBreakdownPage.isContractLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the breakdown popup is displayed with contract value details', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user locates the MXN cash item in the breakdown list', async function () {
  await contractBreakdownPage.locateMXNCashItem();
});

Then('the MXN cash item displays a value of zero pesos', async function () {
  const mxnCashValue = await contractBreakdownPage.getMXNCashValue();
  expect(mxnCashValue).toBe('$0.00');
});

Then('the other applicable items display their corresponding monetary values', async function () {
  const itemsWithBalance = await contractBreakdownPage.getItemsWithBalance();
  for (const item of itemsWithBalance) {
    expect(item.value).toMatch(/^\$[0-9,]+\.[0-9]{2}$/);
  }
});

Then('items without balance display zero pesos', async function () {
  const itemsWithoutBalance = await contractBreakdownPage.getItemsWithoutBalance();
  for (const item of itemsWithoutBalance) {
    expect(item.value).toBe('$0.00');
  }
});