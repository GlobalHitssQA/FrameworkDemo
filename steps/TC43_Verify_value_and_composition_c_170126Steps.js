const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user is logged in as a Patrimonial Banking user', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToActicenter();
  await valueCompositionPage.loginAsPatrimonialBankingUser();
});

Given('the browser is configured in Responsive Portrait mode', async function () {
  await valueCompositionPage.setResponsivePortraitMode();
});

When('the user selects an active contract', async function () {
  await valueCompositionPage.selectActiveContract();
});

Then('the value and composition component is displayed adapted to Portrait view', async function () {
  const isVisible = await valueCompositionPage.isValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the component shows the total contract value', async function () {
  const totalValue = await valueCompositionPage.getTotalContractValue();
  expect(totalValue).toBeTruthy();
});

When('the user clicks on the component to expand the breakdown', async function () {
  await valueCompositionPage.clickValueComponent();
});

Then('the breakdown popup is displayed with all items adapted to Portrait view', async function () {
  const isBreakdownVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBeTruthy();
});

Then('the breakdown list maintains correct vertical alignment', async function () {
  const isAligned = await valueCompositionPage.verifyBreakdownVerticalAlignment();
  expect(isAligned).toBeTruthy();
});

When('the user clicks outside the component', async function () {
  await valueCompositionPage.clickOutsideComponent();
});

Then('the breakdown closes and returns to normal view', async function () {
  const isBreakdownHidden = await valueCompositionPage.isBreakdownPopupHidden();
  expect(isBreakdownHidden).toBeTruthy();
});