const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with a selected contract', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginWithValidCredentials();
  await contractValuePage.selectContract();
});

Given('the total contract value component is visible on the screen', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user hovers over the information icon of the contract value component', async function () {
  await contractValuePage.hoverOverContractValueInfoIcon();
});

Then('a tooltip should be displayed with explanatory text about the component function', async function () {
  const isTooltipVisible = await contractValuePage.isTooltipVisible();
  expect(isTooltipVisible).toBeTruthy();
});

Then('the tooltip should contain clear information about viewing the value distribution', async function () {
  const tooltipText = await contractValuePage.getTooltipText();
  expect(tooltipText).toBeTruthy();
  expect(tooltipText.length).toBeGreaterThan(0);
  const containsDistributionInfo = await contractValuePage.tooltipContainsDistributionInfo();
  expect(containsDistributionInfo).toBeTruthy();
});

When('the user moves the cursor away from the component', async function () {
  await contractValuePage.moveMouseAwayFromComponent();
});

Then('the tooltip should disappear automatically', async function () {
  const isTooltipHidden = await contractValuePage.isTooltipHidden();
  expect(isTooltipHidden).toBeTruthy();
});