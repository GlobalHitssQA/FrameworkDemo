const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let recordedValues = {};

Given('the user is authenticated in Acticenter with valid advisor credentials', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.login(process.env.ADVISOR_USERNAME, process.env.ADVISOR_PASSWORD);
  const isMainScreenVisible = await acticenterPage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects the first contract of Persona Fisica Casa de Bolsa', async function () {
  await acticenterPage.openContractSearch();
  await acticenterPage.selectContractByType('persona-fisica', 'casa-bolsa', 0);
});

Then('the Value and Composition component displays data for the selected contract', async function () {
  const isComponentVisible = await acticenterPage.isValueCompositionComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the user records the displayed values including Total Value and Purchase Power and Pending Settlement and Funds', async function () {
  recordedValues = await acticenterPage.getComponentValues();
  expect(recordedValues.totalValue).toBeDefined();
  expect(recordedValues.purchasePower).toBeDefined();
  expect(recordedValues.pendingSettlement).toBeDefined();
  expect(recordedValues.funds).toBeDefined();
});

When('the user selects a second different contract of Persona Moral Banco', async function () {
  await acticenterPage.openContractSearch();
  await acticenterPage.selectContractByType('persona-moral', 'banco', 0);
});

Then('the Value and Composition component updates with new values for the second contract', async function () {
  const isComponentVisible = await acticenterPage.isValueCompositionComponentVisible();
  expect(isComponentVisible).toBeTruthy();
  const currentValues = await acticenterPage.getComponentValues();
  expect(currentValues.totalValue).toBeDefined();
});

Then('the displayed values are different from the previously recorded values', async function () {
  const currentValues = await acticenterPage.getComponentValues();
  const valuesAreDifferent = 
    currentValues.totalValue !== recordedValues.totalValue ||
    currentValues.purchasePower !== recordedValues.purchasePower ||
    currentValues.pendingSettlement !== recordedValues.pendingSettlement;
  expect(valuesAreDifferent).toBeTruthy();
});

When('the user switches back to the first contract', async function () {
  await acticenterPage.openContractSearch();
  await acticenterPage.selectContractByType('persona-fisica', 'casa-bolsa', 0);
});

Then('the system restores the original values from the first contract', async function () {
  const restoredValues = await acticenterPage.getComponentValues();
  expect(restoredValues.totalValue).toBe(recordedValues.totalValue);
  expect(restoredValues.purchasePower).toBe(recordedValues.purchasePower);
  expect(restoredValues.pendingSettlement).toBe(recordedValues.pendingSettlement);
});