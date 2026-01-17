const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated in the Acticenter module', async function () {
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

Then('the breakdown popup should be displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the hedge funds label should display as {string}', async function (expectedLabel) {
  const hedgeFundsLabel = await acticenterPage.getHedgeFundsLabelText();
  expect(hedgeFundsLabel).toBe(expectedLabel);
});