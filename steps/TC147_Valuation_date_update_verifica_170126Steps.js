const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValuationDatePage = require('../pages/ValuationDatePage');

let valuationDatePage;
let initialValuationDate;
let newValuationDate;

Given('I am authenticated in Acticenter', async function () {
  valuationDatePage = new ValuationDatePage(this.page);
  await valuationDatePage.navigate();
  await valuationDatePage.login();
});

Given('I select an active contract', async function () {
  await valuationDatePage.searchAndSelectContract();
});

Given('the contract component displays the current valuation date', async function () {
  const isVisible = await valuationDatePage.isValuationDateVisible();
  expect(isVisible).toBeTruthy();
});

When('I record the initial valuation date shown in the component', async function () {
  initialValuationDate = await valuationDatePage.getValuationDate();
  expect(initialValuationDate).toBeTruthy();
});

When('I simulate a system date change', async function () {
  await valuationDatePage.simulateSystemDateChange();
});

When('I refresh the contract view', async function () {
  await valuationDatePage.refreshContractView();
});

Then('the valuation date should be updated to the new system date', async function () {
  newValuationDate = await valuationDatePage.getValuationDate();
  const expectedDate = await valuationDatePage.getExpectedSystemDate();
  expect(newValuationDate).toContain(expectedDate);
});

Then('the valuation date should not match the previously recorded date', async function () {
  expect(newValuationDate).not.toEqual(initialValuationDate);
});