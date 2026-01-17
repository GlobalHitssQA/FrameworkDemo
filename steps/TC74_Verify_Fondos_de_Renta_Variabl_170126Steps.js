const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated and on the Acticenter main screen', async function () {
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

Then('the contract value breakdown popup is displayed', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the text color of Fondos de Renta Variable item meets the Look and Feel specifications', async function () {
  const textColor = await acticenterPage.getFondosRentaVariableTextColor();
  const isColorValid = await acticenterPage.validateTextColorMeetsSpecifications(textColor);
  expect(isColorValid).toBeTruthy();
});