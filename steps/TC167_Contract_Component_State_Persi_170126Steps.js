const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractComponentPage = require('../pages/ContractComponentPage');

let contractPage;

Given('I am logged into Acticenter with an authenticated user', async function () {
  contractPage = new ContractComponentPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.login();
});

Given('I have selected an active contract', async function () {
  await contractPage.selectActiveContract();
});

Given('the contract value and composition component is displayed in collapsed state', async function () {
  const isCollapsed = await contractPage.isComponentCollapsed();
  expect(isCollapsed).toBe(true);
});

When('I click on the component to expand the breakdown', async function () {
  await contractPage.clickComponentToExpand();
});

Then('the breakdown opens showing all contract items with their corresponding values', async function () {
  const isExpanded = await contractPage.isBreakdownExpanded();
  expect(isExpanded).toBe(true);
  const hasItems = await contractPage.breakdownHasItems();
  expect(hasItems).toBe(true);
  this.initialValues = await contractPage.getBreakdownValues();
});

When('I navigate to another Acticenter section while keeping the same contract', async function () {
  await contractPage.navigateToAnotherSection();
});

Then('the system changes to the selected section', async function () {
  const isOnDifferentSection = await contractPage.isOnDifferentSection();
  expect(isOnDifferentSection).toBe(true);
});

When('I return to the section containing the value and composition component', async function () {
  await contractPage.returnToContractSection();
});

Then('the component maintains the expanded state it had before changing sections', async function () {
  const isExpanded = await contractPage.isBreakdownExpanded();
  expect(isExpanded).toBe(true);
});

Then('all item values remain correct and updated in the breakdown', async function () {
  const currentValues = await contractPage.getBreakdownValues();
  expect(currentValues).toEqual(this.initialValues);
  const valuesAreValid = await contractPage.validateBreakdownValues();
  expect(valuesAreValid).toBe(true);
});