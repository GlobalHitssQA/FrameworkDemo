const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated and on the Acticenter main screen', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user selects a contract with hedge fund investments', async function () {
  await acticenterPage.selectContractWithHedgeFunds();
  await acticenterPage.verifyTotalContractValueComponentIsVisible();
});

When('the user clicks on the total contract value component', async function () {
  await acticenterPage.clickTotalContractValueComponent();
});

Then('the contract breakdown popup should be displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('the Hedge Funds section text color should comply with Look and Feel specifications', async function () {
  const textColor = await acticenterPage.getHedgeFundsSectionTextColor();
  const isColorCompliant = await acticenterPage.validateTextColorCompliance(textColor);
  expect(isColorCompliant).toBe(true);
});