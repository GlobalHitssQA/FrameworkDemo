const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigate();
  await contractBreakdownPage.login();
});

Given('the user has selected a contract with available breakdown', async function () {
  await contractBreakdownPage.selectContract();
  const isVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the breakdown popup should be displayed with contract items', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasItems = await contractBreakdownPage.hasBreakdownItems();
  expect(hasItems).toBeTruthy();
});

When('the user clicks on different areas inside the popup like item names', async function () {
  await contractBreakdownPage.clickOnItemName();
});

Then('the breakdown popup should remain open', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user clicks on monetary values inside the popup', async function () {
  await contractBreakdownPage.clickOnMonetaryValue();
});

When('the user clicks outside the popup area', async function () {
  await contractBreakdownPage.clickOutsidePopup();
});

Then('the breakdown popup should be closed', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeFalsy();
});