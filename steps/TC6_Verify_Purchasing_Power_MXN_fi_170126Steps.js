const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;
let currentCashValueFromAdvisor;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.waitForAuthentication();
});

Given('the user has access to an active Casa de Bolsa Individual Person contract', async function () {
  const hasAccess = await contractBreakdownPage.verifyContractAccess();
  expect(hasAccess).toBeTruthy();
});

When('the user selects a Casa de Bolsa Individual Person contract', async function () {
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.selectCasaDeBolsaIndividualContract();
});

Then('the system displays the operation screen with the selected contract', async function () {
  const isDisplayed = await contractBreakdownPage.isOperationScreenDisplayed();
  expect(isDisplayed).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays the breakdown popup with contract items', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Purchasing Power MXN field is visible in the breakdown list', async function () {
  const isFieldVisible = await contractBreakdownPage.isPurchasingPowerMXNVisible();
  expect(isFieldVisible).toBeTruthy();
});

Then('the Purchasing Power MXN field displays its monetary value on the right side', async function () {
  const hasValue = await contractBreakdownPage.hasPurchasingPowerMXNValue();
  expect(hasValue).toBeTruthy();
});

Then('the Purchasing Power MXN value matches the currentcash value from Advisor Module', async function () {
  const purchasingPowerValue = await contractBreakdownPage.getPurchasingPowerMXNValue();
  const advisorModuleValue = await contractBreakdownPage.getCurrentCashFromAdvisorModule();
  expect(purchasingPowerValue).toBe(advisorModuleValue);
});