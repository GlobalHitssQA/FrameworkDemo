const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated and on the Acticenter main screen', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user selects a contract that contains Cedes y pagarés investments', async function () {
  await acticenterPage.selectContractWithCedesYPagares();
  await acticenterPage.verifyContractValueComponentIsDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickOnTotalContractValueComponent();
});

Then('the breakdown popup should be displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the item named {string} should be visible in the breakdown list', async function (itemName) {
  const isItemVisible = await acticenterPage.isBreakdownItemVisible(itemName);
  expect(isItemVisible).toBeTruthy();
  
  const actualItemText = await acticenterPage.getBreakdownItemText(itemName);
  expect(actualItemText).toContain(itemName);
});