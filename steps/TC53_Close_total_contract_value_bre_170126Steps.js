const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated and viewing Acticenter in Desktop mode', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyDesktopViewIsActive();
});

Given('a valid contract is selected', async function () {
  await contractValuePage.selectValidContract();
});

When('the user clicks on the total contract value component to display the breakdown', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the system displays the total contract value breakdown with all applicable items', async function () {
  const isBreakdownVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBe(true);
  const hasItems = await contractValuePage.breakdownHasItems();
  expect(hasItems).toBe(true);
});

When('the user clicks outside the breakdown component', async function () {
  await contractValuePage.clickOutsideBreakdownComponent();
});

Then('the breakdown closes and only the total contract value component is displayed', async function () {
  const isBreakdownHidden = await contractValuePage.isBreakdownPopupHidden();
  expect(isBreakdownHidden).toBe(true);
  const isTotalValueVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isTotalValueVisible).toBe(true);
});