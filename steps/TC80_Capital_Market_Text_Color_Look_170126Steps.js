const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated in the Acticenter module', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user selects a contract with capital market investments', async function () {
  await acticenterPage.selectContractWithCapitalMarketInvestments();
  await acticenterPage.verifyTotalContractValueComponentIsVisible();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the contract value breakdown popup is displayed', async function () {
  const isVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isVisible).toBeTruthy();
});

Then('the Capital Market text color meets the Look and Feel specifications', async function () {
  const textColor = await acticenterPage.getCapitalMarketTextColor();
  const isValidColor = acticenterPage.validateLookAndFeelColor(textColor);
  expect(isValidColor).toBeTruthy();
});