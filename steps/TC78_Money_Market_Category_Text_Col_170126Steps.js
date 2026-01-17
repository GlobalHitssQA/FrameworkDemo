const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated and on the Acticenter main screen', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user selects a contract with money market investments', async function () {
  await acticenterPage.selectContractWithMoneyMarketInvestments();
  await acticenterPage.verifyTotalContractValueComponentIsDisplayed();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the contract value breakdown popup is displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Money Market category text color complies with Look & Feel specifications', async function () {
  const textColor = await acticenterPage.getMoneyMarketTextColor();
  const isColorValid = await acticenterPage.validateMoneyMarketTextColorCompliance(textColor);
  expect(isColorValid).toBeTruthy();
});