const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let initialValues = {};

Given('the user is logged into Acticenter with an active contract selected', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.login();
  await contractValuePage.selectActiveContract();
  await contractValuePage.waitForContractValueComponentVisible();
});

When('the user clicks on the total value component to display the breakdown', async function () {
  await contractValuePage.clickTotalValueComponent();
  await contractValuePage.waitForBreakdownPopupVisible();
});

When('the user notes the current values displayed in the popup', async function () {
  initialValues = await contractValuePage.getBreakdownValues();
});

When('the user refreshes the page', async function () {
  await contractValuePage.refreshPage();
});

Then('the total value component should be visible with the selected contract', async function () {
  const isVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isVisible).toBeTruthy();
  const hasContractData = await contractValuePage.hasContractDataLoaded();
  expect(hasContractData).toBeTruthy();
});

When('the user clicks on the total value component again', async function () {
  await contractValuePage.clickTotalValueComponent();
  await contractValuePage.waitForBreakdownPopupVisible();
});

Then('the popup should display the updated values correctly from the backend', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const updatedValues = await contractValuePage.getBreakdownValues();
  const hasValidValues = await contractValuePage.validateBreakdownValuesLoaded(updatedValues);
  expect(hasValidValues).toBeTruthy();
});