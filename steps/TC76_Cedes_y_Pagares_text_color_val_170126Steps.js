const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated in the Acticenter module', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenDisplayed();
});

When('the user selects a contract with Cedes y Pagares investments', async function () {
  await acticenterPage.selectContractWithCedesYPagares();
  await acticenterPage.verifyTotalContractValueComponentDisplayed();
});

When('the user clicks on the total contract value component to display the breakdown', async function () {
  await acticenterPage.clickTotalContractValueComponent();
  await acticenterPage.verifyBreakdownPopupDisplayed();
});

Then('the Cedes y Pagares text color should comply with the Look and Feel specifications', async function () {
  const textColor = await acticenterPage.getCedesYPagaresTextColor();
  const isColorCompliant = await acticenterPage.validateTextColorCompliance(textColor);
  expect(isColorCompliant).toBeTruthy();
});