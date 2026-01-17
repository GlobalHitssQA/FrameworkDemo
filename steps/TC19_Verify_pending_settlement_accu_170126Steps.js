const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let pendingOperations = [];
let calculatedTotal = 0;
let displayedTotal = 0;

Given('the user is authenticated in Acticenter module', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  const isMainScreenVisible = await acticenterPage.isMainScreenVisible();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a contract with multiple pending settlement operations', async function () {
  await acticenterPage.openContractSearch();
  await acticenterPage.selectContractWithPendingOperations();
  const isContractLoaded = await acticenterPage.isContractInfoLoaded();
  expect(isContractLoaded).toBeTruthy();
});

When('the user retrieves the pending settlement operations for the selected contract', async function () {
  pendingOperations = await acticenterPage.getPendingSettlementOperations();
  expect(pendingOperations.length).toBeGreaterThan(0);
});

When('the user clicks on the total contract value component to display the breakdown', async function () {
  await acticenterPage.clickTotalContractValue();
});

Then('the system displays a popup with the contract value breakdown showing Pending to Settle section', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const isPendingSectionVisible = await acticenterPage.isPendingToSettleSectionVisible();
  expect(isPendingSectionVisible).toBeTruthy();
});

Then('the Pending to Settle value matches the total sum of all pending settlement operations', async function () {
  calculatedTotal = await acticenterPage.calculatePendingOperationsTotal(pendingOperations);
  displayedTotal = await acticenterPage.getPendingToSettleDisplayedValue();
  expect(displayedTotal).toBeCloseTo(calculatedTotal, 2);
});

Then('all pending operations are included in the accumulated calculation without omissions', async function () {
  const operationsCount = await acticenterPage.getPendingOperationsCount();
  expect(operationsCount).toBe(pendingOperations.length);
  const allOperationsIncluded = await acticenterPage.verifyAllOperationsIncluded(pendingOperations);
  expect(allOperationsIncluded).toBeTruthy();
});