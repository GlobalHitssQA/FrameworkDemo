const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated in the Acticenter system', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenDisplayed();
});

When('the user selects a contract with money market investments', async function () {
  await acticenterPage.selectContractWithMoneyMarket();
  await acticenterPage.verifyContractValueComponentDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickOnTotalContractValue();
});

Then('the breakdown popup should be displayed', async function () {
  const isVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isVisible).toBeTruthy();
});

Then('the Money Market section should display the name {string}', async function (expectedName) {
  const sectionName = await acticenterPage.getMoneyMarketSectionName();
  expect(sectionName).toBe(expectedName);
});