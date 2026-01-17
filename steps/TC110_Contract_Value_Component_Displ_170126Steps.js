const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let firstContractValues = {};
let secondContractValues = {};

Given('I am logged into Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToLogin();
  await contractValuePage.login();
});

Given('I search for a client with multiple active contracts', async function () {
  await contractValuePage.clickSearchButton();
  await contractValuePage.searchClientWithMultipleContracts();
});

Then('the system displays the list of available contracts for the client', async function () {
  const isContractListVisible = await contractValuePage.isContractListVisible();
  expect(isContractListVisible).toBeTruthy();
});

When('I select the first contract', async function () {
  await contractValuePage.selectContractByIndex(0);
});

When('I click on the total value component', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the popup displays the breakdown corresponding to the first contract with its specific items', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const hasBreakdownItems = await contractValuePage.hasBreakdownItems();
  expect(hasBreakdownItems).toBeTruthy();
});

When('I close the popup', async function () {
  await contractValuePage.closePopup();
});

Then('the popup closes correctly and only the total value component is visible', async function () {
  const isPopupHidden = await contractValuePage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBeTruthy();
  const isTotalValueVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isTotalValueVisible).toBeTruthy();
});

Then('I note the values shown for the first contract', async function () {
  firstContractValues = await contractValuePage.captureContractValues();
});

When('I switch to the second contract of the same client', async function () {
  await contractValuePage.selectContractByIndex(1);
});

Then('the system loads the second contract', async function () {
  const isContractLoaded = await contractValuePage.isContractLoaded();
  expect(isContractLoaded).toBeTruthy();
});

When('I click on the total value component of the second contract', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the popup displays the breakdown corresponding to the second contract showing different values than the first contract', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  secondContractValues = await contractValuePage.captureContractValues();
  const valuesAreDifferent = await contractValuePage.compareContractValues(firstContractValues, secondContractValues);
  expect(valuesAreDifferent).toBeTruthy();
});

Then('the displayed values correspond exclusively to the selected contract without mixing information from other contracts', async function () {
  const currentContractId = await contractValuePage.getCurrentContractId();
  const displayedContractId = await contractValuePage.getDisplayedContractId();
  expect(currentContractId).toEqual(displayedContractId);
  const valuesAreConsistent = await contractValuePage.verifyValuesConsistency();
  expect(valuesAreConsistent).toBeTruthy();
});