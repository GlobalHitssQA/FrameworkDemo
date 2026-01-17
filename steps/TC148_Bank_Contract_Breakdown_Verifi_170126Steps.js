const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('I am authenticated in Acticenter with valid credentials', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigate();
  await contractBreakdownPage.login(process.env.ACTICENTER_USERNAME, process.env.ACTICENTER_PASSWORD);
  await contractBreakdownPage.verifySuccessfulAuthentication();
});

When('I select a Bank type contract to view its value and composition', async function () {
  await contractBreakdownPage.selectBankContract();
  await contractBreakdownPage.verifyTotalValueComponentIsVisible();
});

When('I click on the total value component to display the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
  await contractBreakdownPage.verifyBreakdownPopupIsVisible();
});

Then('I should not see the item Poder de compra MXN in the breakdown', async function () {
  const isPoderDeCompraVisible = await contractBreakdownPage.isPoderDeCompraMXNVisible();
  expect(isPoderDeCompraVisible).toBe(false);
});

Then('I should see Bank applicable items like Efectivo MXN and Efectivo USD', async function () {
  const isEfectivoMXNVisible = await contractBreakdownPage.isEfectivoMXNVisible();
  const isEfectivoUSDVisible = await contractBreakdownPage.isEfectivoUSDVisible();
  expect(isEfectivoMXNVisible || isEfectivoUSDVisible).toBe(true);
});