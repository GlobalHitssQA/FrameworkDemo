const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;
let initialContractValue;
let initialBreakdownValues;

Given('I am authenticated in Acticenter with an active contract', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.navigateToActicenter();
  await valueCompositionPage.waitForAuthentication();
});

When('I access Acticenter and select a contract to view the total value component', async function () {
  await valueCompositionPage.openContractSearch();
  await valueCompositionPage.selectFirstAvailableContract();
  await valueCompositionPage.waitForValueComponentToLoad();
});

Then('the system displays the component with the total value of the selected contract', async function () {
  const isVisible = await valueCompositionPage.isValueComponentVisible();
  expect(isVisible).toBeTruthy();
  initialContractValue = await valueCompositionPage.getTotalContractValue();
  expect(initialContractValue).toBeTruthy();
});

When('I open the breakdown popup and verify the values of each item', async function () {
  await valueCompositionPage.openBreakdownPopup();
  await valueCompositionPage.waitForPopupToLoad();
});

Then('the popup shows the complete breakdown with all items and their corresponding values', async function () {
  const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  
  initialBreakdownValues = await valueCompositionPage.getAllBreakdownValues();
  
  const hasPurchasingPower = await valueCompositionPage.isPurchasingPowerMXNVisible();
  expect(hasPurchasingPower).toBeTruthy();
  
  const hasCashMXN = await valueCompositionPage.isCashMXNVisible();
  expect(hasCashMXN).toBeTruthy();
  
  const hasCashUSD = await valueCompositionPage.isCashUSDVisible();
  expect(hasCashUSD).toBeTruthy();
  
  const hasFundsList = await valueCompositionPage.isFundsListVisible();
  expect(hasFundsList).toBeTruthy();
  
  await valueCompositionPage.closeBreakdownPopup();
});

When('I navigate to another Acticenter section', async function () {
  await valueCompositionPage.navigateToOperationsSection();
});

Then('the system changes to the requested new section', async function () {
  const isInOperations = await valueCompositionPage.isOperationsSectionVisible();
  expect(isInOperations).toBeTruthy();
});

When('I return to the screen where the total value component is located', async function () {
  await valueCompositionPage.navigateBackToValueComponent();
  await valueCompositionPage.waitForValueComponentToLoad();
});

Then('the component maintains the same selected contract with updated values', async function () {
  const isVisible = await valueCompositionPage.isValueComponentVisible();
  expect(isVisible).toBeTruthy();
  
  const currentContractValue = await valueCompositionPage.getTotalContractValue();
  expect(currentContractValue).toBeTruthy();
});

When('I open the breakdown popup again', async function () {
  await valueCompositionPage.openBreakdownPopup();
  await valueCompositionPage.waitForPopupToLoad();
});

Then('the popup displays correctly showing the updated contract information', async function () {
  const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  
  const currentBreakdownValues = await valueCompositionPage.getAllBreakdownValues();
  expect(currentBreakdownValues).toBeTruthy();
  
  const hasPendingSettlements = await valueCompositionPage.isPendingSettlementsVisible();
  expect(hasPendingSettlements).toBeTruthy();
  
  await valueCompositionPage.closeBreakdownPopup();
});