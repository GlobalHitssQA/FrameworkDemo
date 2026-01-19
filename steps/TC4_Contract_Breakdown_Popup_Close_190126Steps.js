const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.authenticate();
});

Given('an active contract is selected and the total value component is displayed', async function () {
  await contractBreakdownPage.selectActiveContract();
  const isVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total value component', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the breakdown popup is displayed with contract composition details', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

When('the user clicks outside the popup and component area', async function () {
  await contractBreakdownPage.clickOutsidePopup();
});

Then('the breakdown popup is closed and only the total value component is visible', async function () {
  const isPopupHidden = await contractBreakdownPage.isBreakdownPopupHidden();
  const isTotalValueVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isPopupHidden).toBe(true);
  expect(isTotalValueVisible).toBe(true);
});

When('the user clicks on the total value component again', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

When('the user clicks inside the popup area', async function () {
  await contractBreakdownPage.clickInsidePopup();
});

Then('the breakdown popup remains open', async function () {
  const isPopupStillVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupStillVisible).toBe(true);
});