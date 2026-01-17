const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.authenticate();
});

Given('a Casa de Bolsa contract for Persona Moral is selected', async function () {
  await contractBreakdownPage.selectCasaDeBolsaPersonaMoralContract();
  const isComponentVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the breakdown popup is displayed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Poder de compra MXN item is visible in the breakdown list', async function () {
  const isItemVisible = await contractBreakdownPage.isPoderDeCompraMXNVisible();
  expect(isItemVisible).toBeTruthy();
});

Then('the Poder de compra MXN value is aligned to the right', async function () {
  const isAlignedRight = await contractBreakdownPage.isPoderDeCompraMXNValueAlignedRight();
  expect(isAlignedRight).toBeTruthy();
});

Then('the displayed amount matches the currentcash value for Casa de Bolsa contract', async function () {
  const displayedValue = await contractBreakdownPage.getPoderDeCompraMXNValue();
  const expectedValue = await contractBreakdownPage.getExpectedCurrentCashValue();
  expect(displayedValue).toBe(expectedValue);
});

Then('if the contract has no balance the system displays zero pesos', async function () {
  const hasBalance = await contractBreakdownPage.contractHasPoderDeCompraBalance();
  if (!hasBalance) {
    const displayedValue = await contractBreakdownPage.getPoderDeCompraMXNValue();
    expect(displayedValue).toBe('$0.00');
  }
});