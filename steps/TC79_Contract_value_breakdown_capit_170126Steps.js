const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated and on the Acticenter main screen', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user selects a contract with capital market investments', async function () {
  await acticenterPage.selectContractWithCapitalMarketInvestments();
  await acticenterPage.verifyTotalContractValueComponentIsDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the breakdown popup is displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupDisplayed();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Capital Market section is displayed with the name {string}', async function (expectedName) {
  const sectionName = await acticenterPage.getCapitalMarketSectionName();
  expect(sectionName).toBe(expectedName);
});