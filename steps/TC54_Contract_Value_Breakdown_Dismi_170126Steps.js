const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated and viewing Acticenter in Responsive Landscape resolution', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.setResponsiveLandscapeViewport();
  await contractValuePage.navigateToActicenter();
  await contractValuePage.waitForPageLoad();
});

Given('a valid contract is selected', async function () {
  await contractValuePage.selectContract();
});

When('the user clicks on the total contract value component to display the breakdown', async function () {
  await contractValuePage.clickTotalContractValue();
});

Then('the contract value breakdown should be visible', async function () {
  const isVisible = await contractValuePage.isBreakdownVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks outside the breakdown component', async function () {
  await contractValuePage.clickOutsideBreakdown();
});

Then('the breakdown should be closed', async function () {
  const isVisible = await contractValuePage.isBreakdownVisible();
  expect(isVisible).toBe(false);
});

Then('only the total contract value component should be displayed', async function () {
  const isValueComponentVisible = await contractValuePage.isTotalValueComponentVisible();
  const isBreakdownHidden = await contractValuePage.isBreakdownHidden();
  expect(isValueComponentVisible).toBe(true);
  expect(isBreakdownHidden).toBe(true);
});