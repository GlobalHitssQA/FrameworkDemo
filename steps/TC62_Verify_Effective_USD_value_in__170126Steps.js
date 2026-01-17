const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;
let sapEffectiveUSDValue;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.waitForAuthentication();
});

Given('the user has access to a Mexdolar Persona Moral contract with related account', async function () {
  const hasAccess = await contractBreakdownPage.verifyMexdolarContractAccess();
  expect(hasAccess).toBeTruthy();
});

When('the user selects a Mexdolar Persona Moral contract', async function () {
  await contractBreakdownPage.selectMexdolarPersonaMoralContract();
});

Then('the system displays the screen with the selected contract', async function () {
  const isContractDisplayed = await contractBreakdownPage.isContractScreenDisplayed();
  expect(isContractDisplayed).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays the popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user locates the Effective USD item in the breakdown', async function () {
  await contractBreakdownPage.locateEffectiveUSDItem();
});

Then('the Effective USD item is displayed with its corresponding value', async function () {
  const isEffectiveUSDVisible = await contractBreakdownPage.isEffectiveUSDItemVisible();
  expect(isEffectiveUSDVisible).toBeTruthy();
});

Then('the Effective USD amount matches exactly the SAP value without currency conversion', async function () {
  const displayedValue = await contractBreakdownPage.getEffectiveUSDValue();
  sapEffectiveUSDValue = await contractBreakdownPage.getSAPEffectiveUSDValue();
  expect(displayedValue).toBe(sapEffectiveUSDValue);
});