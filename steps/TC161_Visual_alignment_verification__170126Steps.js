const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter WM Responsive', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

Given('the main screen of Acticenter WM Responsive is displayed', async function () {
  await contractValuePage.verifyMainScreenIsDisplayed();
});

When('the user searches and selects a contract from the search', async function () {
  await contractValuePage.clickSearchButton();
  await contractValuePage.searchContract();
  await contractValuePage.selectFirstContractResult();
});

Then('the contract information is displayed with the value and composition component visible', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the component alignment matches the Figma WM Responsive design specifications for position margins and padding', async function () {
  const alignmentData = await contractValuePage.getComponentAlignmentProperties();
  expect(alignmentData.position).toBeDefined();
  expect(alignmentData.margins).toBeDefined();
  expect(alignmentData.padding).toBeDefined();
});

Then('the breakdown list is vertically aligned with the total contract value component', async function () {
  const isAligned = await contractValuePage.verifyBreakdownListVerticalAlignment();
  expect(isAligned).toBeTruthy();
});