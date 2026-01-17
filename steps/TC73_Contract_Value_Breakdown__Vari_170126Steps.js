const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated in the Acticenter module', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user selects a contract with variable income fund investments', async function () {
  await acticenterPage.selectContractWithVariableIncomeFunds();
  await acticenterPage.verifyTotalContractValueComponentIsDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the breakdown popup should be displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the item {string} should be visible in the breakdown list with correct Look & Feel', async function (itemName) {
  const isItemVisible = await acticenterPage.isBreakdownItemVisible(itemName);
  expect(isItemVisible).toBeTruthy();
  
  const itemText = await acticenterPage.getBreakdownItemText(itemName);
  expect(itemText).toBe(itemName);
  
  const hasCorrectStyling = await acticenterPage.verifyBreakdownItemLookAndFeel(itemName);
  expect(hasCorrectStyling).toBeTruthy();
});