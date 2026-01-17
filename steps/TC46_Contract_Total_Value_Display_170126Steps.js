const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.login();
});

When('the user accesses the system and selects a contract', async function () {
  await contractValuePage.searchAndSelectContract();
});

Then('the system loads the contract and displays the value and composition component', async function () {
  const isComponentVisible = await contractValuePage.isValueCompositionComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the component displays the review date of the total contract value', async function () {
  const isReviewDateVisible = await contractValuePage.isReviewDateVisible();
  expect(isReviewDateVisible).toBeTruthy();
});

Then('the review date corresponds to the current date or last update date', async function () {
  const reviewDate = await contractValuePage.getReviewDate();
  const isValidDate = await contractValuePage.isValidReviewDate(reviewDate);
  expect(isValidDate).toBeTruthy();
});

Then('the total value is consistent with the displayed review date', async function () {
  const totalValue = await contractValuePage.getTotalContractValue();
  const reviewDate = await contractValuePage.getReviewDate();
  const isConsistent = await contractValuePage.isValueConsistentWithDate(totalValue, reviewDate);
  expect(isConsistent).toBeTruthy();
});