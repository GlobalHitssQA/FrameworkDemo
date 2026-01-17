const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterContractPage = require('../pages/ActicenterContractPage');

let acticenterPage;
let efectivoMXNValue;
let accountBalanceFromSource;

Given('the user is authenticated in Acticenter', async function () {
  acticenterPage = new ActicenterContractPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenDisplayed();
});

When('the user selects a Banco contract for Persona Fisica or Persona Moral', async function () {
  await acticenterPage.selectBancoContract();
});

Then('the system displays the total contract value component', async function () {
  const isVisible = await acticenterPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total value component to expand the breakdown', async function () {
  await acticenterPage.clickTotalValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the user locates the Efectivo MXN item in the breakdown', async function () {
  efectivoMXNValue = await acticenterPage.getEfectivoMXNValue();
  expect(efectivoMXNValue).not.toBeNull();
});

Then('the Efectivo MXN value should match the account balance from the source system', async function () {
  accountBalanceFromSource = await acticenterPage.getAccountBalanceFromSourceSystem();
  const normalizedEfectivoValue = acticenterPage.normalizeMonetaryValue(efectivoMXNValue);
  const normalizedAccountBalance = acticenterPage.normalizeMonetaryValue(accountBalanceFromSource);
  expect(normalizedEfectivoValue).toBe(normalizedAccountBalance);
});